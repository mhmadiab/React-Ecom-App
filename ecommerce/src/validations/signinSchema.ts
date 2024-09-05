import {z} from 'zod'


const signinSchema = z.object({
   email: z.string().email({message: "email address is required"}),
   password : z.string()
    .min(8, { message: "Password must be at least 8 characters longs" })
    .regex(/.*[!@#$%^&*()_+{}|[\]\\:";'<>?,./].*/, {
      message: "Password should contain at least 1 special character",
    }),
})
 

type signinType = z.infer<typeof signinSchema>


export  {signinSchema, type signinType}