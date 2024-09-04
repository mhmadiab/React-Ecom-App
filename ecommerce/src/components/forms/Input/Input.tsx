import { Form,  } from "react-bootstrap"
import { Path, FieldValues, UseFormRegister } from "react-hook-form"

type InputProps<TFieldValue extends FieldValues> ={
   name : Path<TFieldValue>,
   label: string, 
   type?:string,
   register: UseFormRegister<TFieldValue>,
   error?: string,
   onBlur?: (event: React.FocusEvent<HTMLInputElement>)=>void,
   formText?: string,
   success?: string 
   disabled?: boolean

}


const Input =<TFieldValue extends FieldValues>(
    {
     label,
     type , 
     register, 
     name, 
     error,
     onBlur,
     formText,
     success,
     disabled

    }: InputProps<TFieldValue>) => {
        const onBlureHandler = (e:React.FocusEvent<HTMLInputElement>)=>{
           if(onBlur){
            onBlur(e)
            register(name).onBlur(e)
           }else{
            register(name).onBlur(e)
           }
        }
  return (
    <>
    <Form.Group className='mb-3'>
            <Form.Label>{label}</Form.Label>
            <Form.Control type={type} 
                          {...register(name)} 
                          isInvalid={error ? true : false}
                          onBlur={onBlureHandler}
                          isValid={success ? true : false}
                          disabled={disabled}
                          />
            <Form.Control.Feedback type='invalid'>{error}</Form.Control.Feedback>
            <Form.Control.Feedback type='valid'>{success}</Form.Control.Feedback>
            {formText && <Form.Text muted>{formText}</Form.Text>}
    </Form.Group>
    </>
  )
}

export default Input