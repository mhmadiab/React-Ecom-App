import useCheckEmailAvailability from '@hooks/useCheckEmailAvailability';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import {useForm, SubmitHandler} from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod';
import {signupSchema, type signupType} from '@validations/signupSchema';

//auth:
import { useAppDispatch, useAppSelector } from '@store/hooks';
import { actAuthRegister, resetUI } from '@store/auth/authSlice';

const useRegister = () => {
    const navigate = useNavigate()
    const dispatch = useAppDispatch()
  
    const {loading, error, accessToken}= useAppSelector((state) => state.auths)
  
    const{register, handleSubmit, formState:{errors}, getFieldState, trigger}= useForm<signupType>({
        mode: "onBlur", 
        resolver: zodResolver(signupSchema),
    })
  
    const {checkEmailAvailability, enterEmail,  emailAvailabilityStatus, resetEmailAvailability} = useCheckEmailAvailability()
  
  
    const submitForm : SubmitHandler<signupType>= (data)=>{
      const {firstName, lastName, email, password} = data
       dispatch(actAuthRegister({firstName, lastName, email, password}))
       .unwrap()
       .then(()=>{
        navigate('/login?message=account_created')
       })
    }
  
    const emailOnBlurHandler = async (event: React.FocusEvent<HTMLInputElement>)=>{
      await trigger("email")
      const value = event.target.value
      const {isDirty, invalid} = getFieldState("email")
      if(isDirty && !invalid && enterEmail !== value){
        checkEmailAvailability(value)
      }
  
      if(isDirty && invalid && enterEmail){
        resetEmailAvailability()
      }
  
    }
  
    useEffect(()=>{
  
      return ()=>{
        dispatch(resetUI())
      }
    }, [dispatch])

    return{
        loading, error, accessToken,
        register, handleSubmit,
        errors,
        submitForm,
        emailOnBlurHandler,
        emailAvailabilityStatus
    }
}

export default useRegister