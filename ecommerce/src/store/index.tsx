import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { persistStore, persistReducer,  
        FLUSH,
        REHYDRATE,
        PAUSE,
        PERSIST,
        PURGE,
        REGISTER, } from "redux-persist";
import storage from "redux-persist/lib/storage";

//Reducers(Slice):
import categories from "./categories/categoriesSlice";
import products from "./products/productsSlice";
import carts from "./cart/cartSlice";
import wishlists from "./whishlist/wishlistSlice";
import auths from "./auth/authSlice";


const rootPersistConfig = {
    key: "root",
    storage,
    whitelist: ["carts", "auths"]
}

const authPersistConfig = {
    key: "auths",
    storage,
    wishlist:["user",  "accessToken"]

}

const cartPersistConfig = {
    key: "carts",
    storage,
    whitelist:["items"],

}



const rootReducer = combineReducers({
    categories,
    products,
    carts: persistReducer(cartPersistConfig,carts),
    wishlists :  wishlists,
    auths : persistReducer(authPersistConfig,  auths)

})

const persistedReducer = persistReducer(rootPersistConfig, rootReducer)


const store =  configureStore({
    reducer: persistedReducer,
    middleware:  (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [FLUSH,REHYDRATE,PAUSE,PERSIST,PURGE,REGISTER]
            }
        })
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch;

const persistor = persistStore(store)

export  {store, persistor}