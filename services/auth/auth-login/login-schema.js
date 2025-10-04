import { z } from "zod";

export const loginFormSchema = z.object({
  email: z
    .string()
    .nonempty("Login email is required")
    .email("Enter a valid email address") //default regex /^(?!\.)(?!.*\.\.)([a-z0-9_'+\-\.]*)[a-z0-9_+-]@([a-z0-9][a-z0-9\-]*\.)+[a-z]{2,}$/i
    .max(50, "Email must be less than 50 characters"),
  password: z
    .string()
    .nonempty("Password is required")
    .max(50, "Password must be less than 50 characters"),
});


