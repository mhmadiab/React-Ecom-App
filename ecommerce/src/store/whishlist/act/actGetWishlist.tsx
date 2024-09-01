import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { TProduct } from "@customeypes/product";
import isAxiosErrorHandler from "@util/isAxiosErrorHandler";

type TResponse = TProduct[]


const actGetWishlist = createAsyncThunk("wishlist/actGetWishlist", async(_,thunkAPI)=>{
    const {rejectWithValue, fulfillWithValue, signal} = thunkAPI
     try {
        const userWishlist = await axios.get<{productId : number} []>('/wishlist?userId=1')
        if(!userWishlist.data.length ){
            return fulfillWithValue([])
        }
        const concatendatedItemsId = userWishlist.data.map((el)=> `id=${el.productId}`).join('&') 
        const response =  await axios.get<TResponse>(`/products?${concatendatedItemsId}`, {
         signal
        })
        return response.data
     } catch (error) {
        return rejectWithValue(isAxiosErrorHandler(error));
     }

})

export default actGetWishlist
