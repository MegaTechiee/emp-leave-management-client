import React from 'react'
import LoginForm from '@/components/Auth/SubComponents/LoginForm/LoginForm';
import styles from './AuthLogin.module.css';

const AuthLogin = () => {
  return (
    <div className={styles.authLoginContainer} data-testid="auth-login-container">
      <LoginForm />
    </div>
  )
}

export default AuthLogin
