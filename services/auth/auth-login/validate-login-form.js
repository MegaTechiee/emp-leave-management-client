import z from "zod";
import { loginFormSchema } from "./login-schema";

export const validateLoginForm = (formData) => {
  const result = loginFormSchema.safeParse(formData);

  if (!result.success) {
    const flattenedErrors = z.flattenError(result.error);
    // console.log("Validation fieldErrors:", flattenedErrors);
    return {
      isValid: false,
      newErrors: {
        email: flattenedErrors.fieldErrors.email?.[0] || "",
        password: flattenedErrors.fieldErrors.password?.[0] || "",
      },
    };
  }

  return { isValid: true, newErrors: { email: "", password: "" } };
};
