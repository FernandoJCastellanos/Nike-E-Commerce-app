// Environment
import { configureStore } from "@reduxjs/toolkit";

// Slices
import { productSlice } from "./productSlice";
import { cartSlice } from "./cartSlice";


export const store = configureStore({


    reducer: {
        // here we are getting the names we set of the selectors in the slices
        // selectorName: sliceFileName.reducer,
        products: productSlice.reducer,
        cart: cartSlice.reducer,
    },


    });









