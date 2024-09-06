import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import isAxiosErrorHandler from "@util/isAxiosErrorHandler";


type TFormData ={
    email: string,
    password: string
}


const actAuthLogin = createAsyncThunk("auth/actAuthLogin", async(formData : TFormData, thunkAPI)=>{
    const {rejectWithValue}= thunkAPI
    try {

      const res = axios.post("/login", formData)
      return (await res).data
        
    } catch (error) {
        return rejectWithValue(isAxiosErrorHandler(error))
    }
})

export default actAuthLogin