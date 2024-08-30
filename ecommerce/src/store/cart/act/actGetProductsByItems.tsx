import { TProduct } from "@customeypes/product";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { RootState } from "@store/index";
import axios from 'axios'

type TResponse = TProduct[]


const actGetProductsByItems = createAsyncThunk("cart/actGetProductsByItems", async(_,thunkAPI)=>{
    const {fulfillWithValue,  rejectWithValue, getState}= thunkAPI
    const {carts}  = getState() as RootState
    const itemsID = Object.keys(carts.items)

    if(!itemsID.length){
        return fulfillWithValue([])
    }
    
    try {
        const concatenatedItemsID = itemsID.map(el=> `id=${el}`).join('&')
        const response = await axios.get<TResponse>(`/products?${concatenatedItemsID}`)
        return response.data
        
    } catch (error) {
        if(axios.isAxiosError(error)){
            return rejectWithValue(error.response?.data.message || error.message)

        }else{
            return rejectWithValue("Unexpected error")
        }
    }

})

export default actGetProductsByItems