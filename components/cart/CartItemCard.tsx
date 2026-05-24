import { StyleSheet, Text, View } from "react-native";

import { CartItem } from "../../types/cart";

type CartItemCardProps = {
  item: CartItem;
};

export default function CartItemCard({ item }: CartItemCardProps) {
  const subtotal = item.product.price * item.quantity;

  return (
    <View style={styles.card}>
      <Text style={styles.title}>{item.product.title}</Text>
      <Text>Prezzo: € {item.product.price}</Text>
      <Text>Quantità: {item.quantity}</Text>
      <Text style={styles.subtotal}>Subtotale: € {subtotal}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    borderColor: "#dddddd",
    borderRadius: 8,
    borderWidth: 1,
    marginBottom: 12,
    padding: 12,
  },
  subtotal: {
    fontWeight: "bold",
    marginTop: 6,
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 8,
  },
});
