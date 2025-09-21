'use client';

import { useState } from "react";
import { Button } from "@/components/Shared/UI/Shadcn/button";
import { Eye, EyeOff } from "lucide-react";
import styles from './PasswordInput.module.css';
import CustomInput from "../../../Shared/UI/CustomInput/CustomInput";

const PasswordInput = ({
  label,
  name,
  value,
  error,
  onChange,
  ...props
}) => {
  const [show, setShow] = useState(false);

  return (
    <CustomInput
      label={label}
      name={name}
      type={show ? "text" : "password"}
      value={value}
      error={error}
      onChange={onChange}
      autoComplete="off"
      rightElement={
        <Button
          type="button"
          variant="ghost"
          size="icon"
          onClick={() => setShow(!show)}
          className={styles.eyeToggleButton}
          aria-label={show ? "Show password" : "Hide password" }
          aria-pressed={show}
          data-testid="password-toggle-button"
        >
          {show ? (
            <Eye
              className={styles.eyeIcon}
              color={`#71717A`}
              data-testid="password-show-icon"
            />
          ) : (
            <EyeOff
              className={styles.eyeIcon}
              color={`#71717A`}
              data-testid="password-hide-icon"
            />
          )}
        </Button>
      }
      {...props}
    />
  );
};

export default PasswordInput;