import { configureStore } from "@reduxjs/toolkit";
import categories from "./categories/categoriesSlice";
import products from "./products/productsSlice";
const store =  configureStore({
    reducer: {
        categories,
        products
    }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch;

export default store