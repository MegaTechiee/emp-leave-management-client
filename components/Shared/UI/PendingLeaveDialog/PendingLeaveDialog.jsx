"use client";

import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/Shared/UI/Shadcn/dialog";
import { Button } from "@/components/Shared/UI/Shadcn/button";
import { Textarea } from "@/components/Shared/UI/Shadcn/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/Shared/UI/Shadcn/select";
import styles from "./PendingLeaveDialog.module.css";
import { patchAPIClient } from "@/lib/api/http-methods-client";
import adminEndpoints from "@/constants/api/admin/admin.endpoints";

export default function PendingLeaveDialog({ open, leave, onClose, onUpdate }) {
  const [status, setStatus] = useState("Approved");
  const [comment, setComment] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (leave) {
      setStatus("Approved");
      setComment("");
      setError("");
    }
  }, [leave]);

  if (!leave) return null;

  const handleSave = async () => {
    if (!status || !comment) {
      setError("Please fill all fields");
      return;
    }

    setLoading(true);
    setError("");
    try {
      const res = await patchAPIClient(adminEndpoints.updateLeaveRequestStatus(leave._id), { status, comment });
      const data = await res.json();
      if (!data.success) throw new Error(data.general_message || "Failed to update leave");

      // Update table immediately
      onUpdate(data.data.leave);
      onClose();
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className={styles.dialogContent}>
        <DialogHeader>
          <DialogTitle>Take Action</DialogTitle>
        </DialogHeader>

        <div className={styles.field}>
          <label>Status</label>
          <Select value={status} onValueChange={(value) => (setStatus(value), setError(""))}>
            <SelectTrigger className={styles.select}>
              <SelectValue placeholder="Select status" className={styles.select}/>
            </SelectTrigger>
            <SelectContent className={styles.select}>
              <SelectItem value="Approved" className={styles.select}>Approved</SelectItem>
              <SelectItem value="Rejected" className={styles.select}>Rejected</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className={styles.field}>
          <label>Comment</label>
          <Textarea value={comment} onChange={(e) => (setComment(e.target.value), setError(""))} rows={3} />
        </div>

        <p className={styles.error}>{error}</p>

        <DialogFooter className={styles.actions}>
          <Button variant="outline" onClick={onClose} disabled={loading}>Cancel</Button>
          <Button onClick={handleSave} disabled={loading}>{loading ? "Saving..." : "Save"}</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
