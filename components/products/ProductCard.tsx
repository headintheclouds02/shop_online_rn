import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";

import { Product } from "../../types/product";

type ProductCardProps = {
  product: Product;
  onPress: () => void;
};

export default function ProductCard({ product, onPress }: ProductCardProps) {
  return (
    <TouchableOpacity style={styles.card} onPress={onPress}>
      <Image
        source={{ uri: product.images[0] }}
        style={styles.image}
        resizeMode="cover"
      />

      <View style={styles.info}>
        <Text style={styles.title}>{product.title}</Text>
        <Text>Prezzo: € {product.price}</Text>
        <Text>Categoria: {product.category.name}</Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    borderColor: "#dddddd",
    borderRadius: 8,
    borderWidth: 1,
    marginBottom: 16,
    overflow: "hidden",
  },
  image: {
    height: 180,
    width: "100%",
  },
  info: {
    padding: 12,
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 8,
  },
});
