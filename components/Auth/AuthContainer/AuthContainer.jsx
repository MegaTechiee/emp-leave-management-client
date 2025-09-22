import React from 'react'
import styles from './AuthContainer.module.css';

const AuthContainer = ({children}) => {
  return (
    <div className={styles.authBlock} data-testid="auth-container">
      <div className={styles.authHeader}>
        <p>Employees Leave Management System</p>
      </div>
      <div data-testid="auth-content">
        {children}
      </div>
    </div>
  )
}

export default AuthContainer;
