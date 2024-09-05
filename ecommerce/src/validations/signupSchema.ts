
import {z} from 'zod'

const signupSchema = z.object({
    firstName : z.string().min(1, {message: "first name is required"}),
    lastName : z.string().min(1, {message: "last name is required"}),
    email : z.string().email({message: "email address is required"}),
    password : z.string()
    .min(8, { message: "Password must be at least 8 characters longs" })
    .regex(/.*[!@#$%^&*()_+{}|[\]\\:";'<>?,./].*/, {
      message: "Password should contain at least 1 special character",
    }),
    confirmPassword : z.string().min(1, {message : "Confirm Password is required"})
  }).refine(input => input.password === input.confirmPassword, {
    message : "Password and Confirm Password does not match",
    path: ['confirmPassword']
  })
  
type signupType = z.infer<typeof  signupSchema>
  



export  {signupSchema, type signupType}