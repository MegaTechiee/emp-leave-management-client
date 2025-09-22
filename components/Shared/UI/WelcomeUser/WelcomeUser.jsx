'use client'

import { useEffect, useState } from "react"
import { getAPIClient } from "@/lib/api/http-methods-client"
import styles from "./WelcomeUser.module.css"
import userEndpoints from "@/constants/api/user/user.endpoints"

export default function WelcomeUser() {
  const [user, setUser] = useState(null)

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await getAPIClient(userEndpoints.getCurrentUser)
        const result = await res.json()
        if (result.success) {
          setUser(result.data.user)
        }
      } catch (err) {
        console.error("Failed to fetch user:", err)
      }
    }
    fetchUser()
  }, [])

  if (!user) return null

  return (
    <div className={styles.welcome}>
      Welcome, <span className={styles.name}>{user.name}</span>
    </div>
  )
}
