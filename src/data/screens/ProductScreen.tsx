// Environment
import { StyleSheet, Text, View, Image, FlatList, Pressable } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

// Components


// Data
import products from "../products"
import { productSlice } from '../../store/productSlice';





const ProductScreen = ( {navigation}: any )  => {

    // we bring this from the redux toolkit to call actions
    const dispatch = useDispatch();

    // state.products.products = state.reducername.initialstatename
    const products = useSelector((state : any) => state.products.products);



    return(
        <View>
            <FlatList 
                data={products}
                renderItem={({item}: any) => (
                    <Pressable
                        onPress={()=> {

                        // the dispatch is calling selector and the action and calling the payload
                        dispatch(productSlice.actions.setSelectedProduct(item.id)); 

                        navigation.navigate("Product Details");
                    }}
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