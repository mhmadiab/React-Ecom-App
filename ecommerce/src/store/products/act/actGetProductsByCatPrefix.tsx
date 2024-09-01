import { TProduct } from "@customeypes/product";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import isAxiosErrorHandler from "@util/isAxiosErrorHandler";

type TResponse = TProduct[]

const actGetProductsByCatPrefix = createAsyncThunk("product/actGetProductsByCatPrefix", async(prefix:string,thunkAPI)=>{
    const {rejectWithValue, signal} = thunkAPI
    try {
        const res = await axios.get<TResponse>(`/products?cat_prefix=${prefix}`, {
            signal,
        })
        return res.data
    }catch(error){
        return rejectWithValue(isAxiosErrorHandler(error));
    }
})

export default actGetProductsByCatPrefix