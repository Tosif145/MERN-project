import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query/react";
import { apiSlice } from "./Api/apiSlice";
import authReducer from './Features/auth/authSlice';

const store = configureStore({
    reducer: {
        [apiSlice.reducerPath]: apiSlice.reducer,
        auth: authReducer,
    },

    middleware : (getDeafaultMiddleware) => getDeafaultMiddleware().concat(apiSlice.middleware),
    devTools: true,
});


setupListeners(store.dispatch);
export default store;