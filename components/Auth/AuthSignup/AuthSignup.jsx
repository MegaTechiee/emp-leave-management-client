import React from 'react'
import EmpSignupForm from '@/components/Auth/SubComponents/SignupForm/EmpSignupForm';
import AdminSignupForm from '@/components/Auth/SubComponents/SignupForm/AdminSignupForm';
import styles from './AuthSignup.module.css';

const AuthSignup = ({isAdminSignup}) => {
  return (
    <div className={styles.authSignupContainer} data-testid="auth-signup-container">
      {isAdminSignup ? <AdminSignupForm /> : <EmpSignupForm />}
    </div>
  )
}

export default AuthSignup;
