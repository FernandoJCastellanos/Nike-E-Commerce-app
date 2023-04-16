import { createSelector, createSlice } from "@reduxjs/toolkit";

const initialState = {
    items: [],
    deliveryFee: 15,
    freeDeliveryFrom: 200,
};




export const cartSlice = createSlice({

    name:"cart",
    initialState,
    reducers:{
        // these are the selectors
        addCartItem: (state, action) => {

            // here we set that this will be an action,
            // it will contain a payload, and the name will be product
            const newProduct = action.payload.product;

            // here we try to find if the item being pushed already exist in the state
            //the cartItem is from the props being passed down we are updating it
            const cartItem = state.items.find(
                (item) => item.product.id === newProduct.id
            );
            if(cartItem) {
                cartItem.quantity += 1;
            }else {
            // here we get and select the initial state that we created above
            // and we are going to push data into it
            // we are going to push an Object, where product is our newProduct
            // and we are pushing the update to quantity +1 to the state
                state.items.push({product: newProduct, quantity: 1})
            }



        },
        // these are the selectors
        // here we are removing the item from cartItem if quantity is 0 or less
        changeQuantity: (state, action) => {
            const { productId, amount } = action.payload;
            const cartItem = state.items.find(
                (item) => item.product.id === productId
                );
            if (cartItem) {
                cartItem.quantity += amount;
            }
            if(cartItem.quantity <= 0){
                state.items = state.items.filter((item) => item !== cartItem);
            }
        },
    }
// after we set these up we trigger the reducers
// and to do this we need to dispatch an action
});



export const selectNumberOfItems = (state) => state.cart.items.length;

// Getting sub total of all products in cart
export const selectSubtotal= (state) => state.cart.items.reduce(
    (sum, cartItem) => sum + cartItem.product.price * cartItem.quantity,
    0
);

const cartSelector = (state) => state.cart;

// getting the selector from above and useing another one
export const selectDeliveryPrice = createSelector(
    cartSelector,
    selectSubtotal,
    // here we are pulling data from the parent component (cart, subtotal) => 
    (cart, subtotal) => (subtotal > cart.freeDeliveryFrom ? 0 : cart.deliveryFee)
);

export const selectTotal = createSelector(
    selectSubtotal,
    selectDeliveryPrice,
    (subtotal, delivery) => (subtotal + delivery)
)