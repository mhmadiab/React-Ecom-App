import { createSlice } from "@reduxjs/toolkit";
import actGetCategories from "./act/actGetCategories";
import { TLoading } from "@customeypes/shared";
import { TCategory } from "@customeypes/category";

interface ICategoriesState{
    records:TCategory[]
    loading: TLoading
    error: string  | null
}

const initialState: ICategoriesState = {
    records:[],
    loading: "idle",
    error: null
}

const categoriesSlice = createSlice({
    name: "categories",
    initialState,
    reducers:{
        cleanUpCategoriesRecords : (state)=>{
            state.records = []
        }
    },
    extraReducers:(builder)=>{
        builder.addCase(actGetCategories.pending,(state)=>{
            state.loading = "pending";
            state.error = null
        })
        builder.addCase(actGetCategories.fulfilled, (state, action)=>{
            state.loading = "succeeded";
            state.records = action.payload
        })
        builder.addCase(actGetCategories.rejected, (state,action)=>{
            state.loading = "failed";
            if(action.payload && typeof action.payload === "string"){
                state.error = action.payload
            }
            
        })
    }
   
})

export const {cleanUpCategoriesRecords} = categoriesSlice.actions
export {actGetCategories}
export default categoriesSlice.reducer