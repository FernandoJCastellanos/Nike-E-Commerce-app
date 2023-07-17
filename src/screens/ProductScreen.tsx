// Environment
import { StyleSheet, Text, View, Image, FlatList, Pressable, ActivityIndicator } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

// Components


// Data
import products from "../data/products"
import { productSlice } from '../store/productSlice';
import { useGetProductsQuery } from '../store/apiSlice';




const ProductScreen = ( {navigation}: any )  => {

    // we bring this from the redux toolkit to call actions
    const dispatch = useDispatch();


    // dummy data
    // const products = useSelector((state : any) => state.products.products);

    const {data, isLoading, error} = useGetProductsQuery(undefined);
    console.log(error);
    if (isLoading) {
        return <ActivityIndicator />;
    }

    if (error) {
        return <Text>Error Fetching products: {error.error}</Text>
    }
1
    const products = data.data;

    return(
        <View>
            <FlatList 
                data={products}
                renderItem={({item}: any) => (
                    <Pressable
                        onPress={()=> {

                        // the dispatch is calling selector and the action and calling the payload
                        // dispatch(productSlice.actions.setSelectedProduct(item.id)); 

                        navigation.navigate("Product Details", {id: item._id});
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