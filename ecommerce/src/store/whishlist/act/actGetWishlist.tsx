import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { TProduct } from "@customeypes/product";


type TResponse = TProduct[]


const actGetWishlist = createAsyncThunk("wishlist/actGetWishlist", async(_,thunkAPI)=>{
    const {rejectWithValue, fulfillWithValue} = thunkAPI
     try {
        const userWishlist = await axios.get<{productId : number} []>('/wishlist?userId=1')
        if(!userWishlist.data.length ){
            return fulfillWithValue([])
        }
        const concatendatedItemsId = userWishlist.data.map((el)=> `id=${el.productId}`).join('&') 
        const response =  await axios.get<TResponse>(`/products?${concatendatedItemsId}`)
        return response.data
     } catch (error) {
        if(axios.isAxiosError(error)){
            return rejectWithValue(error.response?.data.message || error.message)
        }else 
           return rejectWithValue("can't perform the action")

     }

})

export default actGetWishlist
