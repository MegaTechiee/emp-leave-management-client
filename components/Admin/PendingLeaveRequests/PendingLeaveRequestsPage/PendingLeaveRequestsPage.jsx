"use client";

import { useEffect, useState } from "react";
import { format } from "date-fns";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/Shared/UI/Shadcn/table";
import styles from "./PendingLeaveRequestsPage.module.css";
import adminEndpoints from "@/constants/api/admin/admin.endpoints";
import { getAPIClient } from "@/lib/api/http-methods-client";
import PendingLeaveDialog from "@/components/Shared/UI/PendingLeaveDialog/PendingLeaveDialog";

export default function PendingLeaveRequestsPage() {
  const [leaves, setLeaves] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [selectedLeave, setSelectedLeave] = useState(null);
  const [dialogOpen, setDialogOpen] = useState(false);

  useEffect(() => {
    const fetchPendingLeaves = async () => {
      try {
        setLoading(true);
        const res = await getAPIClient(adminEndpoints.getPendingLeaves);
        const data = await res.json();
        if (data.success) setLeaves(data.data.pending);
        else setError("Failed to fetch pending leaves");
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchPendingLeaves();
  }, []);

  const handleAction = (leave) => {
    setSelectedLeave(leave);
    setDialogOpen(true);
  };

  // const updateLeave = (updatedLeave) => {
  //   setLeaves((prev) =>
  //     prev.map((l) => (l._id === updatedLeave._id ? updatedLeave : l))
  //   );
  // };

  // Remove leave from table once it's no longer pending
  const handleLeaveUpdated = (updatedLeave) => {
    setLeaves((prev) => prev.filter((l) => l._id !== updatedLeave._id));
  };

  if (loading) return <p className={styles.status}>Loading pending leaves...</p>;
  if (error) return <p className={`${styles.status} ${styles.error}`}>{error}</p>;

  return (
    <div className={styles.container}>
      <Table>
        <TableHeader>
          <TableRow className={styles.tableRowHeader}>
            <TableHead className={styles.tableHeaderCell}>Employee</TableHead>
            <TableHead className={styles.tableHeaderCell}>Department</TableHead>
            <TableHead className={styles.tableHeaderCell}>Leave Type</TableHead>
            <TableHead className={styles.tableHeaderCell}>Reason</TableHead>
            <TableHead className={styles.tableHeaderCell}>From</TableHead>
            <TableHead className={styles.tableHeaderCell}>To</TableHead>
            <TableHead className={styles.tableHeaderCell}>Status</TableHead>
            <TableHead className={styles.tableHeaderCell}>Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {leaves.map((leave) => (
            <TableRow key={leave._id} className={styles.row}>
              <TableCell className={styles.tableCell}>{leave.employee.name}</TableCell>
              <TableCell className={styles.tableCell}>{leave.employee.department}</TableCell>
              <TableCell className={styles.tableCell}>{leave.leaveType}</TableCell>
              <TableCell className={styles.tableCell}>{leave.reasonType}</TableCell>
              <TableCell className={styles.tableCell}>{format(new Date(leave.startDate), "MMM dd, yyyy")}</TableCell>
              <TableCell className={styles.tableCell}>{format(new Date(leave.endDate), "MMM dd, yyyy")}</TableCell>
              <TableCell>
                <span className={`${styles.badge} ${styles.pending}`}>{leave.status}</span>
              </TableCell>
              <TableCell>
                <button
                  className={styles.actionButton}
                  onClick={() => handleAction(leave)}
                >
                  Take Action
                </button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <PendingLeaveDialog
        open={dialogOpen}
        leave={selectedLeave}
        onClose={() => setDialogOpen(false)}
        onUpdate={handleLeaveUpdated}
      />
    </div>
  );
}
