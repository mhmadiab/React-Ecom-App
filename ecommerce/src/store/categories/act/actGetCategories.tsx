import { TCategory } from "@customeypes/category";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from 'axios'
import isAxiosErrorHandler from "@util/isAxiosErrorHandler";

type TResponse =TCategory[]


const actGetCategories = createAsyncThunk("categories/actGetCategories", async(_,thunkAPI)=>{
    const {rejectWithValue, signal} = thunkAPI
    try{
      const res = await axios.get<TResponse>("/categories", {
        signal,
      })
      const data = res.data
      return data
    }catch(error){
        return rejectWithValue(isAxiosErrorHandler(error));

    }
})

export default actGetCategories