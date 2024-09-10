import axios from "axios";
import isAxiosErrorHandler from "@util/isAxiosErrorHandler";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { RootState } from "@store/index";


const actPlaceOrder = createAsyncThunk("orders/actPlaceOrder", async(subtotal: number,thunkAPI)=>{
    const {rejectWithValue, getState}= thunkAPI
    const {auths, carts} = getState() as RootState

    const orderItems = carts.productFullInfo.map(el=>({
        id: el.id,
        title: el.title,
        price: el.price,
        quantity: carts.items[el.id],
        img: el.img
    }))

    try {
        const res = await axios.post("/orders",{
            userId: auths.user?.id,
            items: orderItems,
            subtotal
        })

        return res.data
        
    } catch (error) {
        return rejectWithValue(isAxiosErrorHandler(error))
    }

})

export default actPlaceOrder