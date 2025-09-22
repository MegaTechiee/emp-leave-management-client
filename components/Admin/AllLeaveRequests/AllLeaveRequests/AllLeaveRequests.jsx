'use client'
// Due to time contraints, this component
// can be made generic for both admin(all leave requests) and employee(leave history) with minor changes
// by passing props to fetch data from different endpoints and display different columns
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
import styles from "@/components/Employee/LeaveHistory/LeaveHistoryView/LeaveHistoryView.module.css"
import { getAPIClient } from "@/lib/api/http-methods-client"
import adminEndpoints from "@/constants/api/admin/admin.endpoints"

export default function AllLeaveRequests() {
  const [leaves, setLeaves] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")

  useEffect(() => {
    const fetchLeaves = async () => {
      try {
        setLoading(true)
        const rawResponse = await getAPIClient(adminEndpoints.getAllLeaveRequests)
        const result = await rawResponse.json()
        if (result.success) setLeaves(result.data.leaves)
        else setError(result.message || "Failed to fetch leave data")
      } catch (err) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }

    fetchLeaves()
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
              <TableHead className={styles.tableHeaderCell}>Employee</TableHead>
              <TableHead className={styles.tableHeaderCell}>Employee ID</TableHead>
              <TableHead className={styles.tableHeaderCell}>Department</TableHead>
              <TableHead className={styles.tableHeaderCell}>From Date</TableHead>
              <TableHead className={styles.tableHeaderCell}>To Date</TableHead>
              <TableHead className={styles.tableHeaderCell}>Leave Type</TableHead>
              <TableHead className={styles.tableHeaderCell}>Reason</TableHead>
              <TableHead className={styles.tableHeaderCell}>Status</TableHead>
              <TableHead className={styles.tableHeaderCell}>Admin Note</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {leaves.map((leave) => (
              <TableRow key={leave._id} className={styles.tableRow}>
                <TableCell className={styles.tableCell}>{leave.employee.name}</TableCell>
                <TableCell className={styles.tableCell}>{leave.employee.employeeId}</TableCell>
                <TableCell className={styles.tableCell}>{leave.employee.department}</TableCell>
                <TableCell className={styles.tableCell}>
                  {format(new Date(leave.startDate), "dd MMM yyyy")}
                </TableCell>
                <TableCell className={styles.tableCell}>
                  {format(new Date(leave.endDate), "dd MMM yyyy")}
                </TableCell>
                <TableCell className={styles.tableCell}>{leave.leaveType}</TableCell>
                <TableCell className={styles.tableCell}>{leave.reasonType}</TableCell>
                <TableCell className={styles.tableCell}>
                  <Badge style={{ background: getStatusColor(leave.status) }} className={styles.badge}>
                    {leave.status}
                  </Badge>
                </TableCell>
                <TableCell className={styles.tableCell}>
                  {leave.adminComment || "-"}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}
