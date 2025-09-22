"use client";

import React, { useEffect, useState } from "react";
import EmployeeCard from "@/components/Shared/UI/EmployeeCard/EmployeeCard";
import BalanceDialog from "@/components/Shared/UI/BalanceDialog/BalanceDialog";
import { getAPIClient } from "@/lib/api/http-methods-client";
import adminEndpoints from "@/constants/api/admin/admin.endpoints";
import styles from "./EmployeeDetailsPage.module.css";

export default function EmployeeDetailsPage() {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedId, setSelectedId] = useState(null);
  const [dialogOpen, setDialogOpen] = useState(false);

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        setLoading(true);
        const rawResponse = await getAPIClient(adminEndpoints.getAllEmployees);
        const content = await rawResponse.json();
        const list = content.data.employees;

        console.log('list frm employeedetailspage', list);

        // Fetch balances for each employee
        const withBalance = await Promise.all(
          list.map(async emp => {
            try {
              const res = await getAPIClient(
                adminEndpoints.getEmployeeLeaveBalance(emp._id)
              );
              const bal = await res.json();
              return {
                ...emp,
                casual: bal.data.balance.casual,
                privilege: bal.data.balance.privilege
              };
            } catch {
              return emp; // skip if balance fetch fails
            }
          })
        );

        setEmployees(withBalance);
      } catch (err) {
        setError("Failed to load employees. Please try again.");
      } finally {
        setLoading(false);
      }
    };
    fetchEmployees();
  }, []);

  const handleEdit = id => {
    setSelectedId(id);
    setDialogOpen(true);
  };

  if (loading) return <div className={styles.status}>Loading employees...</div>;
  if (error) return <div className={`${styles.status} ${styles.error}`}>{error}</div>;

  return (
    <div className={styles.container}>
      {employees.map(emp => (
        <EmployeeCard
          key={emp._id}
          name={emp.name}
          email={emp.email}
          employeeId={emp.employeeId}
          department={emp.department}
          casual={emp.casual}
          privilege={emp.privilege}
          onEditBalance={() => handleEdit(emp._id)}
        />
      ))}

      <BalanceDialog
        open={dialogOpen}
        employeeId={selectedId}
        // onClose={() => setDialogOpen(false)}
        onClose={(updatedBalance) => {
          if (updatedBalance) {
            // Update the employee's balance in the list
            setEmployees(prev =>
              prev.map(emp =>
                emp._id === selectedId ? { ...emp, ...updatedBalance } : emp
              )
            );
          }
          setDialogOpen(false);
        }}
      />
    </div>
  );
}
