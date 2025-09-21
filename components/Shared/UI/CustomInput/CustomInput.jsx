import { Input as ShadcnInput } from "@/components/Shared/UI/Shadcn/input";
import { Label as ShadcnLabel } from "@/components/Shared/UI/Shadcn/label";
import styles from './CustomInput.module.css';

const CustomInput = ({
  label,
  name,
  type,
  value,
  error,
  onChange,
  rightElement,
  ...props
}) => {
  return (
    <div className={styles.inputContainer} data-testid="custom-input-container">
      {label && (
        <ShadcnLabel
          htmlFor={name}
          className={styles.label}
          data-testid="custom-input-label"
        >
          {label}
        </ShadcnLabel>
      )}

      {/* Wrapper for input + right element */}
      <div className={styles.inputWrapper}>
        <ShadcnInput
          type={type}
          name={name}
          id={name}
          value={value}
          onChange={onChange}
          className={`${error ? styles.inputError : ""} ${rightElement ? styles.hasRightElement : ""}`}
          data-testid="custom-input-field"
          style={{padding:'5px'}}
          {...props}
        />
        {rightElement && <div className={styles.rightElement}>{rightElement}</div>}
      </div>

      <p
        className={`${styles.error} ${error ? styles.errorVisible : ""}`}
        data-testid="custom-input-error"
      >
        {error}
      </p>
    </div>
  );
};

export default CustomInput;
