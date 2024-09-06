import {Button, Row, Col, Alert, Spinner} from 'react-bootstrap';
import Form from 'react-bootstrap/Form';
import { Heading } from '@components/common';
import useLogin from '@hooks/useLogin';
import { Navigate } from 'react-router-dom';
import { Input } from '@components/forms';

const Login = () => {
  const {loading, error, accessToken,searchParams,errors, register,  handleSubmit, loginHandler } = useLogin()
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