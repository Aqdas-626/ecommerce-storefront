import { useQuery } from '@tanstack/react-query';
import type { UseQueryResult } from '@tanstack/react-query';
import type { Product } from '../types/index.ts';
import { fetchCategories, fetchProduct, fetchProducts } from '../lib/api.ts';

const STALE_TIME = 5 * 60 * 1000;

export function useProducts(): UseQueryResult<Product[], Error> {
  return useQuery<Product[], Error>({
    queryKey: ['products'],
    queryFn: fetchProducts,
    staleTime: STALE_TIME,
  });
}

export function useProduct(id: number): UseQueryResult<Product, Error> {
  return useQuery<Product, Error>({
    queryKey: ['product', id],
    queryFn: () => fetchProduct(id),
    enabled: Number.isFinite(id) && id > 0,
    staleTime: STALE_TIME,
  });
}

export function useCategories(): UseQueryResult<string[], Error> {
  return useQuery<string[], Error>({
    queryKey: ['categories'],
    queryFn: fetchCategories,
    staleTime: STALE_TIME,
  });
}
