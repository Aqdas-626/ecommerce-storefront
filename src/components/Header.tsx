import { useEffect, useState } from 'react';
import type { FormEvent } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useCartStore } from '../store/cartStore.ts';
import { useWishlistStore } from '../store/wishlistStore.ts';
import { useProducts } from '../hooks/useProducts.ts';
import { formatPrice } from '../lib/format.ts';
import { getEffectivePrice } from '../lib/sale.ts';
import InfoModal from './InfoModal.tsx';

type OpenPanel = 'cart' | 'wishlist' | null;

const NAV_LINKS = [
  { label: 'New arrivals', to: '/#new-arrivals', sale: false },
  { label: 'Electronics', to: '/?category=electronics#featured', sale: false },
  { label: 'Jewelery', to: '/?category=jewelery#featured', sale: false },
  {
    label: "Men's Clothing",
    to: `/?category=${encodeURIComponent("men's clothing")}#featured`,
    sale: false,
  },
  {
    label: "Women's Clothing",
    to: `/?category=${encodeURIComponent("women's clothing")}#featured`,
    sale: false,
  },
  { label: 'Sale', to: '/?sale=1#featured', sale: true },
] as const;

export default function Header() {
  const [searchParams] = useSearchParams();
  const [term, setTerm] = useState(searchParams.get('q') ?? '');
  const [menuOpen, setMenuOpen] = useState(false);
  const [openPanel, setOpenPanel] = useState<OpenPanel>(null);
  const [accountOpen, setAccountOpen] = useState(false);
  const navigate = useNavigate();

  const cartItems = useCartStore((state) => state.items);
  const cartCount = useCartStore((state) => state.getItemCount());
  const updateQuantity = useCartStore((state) => state.updateQuantity);
  const removeFromCart = useCartStore((state) => state.removeItem);
  const addToCart = useCartStore((state) => state.addItem);
  const wishlistIds = useWishlistStore((state) => state.ids);
  const removeFromWishlist = useWishlistStore((state) => state.remove);
  const { data: products } = useProducts();
  const wishlistProducts = (products ?? []).filter((product) =>
    wishlistIds.includes(product.id),
  );

  // Subtotal from effective (sale) prices so it matches the per-item
  // prices shown in the panel, not the store's list-price subtotal.
  const cartSubtotal = cartItems.reduce(
    (total, item) => total + getEffectivePrice(item.product) * item.quantity,
    0,
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

  const searchField = (id: string) => (
    <>
      <input
        id={id}
        type="search"
        value={term}
        onChange={(event) => setTerm(event.target.value)}
        placeholder="Search products..."
        aria-label="Search products"
        className="w-full rounded-l-full border border-ink/15 bg-white px-4 py-2 text-sm text-ink outline-none placeholder:text-ink/40 focus:border-clay focus:ring-2 focus:ring-clay"
      />
      <button
        type="submit"
        className="shrink-0 rounded-r-full bg-clay px-4 py-2 text-sm font-medium text-white hover:bg-clay-dark focus:ring-2 focus:ring-clay"
      >
        Search
      </button>
    </>
  );

  return (
    <>
      {/* Announcement bar — scrolls away, not sticky. */}
      <div className="bg-ink px-4 py-2 text-center text-xs font-medium text-white sm:text-sm">
        Free shipping on orders over $50 · 30-day returns
      </div>

      <header className="sticky top-0 z-50 border-b border-ink/10 bg-cream/95 backdrop-blur">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {/* Row 1: logo, search, account, wishlist, cart, hamburger. */}
          <div className="flex items-center gap-3 py-3 sm:gap-4">
            <Link
              to="/"
              className="font-display text-2xl font-extrabold text-ink"
            >
              ShopKart
            </Link>

            <form
              onSubmit={handleSearch}
              role="search"
              className="ml-auto hidden min-w-0 flex-1 max-w-md items-center sm:flex"
            >
              {searchField('header-search')}
            </form>

            <div className="relative ml-auto flex items-center gap-1 sm:ml-0">
              <button
                type="button"
                onClick={() => setAccountOpen(true)}
                aria-label="Your account"
                className="rounded-full p-2 text-ink hover:bg-creamdark focus:ring-2 focus:ring-clay"
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
                    d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                  />
                </svg>
              </button>
              <button
                type="button"
                onClick={() => togglePanel('wishlist')}
                aria-label={`Wishlist, ${wishlistIds.length} items`}
                aria-expanded={openPanel === 'wishlist'}
                className="relative rounded-full p-2 text-ink hover:bg-creamdark focus:ring-2 focus:ring-clay"
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
                  <motion.span
                    key={wishlistIds.length}
                    initial={{ scale: 1.6 }}
                    animate={{ scale: 1 }}
                    className="absolute -right-0.5 -top-0.5 flex h-5 w-5 items-center justify-center rounded-full bg-clay text-xs font-bold text-white"
                  >
                    {wishlistIds.length}
                  </motion.span>
                )}
              </button>
              <button
                type="button"
                onClick={() => togglePanel('cart')}
                aria-label={`Cart, ${cartCount} items`}
                aria-expanded={openPanel === 'cart'}
                className="ml-1 flex items-center gap-2 rounded-full bg-clay px-4 py-2 text-sm font-semibold text-white hover:bg-clay-dark focus:ring-2 focus:ring-clay"
              >
                <svg
                  className="h-5 w-5"
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
                <span>
                  Cart (
                  <motion.span
                    key={cartCount}
                    initial={{ scale: 1.6 }}
                    animate={{ scale: 1 }}
                    className="inline-block"
                  >
                    {cartCount}
                  </motion.span>
                  )
                </span>
              </button>
              <button
                type="button"
                onClick={() => setMenuOpen((open) => !open)}
                aria-label={menuOpen ? 'Close menu' : 'Open menu'}
                aria-expanded={menuOpen}
                className="rounded-full p-2 text-ink hover:bg-creamdark focus:ring-2 focus:ring-clay md:hidden"
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
                <div className="absolute right-0 top-full z-50 mt-2 w-80 max-w-[calc(100vw-2rem)] rounded-2xl border border-ink/10 bg-cream shadow-xl">
                  <div className="border-b border-ink/10 px-4 py-3 font-semibold text-ink">
                    Your cart
                  </div>
                  {cartItems.length === 0 ? (
                    <p className="px-4 py-6 text-sm text-ink/60">
                      Your cart is empty. Add products from the featured section
                      below and they will show up here.
                    </p>
                  ) : (
                    <>
                      <ul className="max-h-64 overflow-y-auto px-4 py-2">
                        {cartItems.map((item) => {
                          const effective = getEffectivePrice(item.product);
                          const onSale = effective < item.product.price;
                          return (
                            <li
                              key={item.product.id}
                              className="flex items-center gap-3 py-2"
                            >
                              <img
                                src={item.product.image}
                                alt={item.product.title}
                                className="h-12 w-12 shrink-0 rounded-lg bg-white object-contain p-1"
                              />
                              <div className="min-w-0 flex-1">
                                <p className="truncate text-sm font-medium text-ink">
                                  {item.product.title}
                                </p>
                                <p className="text-xs text-ink/60">
                                  {formatPrice(effective)} each
                                  {onSale && (
                                    <span className="ml-1 line-through">
                                      {formatPrice(item.product.price)}
                                    </span>
                                  )}
                                </p>
                              </div>
                              <div className="flex items-center gap-1">
                                <button
                                  type="button"
                                  aria-label="Decrease quantity"
                                  onClick={() =>
                                    updateQuantity(item.product.id, item.quantity - 1)
                                  }
                                  className="rounded border border-ink/15 px-2 py-0.5 text-sm text-ink hover:bg-creamdark focus:ring-2 focus:ring-clay"
                                >
                                  −
                                </button>
                                <span className="w-5 text-center text-sm text-ink">
                                  {item.quantity}
                                </span>
                                <button
                                  type="button"
                                  aria-label="Increase quantity"
                                  onClick={() =>
                                    updateQuantity(item.product.id, item.quantity + 1)
                                  }
                                  className="rounded border border-ink/15 px-2 py-0.5 text-sm text-ink hover:bg-creamdark focus:ring-2 focus:ring-clay"
                                >
                                  +
                                </button>
                              </div>
                              <button
                                type="button"
                                aria-label={`Remove ${item.product.title} from cart`}
                                onClick={() => removeFromCart(item.product.id)}
                                className="text-ink/40 hover:text-clay focus:ring-2 focus:ring-clay"
                              >
                                ×
                              </button>
                            </li>
                          );
                        })}
                      </ul>
                      <div className="flex justify-between border-t border-ink/10 px-4 py-3 text-sm font-semibold text-ink">
                        <span>Subtotal</span>
                        <span>{formatPrice(cartSubtotal)}</span>
                      </div>
                    </>
                  )}
                  <p className="rounded-b-2xl bg-creamdark px-4 py-2 text-xs text-ink/60">
                    Full cart page and checkout arrive in phase 2.
                  </p>
                </div>
              )}

              {openPanel === 'wishlist' && (
                <div className="absolute right-0 top-full z-50 mt-2 w-80 max-w-[calc(100vw-2rem)] rounded-2xl border border-ink/10 bg-cream shadow-xl">
                  <div className="border-b border-ink/10 px-4 py-3 font-semibold text-ink">
                    Your wishlist
                  </div>
                  {wishlistProducts.length === 0 ? (
                    <p className="px-4 py-6 text-sm text-ink/60">
                      Your wishlist is empty. Tap the heart on any product to save
                      it here.
                    </p>
                  ) : (
                    <ul className="max-h-64 overflow-y-auto px-4 py-2">
                      {wishlistProducts.map((product) => {
                        const effective = getEffectivePrice(product);
                        const onSale = effective < product.price;
                        return (
                          <li key={product.id} className="flex items-center gap-3 py-2">
                            <img
                              src={product.image}
                              alt={product.title}
                              className="h-12 w-12 shrink-0 rounded-lg bg-white object-contain p-1"
                            />
                            <div className="min-w-0 flex-1">
                              <p className="truncate text-sm font-medium text-ink">
                                {product.title}
                              </p>
                              <p className="text-xs text-ink/60">
                                {formatPrice(effective)}
                                {onSale && (
                                  <span className="ml-1 line-through">
                                    {formatPrice(product.price)}
                                  </span>
                                )}
                              </p>
                            </div>
                            <button
                              type="button"
                              onClick={() => {
                                addToCart(product);
                                removeFromWishlist(product.id);
                              }}
                              className="shrink-0 rounded-full bg-clay px-2 py-1 text-xs font-medium text-white hover:bg-clay-dark focus:ring-2 focus:ring-clay"
                            >
                              Move to cart
                            </button>
                            <button
                              type="button"
                              aria-label={`Remove ${product.title} from wishlist`}
                              onClick={() => removeFromWishlist(product.id)}
                              className="shrink-0 text-ink/40 hover:text-clay focus:ring-2 focus:ring-clay"
                            >
                              ×
                            </button>
                          </li>
                        );
                      })}
                    </ul>
                  )}
                  <p className="rounded-b-2xl bg-creamdark px-4 py-2 text-xs text-ink/60">
                    Full wishlist page arrives in phase 2.
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Row 2: desktop category nav. */}
          <nav
            className="hidden border-t border-ink/10 md:block"
            aria-label="Categories"
          >
            <div className="flex items-center gap-6 py-2.5">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.label}
                  to={link.to}
                  className={
                    link.sale
                      ? 'text-sm font-semibold text-clay hover:text-clay-dark'
                      : 'text-sm font-medium text-ink/80 hover:text-clay'
                  }
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </nav>
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
          <div className="relative z-50 border-t border-ink/10 bg-cream px-4 pb-4 pt-2 md:hidden">
            <form
              onSubmit={handleSearch}
              role="search"
              className="flex items-center sm:hidden"
            >
              {searchField('mobile-search')}
            </form>
            <nav className="mt-2 flex flex-col gap-1" aria-label="Mobile navigation">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.label}
                  to={link.to}
                  onClick={() => setMenuOpen(false)}
                  className={
                    link.sale
                      ? 'rounded-lg px-3 py-2 text-sm font-semibold text-clay hover:bg-creamdark'
                      : 'rounded-lg px-3 py-2 text-sm font-medium text-ink hover:bg-creamdark hover:text-clay'
                  }
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>
        )}

        <InfoModal
          open={accountOpen}
          onClose={() => setAccountOpen(false)}
          title="Your account"
        >
          <p>
            Sign-in arrives with accounts in a later phase. For now your cart
            and wishlist are saved on this device, so you can keep shopping
            without an account.
          </p>
        </InfoModal>
      </header>
    </>
  );
}
