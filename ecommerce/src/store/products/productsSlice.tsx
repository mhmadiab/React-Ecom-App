import { createSlice } from "@reduxjs/toolkit";
import actGetProductsByCatPrefix from "./act/actGetProductsByCatPrefix";
import { TProduct } from "@customeypes/product";
import { TLoading } from "@customeypes/shared";

interface IProductState {
   records: TProduct[],
   loading: TLoading,
   error: string | null
}

const initialState:IProductState ={
    records: [],
    loading: "idle",
    error: null
}

const productSlice = createSlice({
    name: "product",
    initialState,
    reducers: {
        cleanUp:(state)=>{
            state.records  =[]
        }
    },
    extraReducers: (builder) => {
        builder.addCase(actGetProductsByCatPrefix.pending, (state) => {
            state.loading = 'pending'
            state.error = null
        })
        builder.addCase(actGetProductsByCatPrefix.fulfilled, (state, action)=>{
            state.loading = "succeeded";
            state.records = action.payload
        })
        builder.addCase(actGetProductsByCatPrefix.rejected, (state, action)=>{
            state.loading = "failed";
            if(action.payload && typeof action.payload === "string"){
                state.error = action.payload
            }
        })
    }
})

export const  { cleanUp } = productSlice.actions
export {actGetProductsByCatPrefix}
export default productSlice.reducer