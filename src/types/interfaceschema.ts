import * as z from 'zod'

export const formSchema = z
 .object({
    name: z.string().min(2, 'Name is too short'),
    email: z.string().email('Invalid email'),
    password: z
      .string()
      .min(6, 'Password too short')
      .regex(
        /^(?=.*[A-Z])(?=.*\d)(?=.*[a-z])(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/,
        'Password must include uppercase, lowercase, number, and special character'
      ),
    rePassword: z.string(),
    phone: z
      .string()
      .regex(/^01[0125][0-9]{8}$/, 'Phone must be a valid Egyptian number'),
  })
  .refine((data) => data.password === data.rePassword, {
    message: "Passwords don't match",
    path: ['rePassword'],
  })


export type formSchemaType =z.infer<typeof formSchema>;




export const signinSchema = z.object({

  email:z.string().email('Invalid email'),
password:z.string().min(6,'Password too short'),


})



export type signinSchemaType =z.infer<typeof signinSchema>;