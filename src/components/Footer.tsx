import { Link } from 'react-router-dom';

const CATEGORIES = ["men's clothing", "women's clothing", 'electronics', 'jewelery'];

export default function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-300">
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-8 px-4 py-12 sm:grid-cols-3 sm:px-6 lg:px-8">
        <div>
          <h3 className="text-lg font-bold text-white">About ShopKart</h3>
          <p className="mt-3 text-sm leading-relaxed">
            ShopKart is a demo storefront offering a curated range of clothing,
            electronics and jewellery with fast, friendly shopping.
          </p>
        </div>
        <div>
          <h3 className="text-lg font-bold text-white">Shop</h3>
          <ul className="mt-3 space-y-2 text-sm">
            <li>
              <a href="#featured" className="hover:text-white">
                All Products
              </a>
            </li>
            {CATEGORIES.map((category) => (
              <li key={category}>
                <Link
                  to={`/?category=${encodeURIComponent(category)}#featured`}
                  className="capitalize hover:text-white"
                >
                  {category}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h3 className="text-lg font-bold text-white">Help</h3>
          <ul className="mt-3 space-y-2 text-sm">
            <li>
              <span>Free shipping over $50</span>
            </li>
            <li>
              <span>30-day returns</span>
            </li>
            <li>
              <span>Demo store — no real orders are processed</span>
            </li>
          </ul>
        </div>
      </div>
      <div className="border-t border-slate-800 py-4 text-center text-sm text-slate-400">
        © 2026 ShopKart. Demo store — no real orders are processed.
      </div>
    </footer>
  );
}
