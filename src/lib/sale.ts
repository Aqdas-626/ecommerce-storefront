import type { Product } from '../types/index.ts'

/**
 * Sale rule: a product is on sale when its rating is 4.5 or higher.
 * On-sale products get a 20% discount. Badges are mutually exclusive
 * and checked in priority order: sale, then best-seller, then new.
 */
export const SALE_DISCOUNT = 0.2

export function isOnSale(product: Product): boolean {
  return product.rating.rate >= 4.5
}

export function getSalePrice(product: Product): number {
  return Math.round(product.price * (1 - SALE_DISCOUNT) * 100) / 100
}

export function getEffectivePrice(product: Product): number {
  return isOnSale(product) ? getSalePrice(product) : product.price
}

export type ProductBadge = 'sale' | 'best-seller' | 'new' | null

export function getBadge(product: Product): ProductBadge {
  if (isOnSale(product)) return 'sale'
  if (product.rating.rate >= 4.0 && product.rating.count >= 250)
    return 'best-seller'
  if (product.id >= 17) return 'new'
  return null
}
