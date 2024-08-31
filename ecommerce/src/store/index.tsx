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


const cartPersistConfig = {
    key: "carts",
    storage,
    whitelist:["items"],

}

const wishlistsPersistConfig = {
    key : "wishlists", 
    storage, 
    wishlists : ["itemId"]
}

const rootReducer = combineReducers({
    categories,
    products,
    carts: persistReducer(cartPersistConfig,carts),
     wishlists :  persistReducer(wishlistsPersistConfig,wishlists),
})


const store =  configureStore({
    reducer: rootReducer,
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