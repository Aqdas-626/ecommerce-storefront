import { useEffect, useMemo } from 'react'
import { Link, useLocation, useNavigate, useSearchParams } from 'react-router-dom'
import { useCategories, useProducts } from '../hooks/useProducts'
import ProductCard from '../components/ProductCard'
import ProductSkeleton from '../components/ProductSkeleton'
import EmptyState from '../components/EmptyState'

const HERO_IMAGE =
  'https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=1200&q=80'

const CATEGORY_IMAGES: Record<string, string> = {
  "men's clothing":
    'https://images.unsplash.com/photo-1617137968427-85924c800a22?auto=format&fit=crop&w=800&q=80',
  "women's clothing":
    'https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=800&q=80',
  electronics:
    'https://images.unsplash.com/photo-1498049794561-7780e7231661?auto=format&fit=crop&w=800&q=80',
  jewelery:
    'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?auto=format&fit=crop&w=800&q=80',
}

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

const TRUST_ITEMS = [
  {
    title: 'Free shipping',
    text: 'Free shipping on orders over $50, no code needed.',
  },
  {
    title: '30-day returns',
    text: 'Changed your mind? Return it within 30 days for a full refund.',
  },
  {
    title: 'Secure checkout',
    text: 'Your payment details are protected with encrypted checkout.',
  },
]

export default function Home() {
  const { data: products, isLoading, isError, refetch } = useProducts()
  const { data: categories } = useCategories()
  const [searchParams] = useSearchParams()
  const location = useLocation()
  const navigate = useNavigate()

  const q = (searchParams.get('q') ?? '').trim()
  const category = searchParams.get('category') ?? ''
  const filtering = q !== '' || category !== ''

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
    if (filtering) return list.slice(0, 8)
    return [...list].sort((a, b) => b.rating.rate - a.rating.rate).slice(0, 4)
  }, [products, q, category, filtering])

  const featuredHeading = q
    ? `Results for "${q}"`
    : category
      ? titleCase(category)
      : 'Featured products'

  const categoryList =
    categories && categories.length > 0 ? categories : FALLBACK_CATEGORIES

  return (
    <div>
      {/* Hero */}
      <section className="bg-white">
        <div className="mx-auto grid max-w-7xl items-center gap-10 px-4 py-12 sm:px-6 md:grid-cols-2 lg:px-8 lg:py-16">
          <div>
            <h1 className="text-4xl font-extrabold tracking-tight text-slate-900 sm:text-5xl">
              Everything you need, delivered to your door.
            </h1>
            <p className="mt-4 text-lg text-slate-600">
              Shop quality clothing, electronics and jewelry at honest prices —
              with fast delivery and easy returns on every order.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <a
                href="#featured"
                className="rounded-md bg-indigo-600 px-6 py-3 text-sm font-semibold text-white shadow-sm hover:bg-indigo-700"
              >
                Shop now
              </a>
              <a
                href="#categories"
                className="rounded-md border border-slate-300 bg-white px-6 py-3 text-sm font-semibold text-slate-700 hover:bg-slate-50"
              >
                Browse categories
              </a>
            </div>
          </div>
          <div>
            <img
              src={HERO_IMAGE}
              alt="Clothing rack inside a store"
              className="h-72 w-full rounded-lg object-cover shadow-md sm:h-96"
            />
          </div>
        </div>
      </section>

      {/* Featured products */}
      <section
        id="featured"
        className="mx-auto max-w-7xl scroll-mt-20 px-4 py-12 sm:px-6 lg:px-8"
      >
        <div className="flex flex-wrap items-baseline gap-x-4 gap-y-1">
          <h2 className="text-2xl font-bold text-slate-900">{featuredHeading}</h2>
          {filtering && !isLoading && !isError && (
            <span className="text-sm text-slate-500">
              {visibleProducts.length}{' '}
              {visibleProducts.length === 1 ? 'product' : 'products'}
            </span>
          )}
          {filtering && (
            <Link
              to="/"
              className="text-sm font-medium text-indigo-600 hover:text-indigo-700"
            >
              Clear filters
            </Link>
          )}
        </div>
        {isLoading ? (
          <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {[0, 1, 2, 3].map((n) => (
              <ProductSkeleton key={n} />
            ))}
          </div>
        ) : isError ? (
          <div className="mt-6 rounded-lg border border-red-200 bg-red-50 p-6 text-center">
            <p className="text-red-700">
              Something went wrong while loading featured products.
            </p>
            <button
              type="button"
              onClick={() => void refetch()}
              className="mt-4 rounded-md bg-indigo-600 px-4 py-2 text-sm font-semibold text-white hover:bg-indigo-700"
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
          <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {visibleProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </section>

      {/* Category highlights */}
      <section id="categories" className="scroll-mt-20 bg-white">
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-slate-900">Shop by category</h2>
          <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {categoryList.map((category) => (
              <Link
                key={category}
                to={`/?category=${encodeURIComponent(category)}#featured`}
                className="group overflow-hidden rounded-lg shadow-sm transition hover:shadow-md"
              >
                <img
                  src={CATEGORY_IMAGES[category]}
                  alt={titleCase(category)}
                  className="h-48 w-full object-cover transition group-hover:scale-105"
                />
                <div className="bg-white p-4">
                  <h3 className="text-lg font-semibold text-slate-900 group-hover:text-indigo-600">
                    {titleCase(category)}
                  </h3>
                  <span className="text-sm text-indigo-600">Shop now &rarr;</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Trust strip */}
      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {TRUST_ITEMS.map((item) => (
            <div
              key={item.title}
              className="rounded-lg border border-slate-200 bg-white p-6 text-center"
            >
              <h3 className="text-lg font-semibold text-slate-900">{item.title}</h3>
              <p className="mt-2 text-sm text-slate-600">{item.text}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}
