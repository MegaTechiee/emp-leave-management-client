'use client'

import { useState } from "react"
import { useRouter } from 'next/navigation';
import { Label } from "@/components/Shared/UI/Shadcn/label"
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/Shared/UI/Shadcn/select"
import { Button } from "@/components/Shared/UI/Shadcn/button"
import { Popover, PopoverTrigger, PopoverContent } from "@/components/Shared/UI/Shadcn/popover"
import { Calendar } from "@/components/Shared/UI/Shadcn/calendar"
import { CalendarIcon } from "lucide-react"
import { format } from "date-fns"
import styles from "./ApplyLeaveForm.module.css"
import { postAPIClient } from "@/lib/api/http-methods-client"
import empEndpoints from "@/constants/api/employee/emp.endpoints"
import { appTabsUIPaths } from "@/constants/literals/ui-paths";

export default function ApplyLeavePage() {
  const router = useRouter()
  const [leaveType, setLeaveType] = useState("")
  const [reasonType, setReasonType] = useState("")
  const [startDate, setStartDate] = useState(null)
  const [endDate, setEndDate] = useState(null)
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState("")

  const submitLeave = async () => {
    if (!leaveType || !reasonType || !startDate || !endDate) {
      setMessage("Please fill all fields")
      return
    }

    setLoading(true)
    try {
      const rawResponse = await postAPIClient(empEndpoints.applyLeave, {
        leaveType,
        reasonType,
        startDate: format(startDate, "yyyy-MM-dd"),
        endDate: format(endDate, "yyyy-MM-dd"),
      })
      
      const result = await rawResponse.json()
      if (result.success) {
        setMessage(result.general_message || "Leave request submitted successfully")
        router.push(appTabsUIPaths.leaveHistory);
      } else {
        setMessage(result.message || "Failed to submit leave request")
      }

    } catch (err) {
      setMessage(result.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className={styles.page}>
      <h1 className={styles.heading}>Apply for Leave</h1>

      <div className={styles.form}>
        {/* Leave Type */}
        <div className={styles.field}>
          <Label>Leave Type</Label>
          <Select onValueChange={(val) => { setLeaveType(val); setMessage("") }}>
            <SelectTrigger className={styles.dropDown}>
              <SelectValue placeholder="Select leave type" className={styles.dropDown} />
            </SelectTrigger>
            <SelectContent className={styles.dropDown}>
              <SelectItem value="Casual" className={styles.dropDown}>Casual</SelectItem>
              <SelectItem value="Privilege" className={styles.dropDown}>Privilege</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Reason */}
        <div className={styles.field}>
          <Label>Reason</Label>
          <Select onValueChange={(val) => { setReasonType(val); setMessage("") }}>
            <SelectTrigger className={styles.dropDown}>
              <SelectValue placeholder="Select reason" className={styles.dropDown} />
            </SelectTrigger>
            <SelectContent className={styles.dropDown}>
              <SelectItem value="Sick" className={styles.dropDown}>Sick</SelectItem>
              <SelectItem value="Vacation" className={styles.dropDown}>Vacation</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Start Date */}
        <div className={styles.field}>
          <Label>Start Date</Label>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className={styles.dateTrigger}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {startDate ? format(startDate, "PPP") : "Pick a date"}
              </Button>
            </PopoverTrigger>
            <PopoverContent className={styles.popoverContent}>
              <Calendar
                mode="single"
                selected={startDate}
                onSelect={(date) => { setStartDate(date); setMessage("") }}
                initialFocus
              />
            </PopoverContent>
          </Popover>
        </div>

        {/* End Date */}
        <div className={styles.field}>
          <Label>End Date</Label>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className={styles.dateTrigger}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {endDate ? format(endDate, "PPP") : "Pick a date"}
              </Button>
            </PopoverTrigger>
            <PopoverContent className={styles.popoverContent}>
              <Calendar
                mode="single"
                selected={endDate}
                onSelect={(date) => { setEndDate(date); setMessage("") }}
                initialFocus
              />
            </PopoverContent>
          </Popover>
        </div>
        
        <p className={styles.message}>{message}</p>

        {/* Submit */}
        <Button onClick={submitLeave} disabled={loading} className={styles.submitBtn}>
          {loading ? "Submitting..." : "Submit Request"}
        </Button>

      </div>
    </div>
  )
}
