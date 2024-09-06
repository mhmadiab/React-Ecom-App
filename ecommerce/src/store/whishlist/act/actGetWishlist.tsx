import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { TProduct } from "@customeypes/product";
import isAxiosErrorHandler from "@util/isAxiosErrorHandler";
import { RootState } from "@store/index";


type TResponse = TProduct[]
type TDataType = "productsFullInfo" | "productsIds"

const actGetWishlist = createAsyncThunk("wishlist/actGetWishlist", async(dataType: TDataType,thunkAPI)=>{
    const {rejectWithValue, signal, getState} = thunkAPI
    const {auths} = getState() as RootState
     try {
        const userWishlist = await axios.get<{productId : number} []>(`/wishlist?userId=${auths.user?.id}`)
        if(!userWishlist.data.length ){
         return {data: [], dataType:"empty"}
        }

        if(dataType === "productsIds"){
         const concatendatedItemsId = userWishlist.data.map((el)=>el.productId)  
         return {data: concatendatedItemsId, dataType:"productsIds"}
        }else{
         const concatendatedItemsId = userWishlist.data.map((el)=> `id=${el.productId}`).join('&') 
         const response =  await axios.get<TResponse>(`/products?${concatendatedItemsId}`, {
            signal
         })
         return {data: response.data, dataType:"productsFullInfo"}
        }
     } catch (error) {
        return rejectWithValue(isAxiosErrorHandler(error));
     }

})

export default actGetWishlist
