'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import CustomInput from '@/components/Shared/UI/CustomInput/CustomInput';
import styles from './SignupForm.module.css';
import { Button } from '@/components/Shared/UI/Shadcn/button';
import PasswordInput from '@/components/Auth/SubComponents/PasswordInput/PasswordInput';
import { genericErrorMessage } from '@/constants/literals/messages';
import { authUIPaths } from '@/constants/literals/ui-paths';
import { adminSignupFormSubmit } from '@/services/auth/auth-signup/submit-signup-form';
import { validateAdminForm } from '@/services/auth/auth-signup/validate-admin-signup-form';

const AdminSignupForm = () => {
  const router = useRouter();

  const [formData, setFormData] = useState({
    email: '',
    name: '',
    password: '',
    role: 'admin',
  });

  const [errors, setErrors] = useState({
    email: '',
    name: '',
    password: '',
    role: '',
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

    const { isValid, newErrors } = validateAdminForm(formData);
    if (!isValid) {
      setErrors(newErrors);
      return;
    }

    setIsSubmitting(true);
    try {
      const result = await adminSignupFormSubmit(formData);

      if (result.success) {
        router.push(authUIPaths.login);
      } else {
        setGlobalError(result.message);
      }
    } catch (error) {
      console.error('SignupForm => Submission error:', error);
      setGlobalError(genericErrorMessage);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div>
      <h1 className={styles.title}>
        Admin Register
      </h1>
      <form noValidate className={styles.formContainer} onSubmit={handleSubmit}>
        <CustomInput
          label="Email"
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
        <CustomInput
          label="Name"
          name="name"
          type="text"
          value={formData.name}
          onChange={handleChange}
          error={errors.name}
          autoComplete="name"
          disabled={isSubmitting}
          maxLength={50}
          placeholder="Enter your Name"
        />
        {/* <CustomInput
          label="Role"
          name="role"
          type="text"
          value={formData.role}
          onChange={handleChange}
          error={errors.role}
          autoComplete="off"
          disabled={isSubmitting}
          maxLength={30}
          placeholder="Enter your Role"
        /> */}
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
          <Link href={authUIPaths.login} className={styles.link}>
            Already have an account? Login
          </Link>
          <Link href={authUIPaths.empSignup} className={styles.link}>
            Employee SignUp
          </Link>
        </div>
        <div className={styles.buttonBlock}>
          <Button
            type="submit"
            className={styles.formSubmitButton}
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Signing up...' : 'Sign Up'}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default AdminSignupForm;
