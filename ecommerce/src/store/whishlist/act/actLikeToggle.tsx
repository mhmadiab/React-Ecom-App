// import { TWhishlist } from "@customeypes/whishlist";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// type TResponse = TWhishlist

const actLikeToggle = createAsyncThunk("wishlist", async(id: number,thunkAPI)=>{
     const {rejectWithValue, } = thunkAPI
     try {
        const isRecordExist = await axios.get(`/wishlist?userId=1&productId=${id}`)
        if (Array.isArray(isRecordExist.data) && isRecordExist.data.length > 0){
            console.log("exist")
            await axios.delete(`/wishlist/${isRecordExist.data[0].id}`)
            return {type : "remove" , id}
        }else{
            console.log("exist")
            await axios.post("/wishlist", {userId : "1", productId : id })
            return  {type : "add" , id}
        }
        
     } catch (error) {
        if(axios.isAxiosError(error)){
            return rejectWithValue(error.response?.data.message || error.message)
        }else 
           return rejectWithValue("can't perform the action")

     }
})

export default actLikeToggle
