import { TCategory } from "@customeypes/category";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from 'axios'

type TResponse =TCategory[]


const actGetCategories = createAsyncThunk("categories/actGetCategories", async(_,thunkAPI)=>{
    const {rejectWithValue} = thunkAPI
    try{
      const res = await axios.get<TResponse>("http://localhost:5005/categories")
      const data = res.data
      return data
    }catch(error){
        if(axios.isAxiosError(error)){
            return  rejectWithValue(error.response?.data.message || error.message)
        }
        else{
            return rejectWithValue("Unexpected error")
        }

    }
})

export default actGetCategories