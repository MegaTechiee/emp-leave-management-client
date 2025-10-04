'use client'

import { useEffect, useState } from "react"
import { format } from "date-fns"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/Shared/UI/Shadcn/table"
import { Badge } from "@/components/Shared/UI/Shadcn/badge"
import styles from "./LeaveHistoryView.module.css"
import { getAPIClient } from "@/lib/api/http-methods-client"
import empEndpoints from "@/constants/api/employee/emp.endpoints"

export default function LeaveHistoryPage() {
  const [history, setHistory] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        setLoading(true)
        const rawResponse = await getAPIClient(empEndpoints.getLeaveHistory)
        const result = await rawResponse.json()
        if (result.success) setHistory(result.data.history)
        else setError(result.message || "Failed to fetch leave history")
      } catch (err) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }

    fetchHistory()
  }, [])

  const getStatusColor = (status) => {
    if (status === "Approved") return "#0fb10f"
    if (status === "Rejected") return "#bb0e0e"
    return "orange"
  }

  if (loading) return <p className={styles.message}>Loading...</p>
  if (error) return <p className={styles.message}>{error}</p>

  return (
    <div className={styles.page}>
      <h1 className={styles.heading}>Leave History</h1>
      
      <div className={styles.tableContainer}>
        <Table>
          <TableHeader>
            <TableRow className={styles.tableRowHeader}>
              <TableHead className={styles.tableHeaderCell}>From Date</TableHead>
              <TableHead className={styles.tableHeaderCell}>To Date</TableHead>
              <TableHead className={styles.tableHeaderCell}>Leave Type</TableHead>
              <TableHead className={styles.tableHeaderCell}>Reason</TableHead>
              <TableHead className={styles.tableHeaderCell}>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {history.map((leave) => (
              <TableRow key={leave._id} className={styles.tableRow}>
                <TableCell className={styles.tableCell}>
                  {format(new Date(leave.startDate), "dd MMM yyyy")}
                </TableCell>
                <TableCell className={styles.tableCell}>
                  {format(new Date(leave.endDate), "dd MMM yyyy")}
                </TableCell>
                <TableCell className={styles.tableCell}>{leave.leaveType}</TableCell>
                <TableCell className={styles.tableCell}>{leave.reasonType}</TableCell>
                <TableCell className={styles.tableCell}>
                  <Badge style={{background: getStatusColor(leave.status)}} className={styles.badge}>
                    {leave.status}
                  </Badge>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}
