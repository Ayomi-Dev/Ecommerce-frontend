import { configureStore } from "@reduxjs/toolkit";
import cartReducer from './cartSlice'
import orderReducer from './orderSlice'


export const store = configureStore({
    reducer: {
        cart: cartReducer,
        order: orderReducer
    }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;