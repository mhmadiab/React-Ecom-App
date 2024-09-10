import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import isAxiosErrorHandler from "@util/isAxiosErrorHandler";
import { TOrderItem } from "@customeypes/order.types";
import { RootState } from "@store/index";

type TResponse = TOrderItem[]

const actGetOrders = createAsyncThunk("orders/actGetOrders", async(_,thunkAPI)=>{
    const {rejectWithValue, getState, signal} = thunkAPI
    const {auths} = getState() as RootState

    try {

        const response = await axios.get<TResponse>(`/orders?userId=${auths.user?.id}`, {signal})
        return response.data
        
    } catch (error) {
        return rejectWithValue(isAxiosErrorHandler(error))
    }
})

export default actGetOrders