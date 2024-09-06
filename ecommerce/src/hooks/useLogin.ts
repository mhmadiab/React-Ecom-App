import { useAppDispatch, useAppSelector} from '@store/hooks';
import { actAuthLogin, resetUI } from '@store/auth/authSlice';
import { useEffect } from 'react';

//form and Login Components

import {useForm, SubmitHandler} from 'react-hook-form'
import { signinSchema, type signinType  } from '@validations/signinSchema';
import { zodResolver } from '@hookform/resolvers/zod';

//authentication and validation
import { useSearchParams, useNavigate } from 'react-router-dom';

const useLogin = () => {
    const navigate = useNavigate()

    const dispatch = useAppDispatch()
  
    const {loading, error, accessToken} = useAppSelector((state)=> state.auths)
    
  
  
    const [searchParams, setSearchParams] = useSearchParams()
  
    const {register,  handleSubmit, formState: {errors}} = useForm<signinType>({
      resolver: zodResolver(signinSchema),
      mode: "onBlur",
    })
  
    const loginHandler:SubmitHandler<signinType>  =(data)=>{
      if(searchParams.get("message")){
        setSearchParams("")
      }
         dispatch(actAuthLogin(data))
         .unwrap()
         .then(()=>{
          navigate('/')
         })
    }
  
    useEffect(()=>{
  
      return ()=>{
        dispatch(resetUI())
      }
  
    }, [dispatch])
  
    return {loading, error, accessToken, searchParams, errors,register,  handleSubmit, loginHandler }
}

export default useLogin