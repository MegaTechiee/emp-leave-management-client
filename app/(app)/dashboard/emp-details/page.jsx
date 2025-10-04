import React from 'react'
import EmployeeDetailsPage from '@/components/Admin/EmployeeDetails/EmployeeDetailsPage/EmployeeDetailsPage'
import WelcomeUser from '@/components/Shared/UI/WelcomeUser/WelcomeUser'
const page = () => {
  return (
    <div>
      <WelcomeUser />
      <EmployeeDetailsPage />
    </div>
  )
}

export default page
