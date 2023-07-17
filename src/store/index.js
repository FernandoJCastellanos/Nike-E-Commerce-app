// Environment
import { configureStore } from "@reduxjs/toolkit";

// Slices
import { productSlice } from "./productSlice";
import { cartSlice } from "./cartSlice";
import {apiSlice} from "./apiSlice";


export const store = configureStore({


    reducer: {
        // here we are getting the names we set of the selectors in the slices
        // selectorName: sliceFileName.reducer,
        products: productSlice.reducer,
        cart: cartSlice.reducer,
        api: apiSlice.reducer,
    },

    // Adding the api middleware enables caching, invalidation, polling,
    // and other useful features of `rtk-query`.
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(apiSlice.middleware),
    });