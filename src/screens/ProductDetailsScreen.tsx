// Environment

import { StyleSheet, Text, View, Image, FlatList, useWindowDimensions, ScrollView, Pressable, ActivityIndicator } from 'react-native';


// Components


// Data
import products from "../data/products"
import { cartSlice } from '../store/cartSlice';
import { useSelector, useDispatch } from "react-redux";
import { useGetProductQuery } from '../store/apiSlice';



const ProductDetailsScreen = ({route}: any) => {

    const id = route.params.id;

    const {data, isLoading, error} = useGetProductQuery(id);

    const product = data?.data;

    // dummy data
    // const product = useSelector((state: any) => state.products.selectedProduct);

    // we bring this from the redux toolkit to call actions
    const dispatch = useDispatch();


    // we get the width of the screen to get a dynamic size and set it as our width in styles for images
    const {width} = useWindowDimensions();



    const addToCart = () => {
        // we call the dispatch to dispatch the action
        // we call the name of the slice of the redux we want to use
        // we call the action
        // we call the action name
        // and we push the object that we named/set inside the redux slice these names need to match

        // we need to push the key and value but when they are the same just push the payload like so
        // otherwise its like this        dispatch(cartSlice.actions.addCartItem({key: value}))
        // the key is the name we set of the payload inside of the slice 
        // const newProduct = action.payload.product;
        // the value is the name we are pushing or passing down the data stream
        // const product = useSelector((state: any) => state.products.selectedProduct);

        dispatch(cartSlice.actions.addCartItem({product}))
    }


    if(isLoading){
        return <ActivityIndicator />
    }

    if(error){
        return <Text>Error fetching the product. {error.error}</Text>
    }



    return (
        <View>
            <ScrollView>


                {/* Image Carousel */}

                <FlatList 
                    data={product.images}
                    renderItem={({item}: any) => (
                        <Image
                        source={{uri: item}}
                        style={{width: width, aspectRatio: 1,}}
                        />
                )}
                horizontal
                showsHorizontalScrollIndicator={false}
                pagingEnabled
                />


                <View style={{padding: 20}}>

                    {/* Title */}
                    <Text style={styles.title}>
                        {product.name}
                    </Text>

                    {/* Price */}
                    <Text style={styles.price}>
                        ${product.price}
                    </Text>

                    {/* Description */}
                    <Text style={styles.description}>
                        {product.description}
                    </Text>

                </View>
            </ScrollView>


            {/* Add to cart button */}
                <Pressable style={styles.button} onPress={addToCart}>
                    <Text style={styles.buttonText}>
                        Add to cart
                    </Text>
                </Pressable>

            {/* navigation icon */}


        </View>


    )

}

const styles = StyleSheet.create({

image: {
    width: 300,
    aspectRatio: 1,
},
title: {
    fontSize: 34,
    fontWeight: "500",
    marginVertical: 10,

},
price: {
    fontSize: 16,
    fontWeight: "500",
    letterSpacing: 1.5,

},
description: {
    fontSize: 18,
    fontWeight: "300",
    marginVertical: 10,
    lineHeight: 30,
    marginBottom: 125,

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
});


export default ProductDetailsScreen;