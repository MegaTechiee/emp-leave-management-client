"use client";

import React, { useState, useEffect } from "react";
import styles from "./BalanceDialog.module.css";
import CustomInput from "@/components/Shared/UI/CustomInput/CustomInput";
import { getAPIClient, patchAPIClient } from "@/lib/api/http-methods-client";
import adminEndpoints from "@/constants/api/admin/admin.endpoints";

export default function BalanceDialog({ open, employeeId, onClose }) {
  console.log('employeeId in BalanceDialog:', employeeId);

  // State for leave balances
  const [casual, setCasual] = useState("");
  const [privilege, setPrivilege] = useState("");
  const [loading, setLoading] = useState(false);   // loading for GET/PATCH
  const [saving, setSaving] = useState(false);    // saving state for PATCH
  const [error, setError] = useState("");         // error message

  // Fetch employee leave balance
  useEffect(() => {
    const fetchBalance = async () => {
      if (!open || !employeeId) return;
      setLoading(true);
      setError("");
      try {
        const rawResponse = await getAPIClient(adminEndpoints.getEmployeeLeaveBalance(employeeId));
        const res = await rawResponse.json();
        const b = res?.data?.balance || {};
        setCasual(String(b.casual ?? ""));
        setPrivilege(String(b.privilege ?? ""));
      } catch (err) {
        console.error("Error fetching balance:", err);
        setError("Failed to load leave balance. Please try again.");
      } finally {
        setLoading(false);
      }
    };
    fetchBalance();
  }, [open, employeeId]);

  // Save updated balance
  const handleSave = async () => {
    if (!employeeId) return;
    setSaving(true);
    setError("");
    try {
      await patchAPIClient(
        adminEndpoints.updateEmployeeLeaveBalance(employeeId),
        {
          casual: casual === "" ? 0 : Number(casual),
          privilege: privilege === "" ? 0 : Number(privilege),
        },
      );
      
      // Pass the updated balance back to parent
      onClose({ casual: Number(casual), privilege: Number(privilege) });
    } catch (err) {
      console.error("Error updating balance:", err);
      setError("Failed to save changes. Please try again.");
    } finally {
      setSaving(false);
    }
  };

  if (!open) return null;

  return (
    <div className={styles.overlay}>
      <div className={styles.dialog}>
        <h3 className={styles.title}>Edit Leave Balance</h3>

        {/* Loading state */}
        {loading ? (
          <p className={styles.info}>Loading current balance…</p>
        ) : (
          <>
            <div className={styles.fields}>
              <CustomInput
                label="Casual"
                name="casual"
                type="number"
                value={casual}
                onChange={(e) => setCasual(e.target.value)}
                placeholder="0"
                disabled={saving}
              />
              <CustomInput
                label="Privilege"
                name="privilege"
                type="number"
                value={privilege}
                onChange={(e) => setPrivilege(e.target.value)}
                placeholder="0"
                disabled={saving}
              />
            </div>

            {/* Error message */}
            {error && <p className={styles.error}>{error}</p>}

            <div className={styles.actions}>
              <button
                onClick={onClose}
                className={styles.button}
                disabled={saving}
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                className={`${styles.button} ${styles.save}`}
                disabled={saving}
              >
                {saving ? "Saving…" : "Save"}
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
