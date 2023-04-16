// Environment

import { StyleSheet, Text, View, Image, FlatList, useWindowDimensions, ScrollView, Pressable } from 'react-native';


// Components
import CartListItem from '../../components/CartListItem';

// Data
import cart from '../cart';



const ShoppingCart = () => {

    const ShoppingCartTotals = () => (

            <View style={styles.totalsContainer}>
                <View style={styles.row}>
                    <Text style={styles.text}>
                        Subtotal
                    </Text>
                    <Text style={styles.text}>
                        $420
                    </Text>
                </View>
                <View style={styles.row}>
                    <Text style={styles.text}>
                        Delivery
                    </Text>
                    <Text style={styles.text}>
                        $69
                    </Text>
                </View>
                <View style={styles.row}>
                    <Text style={styles.textBold}>
                        Total
                    </Text>
                    <Text style={styles.textBold}>
                        $1500
                    </Text>
                </View>
            </View>
        
    )
    
    return(
    <>
        <FlatList
        // Array of data we will utilize
            data={cart}
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