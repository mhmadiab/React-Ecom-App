import { TProduct } from "@customeypes/product";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { RootState } from "@store/index";
import axios from 'axios'
import isAxiosErrorHandler from "@util/isAxiosErrorHandler";
type TResponse = TProduct[]


const actGetProductsByItems = createAsyncThunk("cart/actGetProductsByItems", async(_,thunkAPI)=>{
    const {fulfillWithValue,  rejectWithValue, getState, signal}= thunkAPI
    const {carts}  = getState() as RootState
    const itemsID = Object.keys(carts.items)

    if(!itemsID.length){
        return fulfillWithValue([])
    }
    
    try {
        const concatenatedItemsID = itemsID.map(el=> `id=${el}`).join('&')
        const response = await axios.get<TResponse>(`/products?${concatenatedItemsID}`, {
            signal
        })
        return response.data
        
    } catch (error) {
      return rejectWithValue(isAxiosErrorHandler(error));
    }

})

export default actGetProductsByItems