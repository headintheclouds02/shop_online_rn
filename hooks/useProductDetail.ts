import { useEffect, useState } from "react";

import { getProductById } from "../services/productsApi";
import { Product } from "../types/product";

export function useProductDetail(productId: number) {
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  async function loadProduct() {
    try {
      setLoading(true);
      setError("");

      const data = await getProductById(productId);
      setProduct(data);
    } catch (error) {
      setError("Non è stato possibile caricare il prodotto.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadProduct();
  }, [productId]);

  return {
    product,
    loading,
    error,
    loadProduct,
  };
}
