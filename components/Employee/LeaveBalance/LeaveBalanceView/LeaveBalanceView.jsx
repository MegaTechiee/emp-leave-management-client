'use client'

import { useEffect, useState } from "react"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/Shared/UI/Shadcn/card"
import { getAPIClient } from "@/lib/api/http-methods-client"
import empEndpoints from "@/constants/api/employee/emp.endpoints"
import styles from "./LeaveBalanceView.module.css"

export default function LeaveBalanceView() {
  const [balance, setBalance] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")

  useEffect(() => {
    const fetchBalance = async () => {
      try {
        setLoading(true)
        const rawResponse = await getAPIClient(empEndpoints.getLeaveBalance)
        const result = await rawResponse.json()
        if (result.success) {
          setBalance(result.data.balance)
        } else {
          setError(result.message || "Failed to fetch leave balance")
        }
      } catch (err) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }

    fetchBalance()
  }, [])

  if (loading) return <p className={styles.message}>Loading...</p>
  if (error) return <p className={styles.message}>{error}</p>

  return (
    <div className={styles.page}>
      <h1 className={styles.heading}>Leave Balance</h1>

      <div className={styles.cards}>
        <Card className={styles.card}>
          <CardHeader>
            <CardTitle>Casual Leave</CardTitle>
          </CardHeader>
          <CardContent>
            <p className={styles.balance}>{balance.casual}</p>
          </CardContent>
        </Card>

        <Card className={styles.card}>
          <CardHeader>
            <CardTitle>Privilege Leave</CardTitle>
          </CardHeader>
          <CardContent>
            <p className={styles.balance}>{balance.privilege}</p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
