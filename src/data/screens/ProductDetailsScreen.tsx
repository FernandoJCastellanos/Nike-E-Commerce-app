// Environment

import { StyleSheet, Text, View, Image, FlatList, useWindowDimensions, ScrollView, Pressable } from 'react-native';


// Components


// Data
import products from "../products"


const ProductDetailsScreen = () => {

    const product = products[0];

    // we get the width of the screen to get a dynamic size and set it as our width in styles for images
    const {width} = useWindowDimensions();

    const addToCart = () => {
        console.warn("Add to Cart");

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