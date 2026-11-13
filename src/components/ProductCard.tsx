import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import type { Product } from '../types/index.ts';
import { useCartStore } from '../store/cartStore.ts';
import { useWishlistStore } from '../store/wishlistStore.ts';
import { formatPrice } from '../lib/format.ts';
import { getBadge, getEffectivePrice, getSalePrice, isOnSale } from '../lib/sale.ts';
import RatingStars from './RatingStars.tsx';
import { Tilt } from './motion.tsx';

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const addItem = useCartStore((state) => state.addItem);
  const toggleWishlist = useWishlistStore((state) => state.toggle);
  const isWishlisted = useWishlistStore((state) => state.isWishlisted(product.id));
  const [added, setAdded] = useState(false);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    return () => {
      if (timeoutRef.current !== null) clearTimeout(timeoutRef.current);
    };
  }, []);

  const handleAddToCart = () => {
    addItem(product);
    setAdded(true);
    if (timeoutRef.current !== null) clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => setAdded(false), 1500);
  };

  const badge = getBadge(product);
  const onSale = isOnSale(product);

  return (
    <motion.div whileHover={{ y: -4 }} className="h-full">
      <Tilt max={4} className="h-full">
        <div className="flex h-full flex-col overflow-hidden rounded-2xl bg-white shadow-sm transition-shadow hover:shadow-md">
          {/* Phase 1: no product-detail page yet, so the image/title are not
              links. They become links to /product/:id in a later phase. */}
          <div className="group relative bg-creamdark">
            <img
              src={product.image}
              alt={product.title}
              className="h-56 w-full object-contain p-6 transition-transform duration-300 group-hover:scale-105"
              loading="lazy"
            />
            {badge === 'sale' && (
              <span className="absolute left-3 top-3 rounded-full bg-clay px-3 py-1 text-xs font-semibold text-white">
                Sale −20%
              </span>
            )}
            {badge === 'best-seller' && (
              <span className="absolute left-3 top-3 rounded-full bg-ink px-3 py-1 text-xs font-semibold text-white">
                Best seller
              </span>
            )}
            {badge === 'new' && (
              <span className="absolute left-3 top-3 rounded-full border border-clay bg-white px-3 py-1 text-xs font-semibold text-clay">
                New
              </span>
            )}
            <button
              type="button"
              onClick={() => toggleWishlist(product.id)}
              aria-label={isWishlisted ? 'Remove from wishlist' : 'Add to wishlist'}
              className="absolute right-3 top-3 rounded-full bg-white p-2 shadow-sm transition hover:bg-rose-50"
            >
              <svg
                className={`h-5 w-5 ${isWishlisted ? 'text-rose-500' : 'text-stone-400'}`}
                fill={isWishlisted ? 'currentColor' : 'none'}
                stroke="currentColor"
                strokeWidth={2}
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                />
              </svg>
            </button>
          </div>
          <div className="flex flex-1 flex-col p-4">
            <span className="text-xs uppercase tracking-wide text-stone-500">
              {product.category}
            </span>
            <h3 className="mt-1 line-clamp-2 font-medium text-ink">{product.title}</h3>
            <div className="mt-2">
              <RatingStars rating={product.rating.rate} showValue />
            </div>
            <p className="mt-2 flex items-baseline gap-2">
              {onSale ? (
                <>
                  <span className="text-sm text-stone-400 line-through">
                    {formatPrice(product.price)}
                  </span>
                  <span className="font-bold text-clay">
                    {formatPrice(getSalePrice(product))}
                  </span>
                </>
              ) : (
                <span className="font-bold text-ink">
                  {formatPrice(getEffectivePrice(product))}
                </span>
              )}
            </p>
            <button
              type="button"
              onClick={handleAddToCart}
              className="mt-4 w-full rounded-full bg-clay px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-clay-dark"
            >
              {added ? 'Added ✓' : 'Add to Cart'}
            </button>
          </div>
        </div>
      </Tilt>
    </motion.div>
  );
}
