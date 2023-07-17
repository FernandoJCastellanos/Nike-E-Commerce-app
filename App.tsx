// Environment
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image, FlatList } from 'react-native';
import { Provider } from "react-redux";
import { store } from "./src/store"
import {StripeProvider} from "@stripe/stripe-react-native"

// Components
import Navigation from './src/navigation';

// Data
import products from "./src/data/products"


const STRIPE_KEY = "pk_test_51NIvKCLT9cyNXFR5JTxT9pVnvqrmeFjf1cVdnskANFNYIc7NYLxgOyIInkjoPIUMaG8i85QvecLCSE6VkI7eSGY100ifz34pcS"

export default function App() {
  return (
    <Provider store={store}>
      <View style={styles.container}>

        <StripeProvider publishableKey={STRIPE_KEY}>
          <Navigation />
        </StripeProvider>

        <StatusBar style="auto" />
      </View>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },

  })