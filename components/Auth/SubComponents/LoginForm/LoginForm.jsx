'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import CustomInput from '@/components/Shared/UI/CustomInput/CustomInput';
import styles from './LoginForm.module.css';
import { Button } from '@/components/Shared/UI/Shadcn/button';
import PasswordInput from '@/components/Auth/SubComponents/PasswordInput/PasswordInput';
import { validateLoginForm } from '@/services/auth/auth-login/validate-login-form';
import { loginFormSubmit } from '@/services/auth/auth-login/submit-login-form';
// import { setCookieClient } from '@/utils/cookies/client-cookies';
// import { LOGIN_SUCCESS_COOKIE_NAME } from '@/constants/cookies/cookies';
import { genericErrorMessage } from '@/constants/literals/messages';
import { appTabsUIPaths, authUIPaths } from '@/constants/literals/ui-paths';

const LoginForm = () => {
  const router = useRouter();

  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const [errors, setErrors] = useState({
    email: '',
    password: '',
  });

  const [globalError, setGlobalError] = useState('');

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    setErrors(prev => ({ ...prev, [name]: '' }));
    setGlobalError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { isValid, newErrors } = validateLoginForm(formData);
    if (!isValid) {
      setErrors(newErrors);
      return;
    }

    setIsSubmitting(true);
    try {
      const result = await loginFormSubmit(formData);

      if (result.success) {
        // setCookieClient(LOGIN_SUCCESS_COOKIE_NAME, "true", 30);
        router.push(appTabsUIPaths.dashboard);
      } else {
        setGlobalError(result.message);
      }
    } catch (error) {
      console.error('LoginForm => Submission error:', error);
      setGlobalError(genericErrorMessage);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div>
      <h1 className={styles.title}>
        Login
      </h1>
      <form noValidate className={styles.formContainer} onSubmit={handleSubmit}>
        <CustomInput
          label="Login (Email)"
          name="email"
          type="email"
          value={formData.email}
          onChange={handleChange}
          error={errors.email}
          autoComplete="email"
          disabled={isSubmitting}
          maxLength={50}
          placeholder="Enter your email"
        />
        <PasswordInput
          label="Password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          error={errors.password}
          autoComplete="off"
          disabled={isSubmitting}
          maxLength={50}
          placeholder="Enter your Password"
        />
        <div className={styles.globalError}>{globalError}</div>
        <div className={styles.linkBlock}>
          <Link href={authUIPaths.empSignup} className={styles.link}>
            Don't have an account? Employee SignUp
          </Link>
          <Link href={authUIPaths.adminSignup} className={styles.link}>
            Admin SignUp
          </Link>
        </div>
        <div className={styles.buttonBlock}>
          <Button
            type="submit"
            className={styles.formSubmitButton}
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Logging in...' : 'Login'}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default LoginForm;
