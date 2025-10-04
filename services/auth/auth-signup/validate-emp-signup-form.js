import z from "zod";
import { employeeSchema } from "./signup-schema";

export const validateEmpForm = (formData) => {
  const result = employeeSchema.safeParse(formData);

  if (!result.success) {
    const flattenedErrors = z.flattenError(result.error);
    // console.log("Validation fieldErrors:", flattenedErrors);
    return {
      isValid: false,
      newErrors: {
        email: flattenedErrors.fieldErrors.email?.[0] || "",
        password: flattenedErrors.fieldErrors.password?.[0] || "",
        employeeId: flattenedErrors.fieldErrors.employeeId?.[0] || "",
        name: flattenedErrors.fieldErrors.name?.[0] || "",
        department: flattenedErrors.fieldErrors.department?.[0] || "",
        // role: flattenedErrors.fieldErrors.role?.[0] || "",
      },
    };
  }

  return { 
    isValid: true, 
    newErrors: { 
      email: "", 
      employeeId: "", 
      name: "", 
      department: "", 
      password: "", 
      // role: "" 
    } 
  };
};
