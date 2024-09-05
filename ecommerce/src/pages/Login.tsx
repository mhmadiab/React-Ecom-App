import {Button, Row, Col} from 'react-bootstrap';
import Form from 'react-bootstrap/Form';
import { Heading } from '@components/common';
import { Input } from '@components/forms';
import {useForm, SubmitHandler} from 'react-hook-form'
import { signinSchema, type signinType  } from '@validations/signinSchema';
import { zodResolver } from '@hookform/resolvers/zod';


const Login = () => {

  const {register,  handleSubmit, formState: {errors}} = useForm<signinType>({
    resolver: zodResolver(signinSchema),
    mode: "onBlur",
  })

  const loginHandler:SubmitHandler<signinType>  =(data)=>{
       console.log(data)
  }

  return (
    <>
    <Heading title='User Login' />
    <Row>
      <Col md={{span: 6, offset: 3}}>
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
            Login
          </Button>    
        </Form>
      </Col>
    </Row>
    </>
  )
}

export default Login