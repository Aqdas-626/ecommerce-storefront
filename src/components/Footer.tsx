import { useState } from 'react';
import { Link } from 'react-router-dom';
import InfoModal from './InfoModal.tsx';

const CATEGORIES = ["men's clothing", "women's clothing", 'electronics', 'jewelery'];

function titleCase(value: string): string {
  return value
    .split(' ')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

const MODAL_CONTENT: Record<string, { title: string; body: string }> = {
  shipping: {
    title: 'Shipping',
    body: 'Free delivery on orders over $50 (otherwise $4.99 flat). Orders leave our warehouse in 1–2 working days.',
  },
  returns: {
    title: 'Returns',
    body: '30-day returns, no questions asked. Items must be unused and in original packaging; refunds go back to your original payment method.',
  },
  track: {
    title: 'Track order',
    body: 'Order tracking arrives with checkout in a later phase. Your order number will work here as soon as real checkout lands.',
  },
  contact: {
    title: 'Contact us',
    body: 'Email us at hello@shopkart.example — we reply within one working day. (Demo store: this address is illustrative.)',
  },
  about: {
    title: 'About ShopKart',
    body: 'ShopKart is a demo storefront built as a portfolio project — a general store with real product data, a working cart and wishlist, and no real orders.',
  },
  careers: {
    title: 'Careers',
    body: "We're a demo store, so there are no open roles — but the developer behind ShopKart is open to frontend work.",
  },
  sustainability: {
    title: 'Sustainability',
    body: 'Demo store, honest note: we reuse packaging where possible and ship carbon-neutral where our carriers allow.',
  },
  stores: {
    title: 'Stores',
    body: 'ShopKart is online-only. There are no physical stores — everything ships from one warehouse.',
  },
  privacy: {
    title: 'Privacy',
    body: 'Your cart, wishlist and newsletter signup are stored in localStorage on your own device. There are no accounts and no tracking.',
  },
  terms: {
    title: 'Terms',
    body: 'ShopKart is a demo store. Prices are shown in USD and no real payments are taken — no real orders are processed.',
  },
  cookies: {
    title: 'Cookies',
    body: 'This demo uses only localStorage on your device. There are no tracking cookies.',
  },
};

const HELP_LINKS: { key: string; label: string }[] = [
  { key: 'shipping', label: 'Shipping' },
  { key: 'returns', label: 'Returns' },
  { key: 'track', label: 'Track order' },
  { key: 'contact', label: 'Contact us' },
];

const COMPANY_LINKS: { key: string; label: string }[] = [
  { key: 'about', label: 'About' },
  { key: 'careers', label: 'Careers' },
  { key: 'sustainability', label: 'Sustainability' },
  { key: 'stores', label: 'Stores' },
];

const LEGAL_LINKS: { key: string; label: string }[] = [
  { key: 'privacy', label: 'Privacy' },
  { key: 'terms', label: 'Terms' },
  { key: 'cookies', label: 'Cookies' },
];

export default function Footer() {
  const [activeModal, setActiveModal] = useState<string | null>(null);
  const modal = activeModal ? MODAL_CONTENT[activeModal] : null;

  return (
    <footer className="bg-ink text-stone-300">
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-10 px-4 py-12 sm:grid-cols-2 sm:px-6 lg:grid-cols-4 lg:px-8">
        <div>
          <Link to="/" className="font-display text-xl font-bold text-white">
            ShopKart
          </Link>
          <p className="mt-3 max-w-xs text-sm leading-relaxed">
            Considered everyday goods — standout tech, timeless jewellery and
            everyday style, delivered fast.
          </p>
        </div>
        <div>
          <h3 className="text-sm font-semibold uppercase tracking-wider text-white">
            Shop
          </h3>
          <ul className="mt-4 space-y-2 text-sm">
            <li>
              <Link to="/#new-arrivals" className="hover:text-white">
                New arrivals
              </Link>
            </li>
            {CATEGORIES.map((category) => (
              <li key={category}>
                <Link
                  to={`/?category=${encodeURIComponent(category)}#featured`}
                  className="hover:text-white"
                >
                  {titleCase(category)}
                </Link>
              </li>
            ))}
            <li>
              <Link to="/?sale=1#featured" className="hover:text-white">
                Sale
              </Link>
            </li>
          </ul>
        </div>
        <div>
          <h3 className="text-sm font-semibold uppercase tracking-wider text-white">
            Help
          </h3>
          <ul className="mt-4 space-y-2 text-sm">
            {HELP_LINKS.map((link) => (
              <li key={link.key}>
                <button
                  type="button"
                  onClick={() => setActiveModal(link.key)}
                  className="hover:text-white"
                >
                  {link.label}
                </button>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h3 className="text-sm font-semibold uppercase tracking-wider text-white">
            Company
          </h3>
          <ul className="mt-4 space-y-2 text-sm">
            {COMPANY_LINKS.map((link) => (
              <li key={link.key}>
                <button
                  type="button"
                  onClick={() => setActiveModal(link.key)}
                  className="hover:text-white"
                >
                  {link.label}
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="border-t border-white/10">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-3 px-4 py-5 text-sm text-stone-400 sm:flex-row sm:px-6 lg:px-8">
          <p>© 2026 ShopKart. Demo store — no real orders are processed.</p>
          <p className="flex items-center gap-1">
            {LEGAL_LINKS.map((link, index) => (
              <span key={link.key} className="flex items-center gap-1">
                {index > 0 && <span aria-hidden="true">·</span>}
                <button
                  type="button"
                  onClick={() => setActiveModal(link.key)}
                  className="hover:text-white"
                >
                  {link.label}
                </button>
              </span>
            ))}
          </p>
        </div>
      </div>
      {modal && (
        <InfoModal
          open={activeModal !== null}
          onClose={() => setActiveModal(null)}
          title={modal.title}
        >
          <p>{modal.body}</p>
        </InfoModal>
      )}
    </footer>
  );
}
