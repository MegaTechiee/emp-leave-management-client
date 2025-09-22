// components/Shared/UI/EmployeeCard/EmployeeCard.tsx
import React from "react";
import styles from "./EmployeeCard.module.css";
import { Button } from "../Shadcn/button";

export default function EmployeeCard({
  name,
  email,
  employeeId,
  department,
  casual,
  privilege,
  onEditBalance
}) {
  return (
    <div className={styles.card}>
      <h3 className={styles.cardTitle}>{name}</h3>
      <p className={styles.cardInfo}>{email}</p>
      <p className={styles.cardInfo}>ID: {employeeId}</p>
      <p className={styles.cardInfo}>Dept: {department}</p>
      {typeof casual === "number" && (
        <p className={styles.cardInfo}>Casual Leave: {casual}</p>
      )}
      {typeof privilege === "number" && (
        <p className={styles.cardInfo}>Privilege Leave: {privilege}</p>
      )}
      <Button variant="outlisne" size="sm" onClick={onEditBalance} className={styles.editBtn}>
        Edit Leave Balance
      </Button>
    </div>
  );
}
