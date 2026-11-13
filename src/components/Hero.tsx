import { useCartStore } from '../store/cartStore.ts';
import { useProducts } from '../hooks/useProducts.ts';
import { formatPrice } from '../lib/format.ts';
import { getEffectivePrice } from '../lib/sale.ts';
import { Reveal, Tilt } from './motion.tsx';
import type { Product } from '../types/index.ts';

function byRatingDesc(a: Product, b: Product): number {
  if (b.rating.rate !== a.rating.rate) return b.rating.rate - a.rating.rate;
  return b.rating.count - a.rating.count;
}

function MiniProductCard({
  product,
  delay,
  className,
}: {
  product: Product;
  delay: string;
  className: string;
}) {
  const addToCart = useCartStore((state) => state.addItem);
  const effective = getEffectivePrice(product);

  return (
    <div
      className={`animate-float absolute z-10 flex w-44 items-center gap-2 rounded-2xl bg-white p-2 pr-2 shadow-lg sm:w-52 ${className}`}
      style={{ animationDelay: delay }}
    >
      <img
        src={product.image}
        alt={product.title}
        className="h-12 w-12 shrink-0 rounded-xl bg-cream object-contain p-1"
      />
      <div className="min-w-0 flex-1">
        <p className="truncate text-xs font-medium text-ink">{product.title}</p>
        <p className="text-xs font-semibold text-clay">
          {formatPrice(effective)}
          {effective < product.price && (
            <span className="ml-1 font-normal text-ink/40 line-through">
              {formatPrice(product.price)}
            </span>
          )}
        </p>
      </div>
      <button
        type="button"
        onClick={() => addToCart(product)}
        aria-label={`Add ${product.title} to cart`}
        className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-clay text-base font-semibold text-white hover:bg-clay-dark focus:ring-2 focus:ring-clay"
      >
        +
      </button>
    </div>
  );
}

export default function Hero() {
  const { data: products, isLoading, isError } = useProducts();

  const sorted = products ? [...products].sort(byRatingDesc) : [];
  const featured = sorted[0];
  const floating = sorted.slice(1, 3);

  return (
    <section aria-label="ShopKart introduction" className="bg-cream">
      <div className="mx-auto grid max-w-7xl items-center gap-12 px-4 py-16 sm:px-6 sm:py-20 lg:grid-cols-2 lg:px-8 lg:py-24">
        {/* Text column */}
        <div>
          <Reveal delay={0}>
            <p className="text-xs font-semibold uppercase tracking-widest text-clay sm:text-sm">
              New season · Up to 20% off top-rated picks
            </p>
          </Reveal>
          <Reveal delay={0.08}>
            <h1 className="mt-4 font-display text-5xl font-extrabold leading-tight text-ink sm:text-6xl">
              Everything you love, all in one place.
            </h1>
          </Reveal>
          <Reveal delay={0.16}>
            <p className="mt-5 max-w-lg text-base leading-relaxed text-ink/70 sm:text-lg">
              ShopKart brings together standout tech, timeless jewellery and
              everyday style — top-rated picks, honest prices and fast delivery
              on every order.
            </p>
          </Reveal>
          <Reveal delay={0.24}>
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <a
                href="#new-arrivals"
                className="rounded-full bg-clay px-6 py-3 text-sm font-semibold text-white hover:bg-clay-dark focus:ring-2 focus:ring-clay"
              >
                Shop new arrivals
              </a>
              <a
                href="#featured"
                className="rounded-full border border-ink/20 bg-transparent px-6 py-3 text-sm font-semibold text-ink hover:border-clay hover:text-clay focus:ring-2 focus:ring-clay"
              >
                Browse all
              </a>
            </div>
          </Reveal>
        </div>

        {/* Visual column — hidden entirely on error/empty so the text
            column stands alone; a skeleton shows while loading. */}
        {isLoading ? (
          <Reveal delay={0.15}>
            <div
              className="aspect-[4/3] animate-pulse rounded-[2rem] bg-creamdark"
              aria-hidden="true"
            />
          </Reveal>
        ) : !isError && featured ? (
          <Reveal delay={0.15}>
            <Tilt max={5} className="relative">
              <div className="relative overflow-hidden rounded-[2rem] bg-clay-soft">
                <img
                  src={featured.image}
                  alt={featured.title}
                  className="aspect-[4/3] w-full object-contain p-10 sm:p-14"
                />
                <div className="absolute bottom-4 left-4 max-w-[calc(100%-2rem)] rounded-2xl bg-white/95 px-4 py-3 shadow-md">
                  <p className="truncate text-sm font-semibold text-ink">
                    {featured.title}
                  </p>
                  <p className="mt-0.5 text-sm font-bold text-clay">
                    {formatPrice(getEffectivePrice(featured))}
                    {getEffectivePrice(featured) < featured.price && (
                      <span className="ml-2 font-normal text-ink/40 line-through">
                        {formatPrice(featured.price)}
                      </span>
                    )}
                  </p>
                </div>
              </div>
              {floating[0] && (
                <MiniProductCard
                  product={floating[0]}
                  delay="0s"
                  className="-left-2 top-6 sm:-left-6"
                />
              )}
              {floating[1] && (
                <MiniProductCard
                  product={floating[1]}
                  delay="0.7s"
                  className="-bottom-5 -right-2 sm:-right-4"
                />
              )}
            </Tilt>
          </Reveal>
        ) : null}
      </div>
    </section>
  );
}
