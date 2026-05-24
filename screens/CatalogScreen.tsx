import {
  ActivityIndicator,
  Button,
  StyleSheet,
  Text,
  View,
} from "react-native";

import ProductList from "../components/products/ProductList";
import { useCart } from "../context/CartContext";
import { useProducts } from "../hooks/useProducts";
import { Product } from "../types/product";

export default function CatalogScreen({ navigation }: any) {
  const { totalItems } = useCart();
  const { products, loading, error, loadProducts } = useProducts();

  function openProductDetail(product: Product) {
    navigation.navigate("ProductDetail", { productId: product.id });
  }

  if (loading) {
    return (
      <View style={styles.centerContent}>
        <ActivityIndicator size="large" />
        <Text style={styles.message}>Caricamento prodotti...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.centerContent}>
        <Text style={styles.errorText}>{error}</Text>
        <Button title="Riprova" onPress={loadProducts} />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.cartInfo}>
        <Text style={styles.cartText}>Prodotti nel carrello: {totalItems}</Text>
        <Button title="Vai al carrello" onPress={() => navigation.navigate("Cart")} />
      </View>

      <ProductList products={products} onProductPress={openProductDetail} />
    </View>
  );
}

const styles = StyleSheet.create({
  cartInfo: {
    borderBottomColor: "#dddddd",
    borderBottomWidth: 1,
    padding: 16,
  },
  cartText: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 8,
  },
  centerContent: {
    alignItems: "center",
    flex: 1,
    justifyContent: "center",
    padding: 24,
  },
  container: {
    backgroundColor: "#ffffff",
    flex: 1,
  },
  errorText: {
    color: "red",
    fontSize: 16,
    marginBottom: 16,
    textAlign: "center",
  },
  message: {
    marginTop: 12,
  },
});
