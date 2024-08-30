import { TProduct } from "@customeypes/product";
import { createSlice} from "@reduxjs/toolkit";
import getCartTotalQuantity from "./selectors";
import actGetProductsByItems from "./act/actGetProductsByItems";
import { TLoading } from "@customeypes/shared";

interface ICartState {
     items:{ [key : string ] : number },
     productFullInfo: TProduct[],
     loading: TLoading,
     error : null | string
}


const  initialState: ICartState = {
    items:{},
    productFullInfo:[],
    loading: "idle",
    error: null
}

const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        addToCart: (state, action)=>{
           const id = action.payload
           if(state.items[id]){
              state.items[id]++
           }else{
               state.items[id] = 1
           }
        },
        cartItemChangeQuantity : (state, action)=>{
            state.items[action.payload.id] = action.payload.quantity
        }, 
        removeItem : (state, action)=>{
            
            delete state.items[action.payload]
            state.productFullInfo = state.productFullInfo.filter((items) => items.id !== action.payload)
        }
    },
    extraReducers:(builder)=>{
        builder.addCase(actGetProductsByItems.pending,(state)=>{
            state.loading = "pending";
            state.error = null
        })
        builder.addCase(actGetProductsByItems.fulfilled, (state, action)=>{
            state.loading = "succeeded";
            state.productFullInfo = action.payload
        })
        builder.addCase(actGetProductsByItems.rejected, (state,action)=>{
            state.loading = "failed";
            if(action.payload && typeof action.payload === "string"){
                state.error = action.payload
            }
            
        })
    }
    

})





export {getCartTotalQuantity, actGetProductsByItems, } 
export const {addToCart, cartItemChangeQuantity, removeItem} = cartSlice.actions
export default cartSlice.reducer