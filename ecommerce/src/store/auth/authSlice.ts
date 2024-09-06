import { TLoading } from "@customeypes/shared";
import { createSlice } from "@reduxjs/toolkit";
import actAuthRegister from "./act/actAuthRegister";
import actAuthLogin from "./act/actAuthLogin";

interface IAuthstate {
    loading : TLoading,
    error : string | null,
    user:{
        id : number ,
        firstName: string,
        lastName: string,
        email: string,

    } | null, 
    accessToken: string | null,
}

const  initialState : IAuthstate = {
    loading : "idle",
    error : null,
    user: null,
    accessToken: null

}



const authSlice = createSlice({
    name : "auth",
    initialState,
    reducers : {
        resetUI: (state)=>{
            state.loading = "idle"
            state.error = null
        },
        authLogout : (state)=>{
            state.user = null
            state.accessToken = null
            
        }

    },
    extraReducers: (builder)=>{
       builder.addCase(actAuthRegister.pending, (state)=>{
        state.loading = "pending";
        state.error= null
       })
       builder.addCase(actAuthRegister.fulfilled, (state)=>{
        state.loading = "succeeded"
        
       })
       builder.addCase(actAuthRegister.rejected, (state, action)=>{
        state.loading = "failed"
        if(action.payload && typeof action.payload === "string"){
            state.error = action.payload
        }
       })

       //Login
       builder.addCase(actAuthLogin.pending, (state)=>{
        state.loading = "pending";
        state.error= null
       })
       builder.addCase(actAuthLogin.fulfilled, (state, action)=>{
        state.loading = "succeeded"
        state.accessToken = action.payload.accessToken
        state.user = action.payload.user
        
       })
       builder.addCase(actAuthLogin.rejected, (state, action)=>{
        state.loading = "failed"
        if(action.payload && typeof action.payload === "string"){
            state.error = action.payload
        }
       })
    }

})


export  const {resetUI, authLogout} = authSlice.actions
export {actAuthRegister, actAuthLogin} 
export default authSlice.reducer