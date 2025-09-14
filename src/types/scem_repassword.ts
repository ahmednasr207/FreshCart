import { z } from 'zod'

export const changePasswordSchema = z
  .object({
    currentPassword: z.string().min(1, "Current password is required"),

    password: z
      .string()
      .min(3, 'Password must be at least 3 characters')
      .refine((val) => /[a-z]/.test(val), {
        message: 'Password must include a lowercase letter',
      })
      .refine((val) => /[A-Z]/.test(val), {
        message: 'Password must include an uppercase letter',
      })
      .refine((val) => /[0-9]/.test(val), {
        message: 'Password must include a number',
      })
      .refine((val) => /[^a-zA-Z0-9]/.test(val), {
        message: 'Password must include a special character',
      }),

    rePassword: z.string(),
  })
  .refine((data) => data.password === data.rePassword, {
    message: 'Passwords do not match',
    path: ['rePassword'],
  })
