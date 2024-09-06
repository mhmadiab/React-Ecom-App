import { createSlice } from "@reduxjs/toolkit";
import actLikeToggle from "./act/actLikeToggle";
import actGetWishlist from "./act/actGetWishlist";
import { TLoading } from "@customeypes/shared";
import { TProduct } from "@customeypes/product";
import { authLogout } from "@store/auth/authSlice";

interface IWishlist {
    itemId : number [],
    error : null  | string ,
    loading : TLoading, 
    productFullInfo: TProduct[]
}

const initialState : IWishlist = {
   itemId :[],
   error : null, 
   loading : "idle",
   productFullInfo : []


}

const wishlistSlice = createSlice({
    name : "whishlist", 
    initialState,
    reducers : {
        productFullInfoCleanUp: (state)=>{
            state.productFullInfo = []
        }

    },
    extraReducers: (builder)=>{
        builder.addCase(actLikeToggle.pending, (state)=>{
             state.error  =  null ;

        })
        builder.addCase(actLikeToggle.fulfilled, (state, action)=>{
            if(action.payload.type === "add"){
                    state.itemId.push(action.payload.id)
            }else{
                state.itemId = state.itemId.filter(item => item !== action.payload.id)
                state.productFullInfo = state.productFullInfo.filter((el)=>  el.id !== action.payload.id)

            }
        })
        builder.addCase(actLikeToggle.rejected, (state, action)=>{
            if(action.payload && typeof action.payload === "string"){
                state.error = action.payload
            }
        })

        //get wishlist:
        builder.addCase(actGetWishlist.pending, (state)=>{
            state.error  =  null ;
            state.loading = "pending";

       })
       builder.addCase(actGetWishlist.fulfilled, (state, action)=>{
           state.loading =  "succeeded";
           if(action.payload.dataType === "productsFullInfo"){
            state.productFullInfo = action.payload.data as TProduct[]
           }else if(action.payload.dataType === "productsIds"){
              state.itemId = action.payload.data as number[]
           }
           
       })
       builder.addCase(actGetWishlist.rejected, (state, action)=>{
           state.loading = "failed"
           if(action.payload && typeof action.payload === "string"){
               state.error = action.payload
           }
       })

       //logout and reset
       builder.addCase(authLogout, (state)=>{
        state.itemId = []
        state.productFullInfo = []
       })
    }

})

export const {productFullInfoCleanUp} = wishlistSlice.actions
export {actLikeToggle, actGetWishlist} 
export default wishlistSlice.reducer