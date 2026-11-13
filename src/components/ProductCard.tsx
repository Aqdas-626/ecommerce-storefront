import { useEffect, useRef, useState } from 'react';
import type { Product } from '../types/index.ts';
import { useCartStore } from '../store/cartStore.ts';
import { useWishlistStore } from '../store/wishlistStore.ts';
import { formatPrice } from '../lib/format.ts';
import RatingStars from './RatingStars.tsx';

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

  return (
    <div className="flex flex-col rounded-lg bg-white shadow-sm">
      {/* Phase 1: no product-detail page yet, so the image/title are not
          links. They become links to /product/:id in a later phase. */}
      <img
        src={product.image}
        alt={product.title}
        className="h-56 w-full bg-white object-contain p-4"
        loading="lazy"
      />
      <div className="flex flex-1 flex-col p-4">
        <span className="text-xs uppercase text-slate-500">{product.category}</span>
        <h3 className="mt-1 line-clamp-2 font-medium text-slate-900">
          {product.title}
        </h3>
        <div className="mt-2">
          <RatingStars rating={product.rating.rate} showValue />
        </div>
        <p className="mt-2 font-bold text-slate-900">{formatPrice(product.price)}</p>
        <div className="mt-4 flex gap-2">
          <button
            type="button"
            onClick={handleAddToCart}
            className="flex-1 rounded-lg bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-700"
          >
            {added ? 'Added ✓' : 'Add to Cart'}
          </button>
          <button
            type="button"
            onClick={() => toggleWishlist(product.id)}
            aria-label={isWishlisted ? 'Remove from wishlist' : 'Add to wishlist'}
            className="rounded-lg border border-slate-200 p-2 hover:border-rose-300 hover:bg-rose-50"
          >
            <svg
              className={`h-5 w-5 ${isWishlisted ? 'text-rose-500' : 'text-slate-400'}`}
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
      </div>
    </div>
  );
}
