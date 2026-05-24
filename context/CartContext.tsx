import { createContext, ReactNode, useContext, useState } from "react";

import { CartItem } from "../types/cart";
import { Product } from "../types/product";

type CartContextValue = {
  items: CartItem[];
  totalItems: number;
  totalPrice: number;
  addToCart: (product: Product) => void;
  removeOneFromCart: (productId: number) => void;
  getProductQuantity: (productId: number) => number;
  clearCart: () => void;
};

const CartContext = createContext<CartContextValue | undefined>(undefined);

type CartProviderProps = {
  children: ReactNode;
};

export function CartProvider({ children }: CartProviderProps) {
  const [items, setItems] = useState<CartItem[]>([]);

  function addToCart(product: Product) {
    setItems((currentItems) => {
      const productAlreadyInCart = currentItems.find(
        (item) => item.product.id === product.id
      );

      if (productAlreadyInCart) {
        return currentItems.map((item) => {
          if (item.product.id === product.id) {
            return {
              ...item,
              quantity: item.quantity + 1,
            };
          }

          return item;
        });
      }

      return [
        ...currentItems,
        {
          product: product,
          quantity: 1,
        },
      ];
    });
  }

  function clearCart() {
    setItems([]);
  }

  function removeOneFromCart(productId: number) {
    setItems((currentItems) => {
      const productInCart = currentItems.find(
        (item) => item.product.id === productId
      );

      if (!productInCart) {
        return currentItems;
      }

      if (productInCart.quantity === 1) {
        return currentItems.filter((item) => item.product.id !== productId);
      }

      return currentItems.map((item) => {
        if (item.product.id === productId) {
          return {
            ...item,
            quantity: item.quantity - 1,
          };
        }

        return item;
      });
    });
  }

  function getProductQuantity(productId: number) {
    const productInCart = items.find((item) => item.product.id === productId);

    if (!productInCart) {
      return 0;
    }

    return productInCart.quantity;
  }

  const totalItems = items.reduce((total, item) => {
    return total + item.quantity;
  }, 0);

  const totalPrice = items.reduce((total, item) => {
    return total + item.product.price * item.quantity;
  }, 0);

  return (
    <CartContext.Provider
      value={{
        items,
        totalItems,
        totalPrice,
        addToCart,
        removeOneFromCart,
        getProductQuantity,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart(): CartContextValue {
  const context = useContext(CartContext);

  if (context === undefined) {
    throw new Error("useCart deve essere usato dentro CartProvider");
  }

  return context;
}
