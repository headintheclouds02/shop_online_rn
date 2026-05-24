import { FlatList, StyleSheet } from "react-native";

import { Product } from "../../types/product";
import ProductCard from "./ProductCard";

type ProductListProps = {
  products: Product[];
  onProductPress: (product: Product) => void;
};

export default function ProductList({
  products,
  onProductPress,
}: ProductListProps) {
  return (
    <FlatList
      data={products}
      keyExtractor={(item) => item.id.toString()}
      contentContainerStyle={styles.listContent}
      renderItem={({ item }) => (
        <ProductCard product={item} onPress={() => onProductPress(item)} />
      )}
    />
  );
}

const styles = StyleSheet.create({
  listContent: {
    padding: 16,
  },
});
