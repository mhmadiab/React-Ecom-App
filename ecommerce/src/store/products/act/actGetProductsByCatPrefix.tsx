import { TProduct } from "@customeypes/product";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

type TResponse = TProduct

const actGetProductsByCatPrefix = createAsyncThunk("product/actGetProductsByCatPrefix", async(prefix:string,thunkAPI)=>{
    const {rejectWithValue} = thunkAPI
    try {
        const res = await axios.get<TResponse>(`http://localhost:5005/products?cat_prefix=${prefix}`)
        return res.data
    }catch(error){
        if(axios.isAxiosError(error)){
            return rejectWithValue(error.response?.data.message || error.message)
        }else{
            return rejectWithValue("Unexpected error")
        }

    }
})

export default actGetProductsByCatPrefix