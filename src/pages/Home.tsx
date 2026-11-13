import { useEffect, useMemo } from 'react'
import { Link, useLocation, useNavigate, useSearchParams } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useCategories, useProducts } from '../hooks/useProducts'
import { isOnSale } from '../lib/sale.ts'
import ProductCard from '../components/ProductCard'
import ProductSkeleton from '../components/ProductSkeleton'
import EmptyState from '../components/EmptyState'
import Hero from '../components/Hero.tsx'
import CategoryTiles from '../components/CategoryTiles'
import SaleBanner from '../components/SaleBanner'
import TrustStrip from '../components/TrustStrip'
import Newsletter from '../components/Newsletter'
import { Reveal } from '../components/motion.tsx'

const FALLBACK_CATEGORIES = [
  "men's clothing",
  "women's clothing",
  'electronics',
  'jewelery',
]

function titleCase(value: string): string {
  return value
    .split(' ')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ')
}

const cardVariants = {
  hidden: { opacity: 0, y: 16 },
  visible: (index: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: index * 0.05 },
  }),
}

export default function Home() {
  const { data: products, isLoading, isError, refetch } = useProducts()
  const { data: categories } = useCategories()
  const [searchParams] = useSearchParams()
  const location = useLocation()
  const navigate = useNavigate()

  const q = (searchParams.get('q') ?? '').trim()
  const category = searchParams.get('category') ?? ''
  const onSaleOnly = searchParams.get('sale') === '1'
  const viewAll = searchParams.get('view') === 'all'
  const filtering = q !== '' || category !== '' || onSaleOnly

  // Scroll to an anchor section (e.g. #featured) when the URL hash changes,
  // e.g. after a header search or a category-card click.
  useEffect(() => {
    if (location.hash) {
      document.querySelector(location.hash)?.scrollIntoView({ behavior: 'smooth' })
    }
  }, [location])

  const visibleProducts = useMemo(() => {
    if (!products) return []
    let list = products
    if (category) {
      list = list.filter((product) => product.category === category)
    }
    if (q) {
      const needle = q.toLowerCase()
      list = list.filter((product) =>
        `${product.title} ${product.description} ${product.category}`
          .toLowerCase()
          .includes(needle),
      )
    }
    if (onSaleOnly) {
      list = list.filter((product) => isOnSale(product))
    }
    const sorted = [...list].sort((a, b) => b.rating.rate - a.rating.rate)
    // view=all only expands the list when no other filter is active; a
    // filtered view (search / category / sale) always shows its top 8.
    if (viewAll && !filtering) return sorted
    return sorted.slice(0, 8)
  }, [products, q, category, onSaleOnly, viewAll, filtering])

  const featuredHeading = q
    ? `Results for "${q}"`
    : onSaleOnly
      ? 'On sale — up to 20% off'
      : category
        ? titleCase(category)
        : 'New arrivals'

  const categoryList =
    categories && categories.length > 0 ? categories : FALLBACK_CATEGORIES

  // Per-category counts and the first product image of each category, from
  // the loaded products. When the API fails, counts/images stay empty and
  // the tiles still render with their names and a "Shop now" link.
  const { categoryCounts, categoryImages } = useMemo(() => {
    const counts: Record<string, number> = {}
    const images: Record<string, string> = {}
    for (const product of products ?? []) {
      counts[product.category] = (counts[product.category] ?? 0) + 1
      if (!images[product.category]) {
        images[product.category] = product.image
      }
    }
    return { categoryCounts: counts, categoryImages: images }
  }, [products])

  return (
    <div className="bg-cream">
      <Hero />

      {/* Shop by category */}
      <section id="categories" className="mx-auto max-w-7xl scroll-mt-20 px-4 pt-12 sm:px-6 lg:px-8">
        <Reveal>
          <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
            <h2 className="font-display text-2xl font-bold text-ink sm:text-3xl">
              Shop by category
            </h2>
            <Link
              to="/?view=all#featured"
              className="text-sm font-medium text-clay hover:text-clay-dark"
            >
              View all &rarr;
            </Link>
          </div>
        </Reveal>
        <div className="mt-6">
          <CategoryTiles
            categories={categoryList}
            counts={categoryCounts}
            images={categoryImages}
          />
        </div>
      </section>

      {/* New arrivals / featured grid */}
      <section
        id="new-arrivals"
        className="mx-auto max-w-7xl scroll-mt-20 px-4 py-12 sm:px-6 lg:px-8"
      >
        <Reveal>
          <div className="flex flex-wrap items-baseline gap-x-4 gap-y-1">
            <h2 className="font-display text-2xl font-bold text-ink sm:text-3xl">
              {featuredHeading}
            </h2>
            {filtering && !isLoading && !isError && (
              <span className="text-sm text-stone-500">
                {visibleProducts.length}{' '}
                {visibleProducts.length === 1 ? 'product' : 'products'}
              </span>
            )}
            {filtering && (
              <Link
                to="/"
                className="text-sm font-medium text-clay hover:text-clay-dark"
              >
                Clear filters
              </Link>
            )}
            {!filtering && !isLoading && !isError && (
              <Link
                to={viewAll ? '/#featured' : '/?view=all#featured'}
                className="text-sm font-medium text-clay hover:text-clay-dark"
              >
                {viewAll ? 'Show less' : 'Shop all'}
              </Link>
            )}
          </div>
        </Reveal>
        {isLoading ? (
          <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {[0, 1, 2, 3, 4, 5, 6, 7].map((n) => (
              <ProductSkeleton key={n} />
            ))}
          </div>
        ) : isError ? (
          <div className="mt-6 rounded-2xl border border-red-200 bg-red-50 p-6 text-center">
            <p className="text-red-700">
              Something went wrong while loading products.
            </p>
            <button
              type="button"
              onClick={() => void refetch()}
              className="mt-4 rounded-full bg-clay px-5 py-2 text-sm font-semibold text-white hover:bg-clay-dark"
            >
              Retry
            </button>
          </div>
        ) : visibleProducts.length === 0 ? (
          <div className="mt-6">
            <EmptyState
              title="No products found"
              message="Try a different search term or category."
              actionLabel="Clear filters"
              onAction={() => navigate('/')}
            />
          </div>
        ) : (
          <div
            id="featured"
            className="mt-6 grid scroll-mt-20 grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4"
          >
            {visibleProducts.map((product, index) => (
              <motion.div
                key={product.id}
                variants={cardVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                custom={index}
                className="h-full"
              >
                <ProductCard product={product} />
              </motion.div>
            ))}
          </div>
        )}
      </section>

      {/* Sale banner */}
      <section className="mx-auto max-w-7xl px-4 pb-12 sm:px-6 lg:px-8">
        <SaleBanner />
      </section>

      {/* Trust strip */}
      <section className="mx-auto max-w-7xl px-4 pb-12 sm:px-6 lg:px-8">
        <TrustStrip />
      </section>

      {/* Newsletter */}
      <section className="mx-auto max-w-7xl px-4 pb-16 sm:px-6 lg:px-8">
        <Newsletter />
      </section>
    </div>
  )
}
