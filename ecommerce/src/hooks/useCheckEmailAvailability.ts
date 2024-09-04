import axios from "axios"
import { useState } from "react"

type TStatus = "idle" | "failed" | "checking" | "available" | "notAvailable"



const useCheckEmailAvailability = () => {
  const [emailAvailabilityStatus, setEmailAvailabilityStatus] = useState<TStatus>("idle")
  const [enterEmail, setEnterEmail] = useState<null | string>(null)

  const checkEmailAvailability = async (email:string)=>{
    setEnterEmail(email)
    setEmailAvailabilityStatus("checking")
    try {
        const response = await axios.get(`/users?email=${email}`)
        if(!response.data.length){
           setEmailAvailabilityStatus("available")
        }else{
            setEmailAvailabilityStatus("notAvailable")
        }
        
    } catch (error) {
        console.log(error)
        setEmailAvailabilityStatus("failed")
        
    }
  }

  const resetEmailAvailability  = ()=>{
    setEmailAvailabilityStatus("idle")
    setEnterEmail(null)
  }

  return  { checkEmailAvailability, emailAvailabilityStatus, enterEmail , resetEmailAvailability}

}

export default useCheckEmailAvailability