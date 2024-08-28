import {  createSelector } from "@reduxjs/toolkit";
import { RootState } from "../../index";


const getCartTotalQuantity = createSelector((state: RootState)=> state.carts.items, (items)=>{
    const Totalquantity = Object.values(items).reduce(
              (accumaltor, currentValue)=> 
                   {return accumaltor + currentValue}
               ,0 
           )
             return Totalquantity
})

export default getCartTotalQuantity