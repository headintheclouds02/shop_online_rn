import { Alert, Button, FlatList, StyleSheet, Text, View } from "react-native";

import CartItemCard from "../components/cart/CartItemCard";
import { useCart } from "../context/CartContext";

export default function CartScreen({ navigation }: any) {
  const { items, totalItems, totalPrice, clearCart } = useCart();

  function confirmOrder() {
    if (items.length === 0) {
      Alert.alert("Carrello vuoto", "Aggiungi almeno un prodotto al carrello.");
      return;
    }

    Alert.alert("Ordine confermato", "Grazie per il tuo acquisto.");
    clearCart();
  }

  function emptyCart() {
    clearCart();
  }

  if (items.length === 0) {
    return (
      <View style={styles.emptyContainer}>
        <Text style={styles.emptyTitle}>Il carrello è vuoto</Text>
        <Button title="Indietro" onPress={() => navigation.goBack()} />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={items}
        keyExtractor={(item) => item.product.id.toString()}
        contentContainerStyle={styles.listContent}
        renderItem={({ item }) => <CartItemCard item={item} />}
      />

      <View style={styles.summary}>
        <Text style={styles.summaryText}>Prodotti totali: {totalItems}</Text>
        <Text style={styles.totalText}>Totale: € {totalPrice}</Text>

        <View style={styles.buttons}>
          <Button title="Conferma ordine" onPress={confirmOrder} />
          <View style={styles.space} />
          <Button title="Svuota carrello" onPress={emptyCart} />
          <View style={styles.space} />
          <Button title="Indietro" onPress={() => navigation.goBack()} />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  buttons: {
    marginTop: 12,
  },
  container: {
    backgroundColor: "#ffffff",
    flex: 1,
  },
  emptyContainer: {
    alignItems: "center",
    flex: 1,
    justifyContent: "center",
    padding: 24,
  },
  emptyTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 16,
  },
  listContent: {
    padding: 16,
  },
  space: {
    height: 12,
  },
  summary: {
    borderTopColor: "#dddddd",
    borderTopWidth: 1,
    padding: 16,
  },
  summaryText: {
    fontSize: 16,
    marginBottom: 4,
  },
  totalText: {
    fontSize: 20,
    fontWeight: "bold",
  },
});
