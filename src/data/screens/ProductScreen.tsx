// Environment
import { StyleSheet, Text, View, Image, FlatList, Pressable } from 'react-native';
import { useSelector } from 'react-redux';

// Components


// Data
import products from "../products"






const ProductScreen = ( {navigation} )  => {

    const products = useSelector((state : any) => state.products.products);



    return(
        <View>


            <FlatList 
                data={products}
                renderItem={({item}: any) => (
                    <Pressable onPress={()=> navigation.navigate("Product Details")}
                    style={styles.itemContainer}
                    >
                        <Image
                        source={{uri: item.image}}
                        style={styles.image}
                        />
                    </Pressable>
                )}
                numColumns={2}
            />

        </View>
    );
};


const styles = StyleSheet.create({

    itemContainer: {
      width: "50%",
      padding: 1,
    },
    image: {
      width: "100%",
      aspectRatio: 1,
    },
  
  });
  

  export default ProductScreen;