# ShopKart — Phase 1: Homepage

A complete e-commerce storefront built with React 18 + TypeScript.

**Phase 1 ships the homepage only.** Shop, Product detail, Cart, Checkout and
Wishlist pages are planned for later phases.

## Design

The homepage follows the structure of a home-goods store mockup (warm cream
background, near-black text, terracotta accent, large rounded corners, soft
pastel category tiles), rebuilt with ShopKart's own copy, banners and products.

Sections, top to bottom:

- Announcement bar — "Free shipping on orders over $50 · 30-day returns"
- Sticky header — ShopKart logo, live search, account button, wishlist heart
  with live count, terracotta pill Cart button with live count; second nav row
  (New arrivals, Electronics, Jewelery, Men's Clothing, Women's Clothing,
  Sale) — every link really filters the product grid via URL params
- Hero — original headline "Everything you love, all in one place.", two
  calls to action, and a live hero visual: the highest-rated product in a
  large rounded frame with two floating mini product cards (real products,
  real prices, working add-to-cart)
- Shop by category — four pastel tiles (one per API category) with product
  counts; clicking one filters the grid
- New arrivals — top-rated products (8 by default, all 20 with "Shop all"),
  with badges (Sale / Best seller / New), wishlist hearts and Add to Cart
- Seasonal sale banner — terracotta, "Up to 20% off top-rated picks"; the CTA
  scrolls to the real sale products
- Trust strip — free delivery over $50, easy 30-day returns, secure checkout,
  friendly support
- Newsletter — "Get 10% off your first order" with real email validation; a
  successful signup is stored in localStorage and shows the code WELCOME10
- Footer (dark) — Shop / Help / Company columns; every link does something
  real (Shop links navigate or filter; Help, Company, Privacy, Terms and
  Cookies open a modal with short real content)

## Sale rule

Products with a rating of 4.5 or higher are on sale at **20% off**. The rule
lives in `src/lib/sale.ts` (`isOnSale`, `getSalePrice`, `getEffectivePrice`)
and is used everywhere a price is shown — product cards, cart and wishlist
mini-panels — so the price is consistent across the page. Sale cards show the
original price struck through next to the sale price and a "Sale −20%" badge.
Badges (one per card, in this priority order): Sale → Best seller (rating ≥
4.0 and 250+ reviews) → New (the four most recently added products, ids 17–
20).

## Animations

- Framer Motion throughout: staggered hero entrance, `whileInView` reveal on
  every section, staggered product-card entrance, hover lift + image zoom on
  cards, animated sale banner, cart/wishlist badge pop when an item is added,
  smooth scrolling to sections, floating animation on the hero mini-cards
- Subtle CSS 3D tilt (perspective + rotate on hover) on the hero visual and
  product cards
- `prefers-reduced-motion` is respected: heavy animations are disabled when
  the user prefers it (both in the motion components and in CSS)
- No Three.js in this phase — motion + CSS 3D only, keeping the page fast

## What's in phase 1

- Header with store name, navigation, live search, and cart/wishlist badges
  with working mini-panels — add products from the featured section and watch
  the badges and panels update (cart and wishlist state is real, persisted to
  localStorage; sale prices are applied in the panels too)
- Hero section with headline, supporting text, calls to action and a live
  product visual
- Featured products from the Fake Store API (top rated), with loading skeletons
  and an error state with retry
- Live search and category filtering of the featured products via URL params
  (`?q=`, `?category=`, `?sale=1`, `?view=all`), with result counts and a
  clear-filters action
- Category tiles with live product counts
- Seasonal sale banner with a real, implemented sale rule
- Trust strip, validated newsletter signup (localStorage), dark footer with
  working informational modals
- Responsive on mobile, tablet and desktop; semantic HTML, aria-labels on icon
  buttons, visible focus states, alt text on images

## Tech Stack

- React 18 + TypeScript (strict) + Vite
- Tailwind CSS — styling (custom cream / ink / clay / pastel theme)
- Framer Motion — entrance, scroll-reveal, hover and badge animations
- React Router (`react-router-dom`) — routing (single homepage route for now;
  more routes land with later phases)
- Zustand — cart + wishlist state (persisted to localStorage)
- TanStack Query (`@tanstack/react-query`) — product data fetching and caching
- React Hook Form + Zod (`@hookform/resolvers`) — newsletter validation now;
  checkout form in a later phase

## Data

Products come from the Fake Store API (https://fakestoreapi.com). If the API is
unreachable, a built-in fallback list of 12 products is used instead, so the
page never renders empty.

## Getting Started

```bash
npm install
npm run dev
npm run build
```

## Project Structure

```text
src/
  components/   # Reusable UI components (Header, Hero, ProductCard,
                #   CategoryTiles, SaleBanner, TrustStrip, Newsletter,
                #   Footer, InfoModal, motion primitives, skeletons)
  pages/        # Route-level pages (Home only in phase 1)
  store/        # Zustand stores (cart, wishlist)
  hooks/        # Custom React hooks (TanStack Query product hooks)
  lib/          # API client, fallback products, sale rule, helpers
  types/        # Shared TypeScript types
```

## Planned (later phases)

- Shop page (full catalog, search, filters, sorting)
- Product detail page
- Cart page (free-shipping progress, totals)
- Checkout (3-step mock checkout with validation)
- Wishlist page

## Live demo

Live demo: https://ecommerce-storefront-brown.vercel.app/
