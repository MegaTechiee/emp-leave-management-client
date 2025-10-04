import z from "zod";
import { adminSchema } from "./signup-schema";

export const validateAdminForm = (formData) => {
  const result = adminSchema.safeParse(formData);

  if (!result.success) {
    const flattenedErrors = z.flattenError(result.error);
    // console.log("Validation fieldErrors:", flattenedErrors);
    return {
      isValid: false,
      newErrors: {
        email: flattenedErrors.fieldErrors.email?.[0] || "",
        name: flattenedErrors.fieldErrors.name?.[0] || "",
        password: flattenedErrors.fieldErrors.password?.[0] || "",
        // role: flattenedErrors.fieldErrors.role?.[0] || "",
      },
    };
  }

  return { 
    isValid: true, 
    newErrors: { 
      email: "", 
      name: "", 
      password: "", 
      // role: "" 
    } 
  };
};
