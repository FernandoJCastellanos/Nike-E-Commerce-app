// Environment

import { StyleSheet, Text, View, Image, FlatList, useWindowDimensions, ScrollView, Pressable, ActivityIndicator, Alert } from 'react-native';


// Components
import CartListItem from '../components/CartListItem';

// Data
import { useSelector, useDispatch  } from 'react-redux';
import { selectDeliveryPrice, selectSubtotal, selectTotal, cartSlice} from '../store/cartSlice';
import { useCreateOrderMutation, useCreatePaymentIntentMutation } from '../store/apiSlice';
import { useState } from 'react';
import { useStripe } from '@stripe/stripe-react-native';



const ShoppingCartTotals = () => {

    const subtotal = useSelector(selectSubtotal);
    const deliveryFee = useSelector(selectDeliveryPrice);
    const total = useSelector(selectTotal);

    return (
    <View style={styles.totalsContainer}>
        <View style={styles.row}>
            <Text style={styles.text}>
                Subtotal
            </Text>
            <Text style={styles.text}>
                ${subtotal}
            </Text>
        </View>
        <View style={styles.row}>
            <Text style={styles.text}>
                Delivery
            </Text>
            <Text style={styles.text}>
                ${deliveryFee}
            </Text>
        </View>
        <View style={styles.row}>
            <Text style={styles.textBold}>
                Total
            </Text>
            <Text style={styles.textBold}>
                ${total}
            </Text>
        </View>
    </View>
)
}



const ShoppingCart = () => {
    const subtotal = useSelector(selectSubtotal);
    const deliveryFee = useSelector(selectDeliveryPrice);
    const total = useSelector(selectTotal);
    const dispatch = useDispatch();


    // here we are getting the name that we set of the selector in the slice
    // and getting the state name
    const cartItems = useSelector((state: any) => state.cart.items)
    
    const [createOrder , {data, error, isLoading}] = useCreateOrderMutation();

    const [createPaymentIntent] = useCreatePaymentIntentMutation();

    const {initPaymentSheet, presentPaymentSheet} = useStripe();

    const onCheckout = async () => {
        // 1. Create a payment intent we need this number to also represent pennies, or what ever currency
            const response = await createPaymentIntent({amount: Math.floor(total * 100),})
            console.log(response)
            if(response.error){
                Alert.alert("Something went wrong.", response.error)
                return;
            }
        // 2. Initialize the Payment sheet
		const { error: paymentSheetError } = await initPaymentSheet({
            merchantDisplayName: 'Example, Inc.',
            paymentIntentClientSecret: response.data.paymentIntent,
            defaultBillingDetails: {
              name: 'Jane Doe',
            },
          });
          if (paymentSheetError) {
            Alert.alert('Something went wrong', paymentSheetError.message);
            return;
          }
        // 3. Present the Payment Sheet from Stripe
        const { error: paymentError } = await presentPaymentSheet();
        if (paymentError) {
            Alert.alert(`Error code: ${paymentError.code}`, paymentError.message);
            return;
          }
        // 4. If payment ok -> create the order
        onCreateOrder();
      };


    const onCreateOrder = async () => {

        const result =  await createOrder({
            items: cartItems,
            subtotal,
            deliveryFee,
            total,
            customer: {
                name: "fjc",
                address: "My home",
                email: "fernandojcastellanos@gmail.com"
            }
        });

        if(result.data?.status === "OK"){
            Alert.alert(
                "Order has been submitted",
                `Your order reference is: ${result.data.data.ref}`
            );
            dispatch(cartSlice.actions.clear());
        }

    }

    return(
    <>
        <FlatList
        // Array of data we will utilize
            data={cartItems}
        // the .map for react native, for each loop
            renderItem={({item}) => <CartListItem cartItem={item}/>}
            ListFooterComponent={ShoppingCartTotals}
        >
        </FlatList>

            <Pressable onPress={onCheckout} style={styles.button} >
                <Text style={styles.buttonText}>
                    Checkout
                    {isLoading && <ActivityIndicator />}
                </Text>
            </Pressable>


    </>

    )
}


const styles = StyleSheet.create({
    totalsContainer:{
        margin: 20,
        paddingTop: 10,
        borderColor: "gainsboro",
        borderTopWidth: 1,
        paddingBottom: 100,
    },
    row:{
        flexDirection: "row",
        justifyContent: "space-between",
        marginVertical: 2,

    },
    text: {
        fontSize: 16,
        color: "gray",
    },
    textBold: {
        fontSize: 16,
        fontWeight: "500",
    },
    button: {
        position: 'absolute',
        backgroundColor: "black",
        bottom: 30,
        width: "90%",
        alignSelf: "center",
        padding: 20,
        borderRadius: 100,
        justifyContent: "center",
        alignItems: "center",
    
    
    },
    buttonText: {
        fontSize: 16,
        fontWeight: "500",
        color: "white",
    
    },
})








export default ShoppingCart;