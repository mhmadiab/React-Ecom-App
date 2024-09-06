import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import isAxiosErrorHandler from "@util/isAxiosErrorHandler";


type TData = {
    firstName: string,
    lastName: string,
    email:string,
    password: string
}

type TResponse = {
    accessToken : string,
    user:{
        id: number,
        firstName:string,
        lastName: string,
        email:string
    }

}

const actAuthRegister = createAsyncThunk("auth/actAuthRegister", async(formDat: TData, thunkAPI)=>{
    const {rejectWithValue}= thunkAPI
    try {

        const res = axios.post<TResponse>("/register", formDat)
        return  (await res).data
        
    } catch (error) {
        return rejectWithValue(isAxiosErrorHandler(error))
    }
})

export  default actAuthRegister;
