import { Product } from "../types/product";

const API_URL = "https://api.escuelajs.co/api/v1";
const PRODUCTS_URL = "https://api.escuelajs.co/api/v1/products?limit=20&offset=0";

export async function getProducts(): Promise<Product[]> {
  const response = await fetch(PRODUCTS_URL);

  if (!response.ok) {
    throw new Error("Errore nella chiamata API");
  }

  const data = await response.json();
  return data;
}

export async function getProductById(productId: number): Promise<Product> {
  const response = await fetch(`${API_URL}/products/${productId}`);

  if (!response.ok) {
    throw new Error("Errore nella chiamata API");
  }

  const data = await response.json();
  return data;
}
