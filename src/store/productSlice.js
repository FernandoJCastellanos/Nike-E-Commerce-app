import { createSlice } from "@reduxjs/toolkit";
import products from "../data/products";

const initialState ={ 

    product: products,

};

export const productSlice = createSlice({

    name:"products",
    initialState,
    reducers: {}

})