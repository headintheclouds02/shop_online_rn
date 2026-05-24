import { StatusBar } from 'expo-status-bar';

import { CartProvider } from './context/CartContext';
import AppNavigator from './navigation/navigation';

export default function App() {
  return (
    <CartProvider>
      <AppNavigator />
      <StatusBar style="auto" />
    </CartProvider>
  );
}
