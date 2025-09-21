import React from 'react'
import ApplyLeaveForm from '@/components/Employee/ApplyLeave/ApplyLeaveForm/ApplyLeaveForm'
import WelcomeUser from '@/components/Shared/UI/WelcomeUser/WelcomeUser'

const page = () => {
  return (
    <div>
      <WelcomeUser />
      <ApplyLeaveForm />
    </div>
  )
}

export default page
