import {z} from 'zod'


const signinSchema = z.object({
   email: z.string().email({message: "email address is required"}),
   password : z.string().min(8, { message: "Password is required" })
})
 

type signinType = z.infer<typeof signinSchema>


export  {signinSchema, type signinType}