import {
  ActivityIndicator,
  Alert,
  Button,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";

import { useCart } from "../context/CartContext";
import { useProductDetail } from "../hooks/useProductDetail";

export default function ProductDetailScreen({ navigation, route }: any) {
  const { productId } = route.params;
  const { addToCart } = useCart();
  const { product, loading, error, loadProduct } = useProductDetail(productId);

  function handleAddToCart() {
    if (!product) {
      return;
    }

    addToCart(product);
    Alert.alert("Prodotto aggiunto", "Il prodotto è stato aggiunto al carrello.");
  }

  if (loading) {
    return (
      <View style={styles.centerContent}>
        <ActivityIndicator size="large" />
        <Text style={styles.message}>Caricamento prodotto...</Text>
      </View>
    );
  }

  if (error || !product) {
    return (
      <View style={styles.centerContent}>
        <Text style={styles.errorText}>{error}</Text>
        <Button title="Riprova" onPress={loadProduct} />
        <View style={styles.space} />
        <Button title="Indietro" onPress={() => navigation.goBack()} />
      </View>
    );
  }

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Image
        source={{ uri: product.images[0] }}
        style={styles.image}
        resizeMode="cover"
      />

      <View style={styles.info}>
        <Text style={styles.title}>{product.title}</Text>
        <Text style={styles.price}>€ {product.price}</Text>
        <Text style={styles.category}>Categoria: {product.category.name}</Text>
        <Text style={styles.description}>{product.description}</Text>
      </View>

      <View style={styles.buttons}>
        <Button title="Aggiungi al carrello" onPress={handleAddToCart} />
        <View style={styles.space} />
        <Button title="Indietro" onPress={() => navigation.goBack()} />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  buttons: {
    paddingHorizontal: 16,
  },
  category: {
    color: "#555555",
    marginBottom: 16,
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
  content: {
    paddingBottom: 24,
  },
  description: {
    fontSize: 15,
    lineHeight: 22,
  },
  errorText: {
    color: "red",
    fontSize: 16,
    marginBottom: 16,
    textAlign: "center",
  },
  image: {
    height: 320,
    width: "100%",
  },
  info: {
    padding: 16,
  },
  message: {
    marginTop: 12,
  },
  price: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 8,
  },
  space: {
    height: 12,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 8,
  },
});
