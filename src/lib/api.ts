import type { Product } from '../types/index.ts';
import { fallbackProducts } from './fallbackProducts.ts';

const API_BASE = 'https://fakestoreapi.com/products';

export async function fetchProducts(): Promise<Product[]> {
  try {
    const response = await fetch(API_BASE);
    if (!response.ok) throw new Error(`Failed to fetch products: ${response.status}`);
    const data: Product[] = await response.json();
    return data;
  } catch {
    return fallbackProducts;
  }
}

export async function fetchProduct(id: number): Promise<Product> {
  try {
    const response = await fetch(`${API_BASE}/${id}`);
    if (!response.ok) throw new Error(`Failed to fetch product: ${response.status}`);
    const data: Product = await response.json();
    return data;
  } catch {
    const fallback = fallbackProducts.find((product) => product.id === id);
    if (!fallback) throw new Error('Product not found');
    return fallback;
  }
}

export async function fetchCategories(): Promise<string[]> {
  try {
    const response = await fetch(`${API_BASE}/categories`);
    if (!response.ok) throw new Error(`Failed to fetch categories: ${response.status}`);
    const data: string[] = await response.json();
    return data;
  } catch {
    return [...new Set(fallbackProducts.map((product) => product.category))];
  }
}
