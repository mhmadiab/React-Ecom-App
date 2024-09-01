import  {isAxiosError} from "axios"

const isAxiosErrorHandler = (error:unknown) => {
    if(isAxiosError(error)){
        return (error.response?.data.message || error.message)

    }else{
        return("Unexpected error")
    }
}

export default isAxiosErrorHandler