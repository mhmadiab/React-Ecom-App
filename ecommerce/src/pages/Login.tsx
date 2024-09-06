import {Button, Row, Col, Alert, Spinner} from 'react-bootstrap';
import Form from 'react-bootstrap/Form';
import { Heading } from '@components/common';
import { useAppDispatch, useAppSelector} from '@store/hooks';
import { actAuthLogin, resetUI } from '@store/auth/authSlice';
import { useEffect } from 'react';

//form and Login Components
import { Input } from '@components/forms';
import {useForm, SubmitHandler} from 'react-hook-form'
import { signinSchema, type signinType  } from '@validations/signinSchema';
import { zodResolver } from '@hookform/resolvers/zod';

//authentication and validation
import { useSearchParams, useNavigate, Navigate } from 'react-router-dom';



const Login = () => {

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

  if(accessToken){
    return <Navigate to="/" />
  }

  return (
    <>
    <Heading title='User Login' />
    <Row>
      <Col md={{span: 6, offset: 3}}>
      {searchParams.get("message") === "login_required" 
        && <Alert variant='warning'>You need to login to view this content </Alert>}

      {searchParams.get("message") === "account_created" 
        && <Alert variant='success'>Your account  has been created successfully</Alert>}

        <Form className='mb-3' onSubmit={handleSubmit(loginHandler)}>
            <Input 
                  type='text'
                  label='email'
                  error={errors.email?.message}
                  name='email'
                  register={register}
                  />
            <Input 
                  type='password'
                  label='password'
                  error={errors.password?.message}
                  name="password"
                  register={register}
            />  
            <Button className='mb-5' variant="info" type="submit" style={{color: 'white'}}>
            {loading === "pending" ? <><Spinner animation='border' size='sm'></Spinner> Loading</> : "login"}
          </Button>  
          {error ? <p style={{color: "#DC3545", marginTop : 10}}>{error}</p> : ""}  
        </Form>
      </Col>
    </Row>
    </>
  )
}

export default Login