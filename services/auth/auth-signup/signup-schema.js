import { z } from "zod";

export const employeeSchema = z.object({
  email: z
    .string()
    .nonempty("Email is required")
    .email("Enter a valid email address")
    .max(50, "Email must be less than 50 characters"),
  employeeId: z
    .string()
    .length(6, "Employee ID must be exactly 6 characters"),
  name: z
    .string()
    .nonempty("Name is required")
    .max(50, "Name must be less than 50 characters"),
  department: z
    .string()
    .max(50, "Department must be less than 50 characters"),
  password: z
    .string()
    .nonempty("Password is required")
    .max(50, "Password must be less than 50 characters"),
  role: z
    .literal('employee', "Role must be 'employee'")
});

export const adminSchema = z.object({
  email: z
    .string()
    .nonempty("Email is required")
    .email("Enter a valid email address")
    .max(50, "Email must be less than 50 characters"),
  name: z
    .string()
    .nonempty("Name is required")
    .max(50, "Name must be less than 50 characters"),
  password: z
    .string()
    .nonempty("Password is required")
    .max(50, "Password must be less than 50 characters"),
  role: z
    .literal('admin', "Role must be 'admin'")
});
