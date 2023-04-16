// Environment

import { StyleSheet, Text, View, Image, FlatList, useWindowDimensions, ScrollView, Pressable } from 'react-native';


// Components
import CartListItem from '../../components/CartListItem';

// Data
import { useSelector } from 'react-redux';
import { selectDeliveryPrice, selectSubtotal, selectTotal } from '../../store/cartSlice';




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

    // here we are getting the name that we set of the selector in the slice
    // and getting the state name
    const cartItems = useSelector((state: any) => state.cart.items)
    
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

            <Pressable style={styles.button} >
                <Text style={styles.buttonText}>
                    Checkout
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