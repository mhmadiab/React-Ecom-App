import {Button, Row, Col} from 'react-bootstrap';
import Form from 'react-bootstrap/Form';
import { Heading } from '@components/common';
import {useForm, SubmitHandler} from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod';
import {signupSchema, type signupType} from '@validations/signupSchema';
import { Input } from '@components/forms';
import useCheckEmailAvailability from '@hooks/useCheckEmailAvailability';



const Register = () => {

  const{register, handleSubmit, formState:{errors}, getFieldState, trigger}= useForm<signupType>({
      mode: "onBlur", 
      resolver: zodResolver(signupSchema),
  })

  const {checkEmailAvailability, enterEmail,  emailAvailabilityStatus, resetEmailAvailability} = useCheckEmailAvailability()


  const submitForm : SubmitHandler<signupType>= (data)=>{
     console.log(data)
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

  return (
    <>
    <Heading title='User Registertion' />
    <Row>
      <Col md={{span: 6, offset: 3}}>
        <Form  onSubmit={handleSubmit(submitForm)}>
          <Input label='First Name' type="text" register={register}  name='firstName' error={errors.firstName?.message} />
          <Input label='Last Name' type="text" register={register}  name='lastName' error={errors.lastName?.message} />
          <Input label='email' 
                 type="text" 
                 register={register}  
                 name='email' 
                 error={errors.email?.message
                  ? errors.email?.message
                  : emailAvailabilityStatus === "notAvailable"
                  ? "This email is already in use."
                  : emailAvailabilityStatus === "failed"
                  ? "Error from the server."
                  : ""
                 } 
                 onBlur={emailOnBlurHandler} 
                 formText = {
                  emailAvailabilityStatus === "checking" ?
                                              "we are curently cheching the availability of your email address" : ""
                 }
                 success={
                  emailAvailabilityStatus === "available"
                    ? "This email is available for use."
                    : ""}
                  disabled={emailAvailabilityStatus === "checking" ? true : false }
                 />

          <Input label='password' 
                 type="password" 
                 register={register}  
                 name='password' 
                 error={errors.password?.message} />

          <Input label='confirm password' 
                 type="password" 
                 register={register}  
                 name='confirmPassword' 
                 error={errors.confirmPassword?.message} />

          <Button className='mb-5' 
                  variant="info" 
                  type="submit" 
                  style={{color: 'white'}}
                  disabled={emailAvailabilityStatus === "checking" ? true : false }>
            Submit
          </Button>
        </Form>
      </Col>
    </Row>
    </>
  )
}

export default Register