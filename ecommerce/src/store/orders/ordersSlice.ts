import { createSlice } from "@reduxjs/toolkit";
import { TOrderItem } from "@customeypes/order.types";
import { TLoading } from "@customeypes/shared";
import actPlaceOrder from "./act/actPlaceOrder";
import actGetOrders from "./act/actGetOrders";

interface IOrdersSlice {
  orderList: TOrderItem[],
  loading: TLoading,
  error: null | string
  
}

const initialState: IOrdersSlice ={
    orderList: [],
    loading: "idle", 
    error: null
}

const ordersSlice = createSlice({
    name: 'orders',
    initialState,
    reducers:{
         cleanUpOrder : (state)=>{
            state.loading="idle"
            state.error = null
         },

    },
    extraReducers: (builder)=>{
         builder.addCase(actPlaceOrder.pending, (state)=>{
            state.loading = "pending"
            state.error = null
         })
         builder.addCase(actPlaceOrder.fulfilled, (state)=>{
            state.loading ="succeeded"
         })
         builder.addCase(actPlaceOrder.rejected, (state,action)=>{
            state.loading = "failed"
            if(action.payload && typeof action.payload === "string"){
                state.error = action.payload
            }
         })
         //get orders:
         builder.addCase(actGetOrders.pending, (state)=>{
            state.loading = "pending"
            state.error = null
         })
         builder.addCase(actGetOrders.fulfilled, (state, action)=>{
            state.loading ="succeeded"
            state.orderList = action.payload
         })
         builder.addCase(actGetOrders.rejected, (state,action)=>{
            state.loading = "failed"
            if(action.payload && typeof action.payload === "string"){
                state.error = action.payload
            }
         })
    }
})

export const {cleanUpOrder} = ordersSlice.actions
export {actPlaceOrder, actGetOrders}
export default ordersSlice.reducer