import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import CartScreen from "../screens/CartScreen";
import CatalogScreen from "../screens/CatalogScreen";
import ProductDetailScreen from "../screens/ProductDetailScreen";

const Stack = createNativeStackNavigator();

export default function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Catalog"
          component={CatalogScreen}
          options={{ title: "Catalogo" }}
        />

        <Stack.Screen
          name="ProductDetail"
          component={ProductDetailScreen}
          options={{ title: "Dettaglio prodotto" }}
        />

        <Stack.Screen
          name="Cart"
          component={CartScreen}
          options={{ title: "Carrello" }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
