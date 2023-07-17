// Environment
import {NavigationContainer} from "@react-navigation/native"
import { createNativeStackNavigator } from "@react-navigation/native-stack"

// Components
import ProductScreen from "./screens/ProductScreen";
import ProductDetailsScreen from "./screens/ProductDetailsScreen";
import ShoppingCart from "./screens/ShoppingCart";
import { Pressable, Text } from "react-native";
import TrackOrder from "./screens/TrackOrder";
// CSS
import { FontAwesome5, MaterialCommunityIcons } from "@expo/vector-icons";

// Data
import { useSelector } from "react-redux";
import { selectNumberOfItems } from "./store/cartSlice";



const Stack = createNativeStackNavigator();



const Navigation = () => {

    const numberOfItems = useSelector(selectNumberOfItems);


    return(

        <NavigationContainer>
            <Stack.Navigator screenOptions={{contentStyle:{backgroundColor: "white"}}}>


                <Stack.Screen
                name="Products"
                component={ProductScreen}
                options={({navigation}) => ({
                    headerTitleAlign: "center",
                headerRight: () =>(
                    <Pressable onPress={() => navigation.navigate("Cart")} style={{flexDirection : "row"}}>
                        <FontAwesome5 name="shopping-cart" size={18} color="gray"  />
                        <Text style={{marginLeft : 5, fontWeight: "500"}}>
                        {numberOfItems}
                        </Text>
                    </Pressable>
                    ),
                    headerLeft: () => (
                        <MaterialCommunityIcons
                            onPress={()=> navigation.navigate("Track Order")}
                            name="truck-delivery"
                            size={22}
                            color="gray"
                            />
                    )
                })}
                />


                <Stack.Screen name="Product Details" component={ProductDetailsScreen}
                options={{presentation: "modal"}}
                />


                <Stack.Screen name="Cart" component={ShoppingCart} options={{headerTitle: "Cart", headerTitleAlign: "center",}}/>

                <Stack.Screen name="Track Order" component={TrackOrder} options={{headerTitle: "Track Order", headerTitleAlign: "center",}}/>

            </Stack.Navigator>
        </NavigationContainer>

    )

}

export default Navigation;