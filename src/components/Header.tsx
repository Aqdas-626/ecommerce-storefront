import { useEffect, useState } from 'react';
import type { FormEvent } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { useCartStore } from '../store/cartStore.ts';
import { useWishlistStore } from '../store/wishlistStore.ts';
import { useProducts } from '../hooks/useProducts.ts';
import { formatPrice } from '../lib/format.ts';

type OpenPanel = 'cart' | 'wishlist' | null;

export default function Header() {
  const [searchParams] = useSearchParams();
  const [term, setTerm] = useState(searchParams.get('q') ?? '');
  const [menuOpen, setMenuOpen] = useState(false);
  const [openPanel, setOpenPanel] = useState<OpenPanel>(null);
  const navigate = useNavigate();

  const cartItems = useCartStore((state) => state.items);
  const cartCount = useCartStore((state) => state.getItemCount());
  const cartSubtotal = useCartStore((state) => state.getSubtotal());
  const updateQuantity = useCartStore((state) => state.updateQuantity);
  const removeFromCart = useCartStore((state) => state.removeItem);
  const addToCart = useCartStore((state) => state.addItem);
  const wishlistIds = useWishlistStore((state) => state.ids);
  const removeFromWishlist = useWishlistStore((state) => state.remove);
  const { data: products } = useProducts();
  const wishlistProducts = (products ?? []).filter((product) =>
    wishlistIds.includes(product.id),
  );

  // Keep the search box in sync when the URL query changes
  // (e.g. filters cleared from the homepage).
  useEffect(() => {
    setTerm(searchParams.get('q') ?? '');
  }, [searchParams]);

  const handleSearch = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const trimmed = term.trim();
    navigate(
      trimmed ? `/?q=${encodeURIComponent(trimmed)}#featured` : '/#featured',
    );
    setMenuOpen(false);
  };

  const togglePanel = (panel: Exclude<OpenPanel, null>) => {
    setOpenPanel((current) => (current === panel ? null : panel));
  };

  return (
    <header className="sticky top-0 z-50 bg-white shadow">
      <div className="relative z-50 mx-auto flex max-w-7xl items-center gap-4 px-4 py-3 sm:px-6 lg:px-8">
        <Link to="/" className="text-2xl font-extrabold text-indigo-600">
          ShopKart
        </Link>

        <nav className="hidden items-center gap-6 md:flex" aria-label="Main navigation">
          <Link
            to="/"
            className="text-sm font-medium text-slate-700 hover:text-indigo-600"
          >
            Home
          </Link>
          <a
            href="#featured"
            className="text-sm font-medium text-slate-700 hover:text-indigo-600"
          >
            Shop
          </a>
          <a
            href="#categories"
            className="text-sm font-medium text-slate-700 hover:text-indigo-600"
          >
            Categories
          </a>
        </nav>

        <form
          onSubmit={handleSearch}
          role="search"
          className="ml-auto hidden min-w-0 flex-1 max-w-md items-center sm:flex"
        >
          <input
            type="search"
            value={term}
            onChange={(event) => setTerm(event.target.value)}
            placeholder="Search products..."
            aria-label="Search products"
            className="w-full rounded-l-lg border border-slate-300 px-3 py-2 text-sm outline-none focus:border-indigo-600 focus:ring-1 focus:ring-indigo-600"
          />
          <button
            type="submit"
            className="rounded-r-lg bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-700"
          >
            Search
          </button>
        </form>

        <div className="relative ml-auto flex items-center gap-1 sm:ml-0">
          <button
            type="button"
            onClick={() => togglePanel('wishlist')}
            aria-label={`Wishlist, ${wishlistIds.length} items`}
            aria-expanded={openPanel === 'wishlist'}
            className="relative rounded-lg p-2 text-slate-700 hover:bg-slate-100 hover:text-indigo-600"
          >
            <svg
              className="h-6 w-6"
              fill="none"
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
            {wishlistIds.length > 0 && (
              <span className="absolute -right-0.5 -top-0.5 flex h-5 w-5 items-center justify-center rounded-full bg-indigo-600 text-xs font-bold text-white">
                {wishlistIds.length}
              </span>
            )}
          </button>
          <button
            type="button"
            onClick={() => togglePanel('cart')}
            aria-label={`Cart, ${cartCount} items`}
            aria-expanded={openPanel === 'cart'}
            className="relative rounded-lg p-2 text-slate-700 hover:bg-slate-100 hover:text-indigo-600"
          >
            <svg
              className="h-6 w-6"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
              />
            </svg>
            {cartCount > 0 && (
              <span className="absolute -right-0.5 -top-0.5 flex h-5 w-5 items-center justify-center rounded-full bg-indigo-600 text-xs font-bold text-white">
                {cartCount}
              </span>
            )}
          </button>
          <button
            type="button"
            onClick={() => setMenuOpen((open) => !open)}
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={menuOpen}
            className="rounded-lg p-2 text-slate-700 hover:bg-slate-100 md:hidden"
          >
            <svg
              className="h-6 w-6"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              {menuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>

          {openPanel === 'cart' && (
            <div className="absolute right-0 top-full mt-2 w-80 max-w-[calc(100vw-2rem)] rounded-lg border border-slate-200 bg-white shadow-lg">
              <div className="border-b border-slate-100 px-4 py-3 font-semibold text-slate-900">
                Your cart
              </div>
              {cartItems.length === 0 ? (
                <p className="px-4 py-6 text-sm text-slate-500">
                  Your cart is empty. Add products from the featured section
                  below and they will show up here.
                </p>
              ) : (
                <>
                  <ul className="max-h-64 overflow-y-auto px-4 py-2">
                    {cartItems.map((item) => (
                      <li
                        key={item.product.id}
                        className="flex items-center gap-3 py-2"
                      >
                        <img
                          src={item.product.image}
                          alt={item.product.title}
                          className="h-12 w-12 shrink-0 object-contain"
                        />
                        <div className="min-w-0 flex-1">
                          <p className="truncate text-sm font-medium text-slate-900">
                            {item.product.title}
                          </p>
                          <p className="text-xs text-slate-500">
                            {formatPrice(item.product.price)} each
                          </p>
                        </div>
                        <div className="flex items-center gap-1">
                          <button
                            type="button"
                            aria-label="Decrease quantity"
                            onClick={() =>
                              updateQuantity(item.product.id, item.quantity - 1)
                            }
                            className="rounded border border-slate-200 px-2 py-0.5 text-sm hover:bg-slate-100"
                          >
                            −
                          </button>
                          <span className="w-5 text-center text-sm">
                            {item.quantity}
                          </span>
                          <button
                            type="button"
                            aria-label="Increase quantity"
                            onClick={() =>
                              updateQuantity(item.product.id, item.quantity + 1)
                            }
                            className="rounded border border-slate-200 px-2 py-0.5 text-sm hover:bg-slate-100"
                          >
                            +
                          </button>
                        </div>
                        <button
                          type="button"
                          aria-label={`Remove ${item.product.title} from cart`}
                          onClick={() => removeFromCart(item.product.id)}
                          className="text-slate-400 hover:text-rose-600"
                        >
                          ×
                        </button>
                      </li>
                    ))}
                  </ul>
                  <div className="flex justify-between border-t border-slate-100 px-4 py-3 text-sm font-semibold text-slate-900">
                    <span>Subtotal</span>
                    <span>{formatPrice(cartSubtotal)}</span>
                  </div>
                </>
              )}
              <p className="rounded-b-lg bg-slate-50 px-4 py-2 text-xs text-slate-500">
                Full cart page and checkout arrive in phase 2.
              </p>
            </div>
          )}

          {openPanel === 'wishlist' && (
            <div className="absolute right-0 top-full mt-2 w-80 max-w-[calc(100vw-2rem)] rounded-lg border border-slate-200 bg-white shadow-lg">
              <div className="border-b border-slate-100 px-4 py-3 font-semibold text-slate-900">
                Your wishlist
              </div>
              {wishlistProducts.length === 0 ? (
                <p className="px-4 py-6 text-sm text-slate-500">
                  Your wishlist is empty. Tap the heart on any product to save
                  it here.
                </p>
              ) : (
                <ul className="max-h-64 overflow-y-auto px-4 py-2">
                  {wishlistProducts.map((product) => (
                    <li key={product.id} className="flex items-center gap-3 py-2">
                      <img
                        src={product.image}
                        alt={product.title}
                        className="h-12 w-12 shrink-0 object-contain"
                      />
                      <div className="min-w-0 flex-1">
                        <p className="truncate text-sm font-medium text-slate-900">
                          {product.title}
                        </p>
                        <p className="text-xs text-slate-500">
                          {formatPrice(product.price)}
                        </p>
                      </div>
                      <button
                        type="button"
                        onClick={() => {
                          addToCart(product);
                          removeFromWishlist(product.id);
                        }}
                        className="shrink-0 rounded bg-indigo-600 px-2 py-1 text-xs font-medium text-white hover:bg-indigo-700"
                      >
                        Move to cart
                      </button>
                      <button
                        type="button"
                        aria-label={`Remove ${product.title} from wishlist`}
                        onClick={() => removeFromWishlist(product.id)}
                        className="shrink-0 text-slate-400 hover:text-rose-600"
                      >
                        ×
                      </button>
                    </li>
                  ))}
                </ul>
              )}
              <p className="rounded-b-lg bg-slate-50 px-4 py-2 text-xs text-slate-500">
                Full wishlist page arrives in phase 2.
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Click-catcher that closes an open panel. It sits below the header
          bar (z-40 vs the bar's z-50) so the header stays clickable. */}
      {openPanel !== null && (
        <div
          className="fixed inset-0 z-40"
          onClick={() => setOpenPanel(null)}
          aria-hidden="true"
        />
      )}

      {menuOpen && (
        <div className="relative z-50 border-t border-slate-200 bg-white px-4 pb-4 pt-2 md:hidden">
          <form onSubmit={handleSearch} role="search" className="flex items-center sm:hidden">
            <input
              type="search"
              value={term}
              onChange={(event) => setTerm(event.target.value)}
              placeholder="Search products..."
              aria-label="Search products"
              className="w-full rounded-l-lg border border-slate-300 px-3 py-2 text-sm outline-none focus:border-indigo-600 focus:ring-1 focus:ring-indigo-600"
            />
            <button
              type="submit"
              className="rounded-r-lg bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-700"
            >
              Search
            </button>
          </form>
          <nav className="mt-2 flex flex-col gap-1" aria-label="Mobile navigation">
            <Link
              to="/"
              onClick={() => setMenuOpen(false)}
              className="rounded-lg px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-100 hover:text-indigo-600"
            >
              Home
            </Link>
            <a
              href="#featured"
              onClick={() => setMenuOpen(false)}
              className="rounded-lg px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-100 hover:text-indigo-600"
            >
              Shop
            </a>
            <a
              href="#categories"
              onClick={() => setMenuOpen(false)}
              className="rounded-lg px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-100 hover:text-indigo-600"
            >
              Categories
            </a>
          </nav>
        </div>
      )}
    </header>
  );
}
