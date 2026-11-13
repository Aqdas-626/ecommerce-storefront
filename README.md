# ShopKart — Phase 1: Homepage

A complete e-commerce storefront built with React 18 + TypeScript.

**Phase 1 ships the homepage only.** Shop, Product detail, Cart, Checkout and
Wishlist pages are planned for later phases.

## What's in phase 1

- Header with store name, navigation, live search, and cart/wishlist badges
  with working mini-panels — add products from the featured section and watch
  the badges and panels update (cart and wishlist state is real, persisted to
  localStorage)
- Hero section with headline, supporting text and calls to action
- Featured products from the Fake Store API (top rated), with loading skeletons
  and an error state with retry
- Live search and category filtering of the featured products via URL params
  (`?q=` and `?category=`), with result counts and a clear-filters action
- Category highlights (electronics, jewelery, men's clothing, women's clothing)
- "Why shop with us" strip (free shipping over $50, 30-day returns, secure
  checkout)
- Footer
- Responsive on mobile, tablet and desktop

## Tech Stack

- React 18 + TypeScript (strict) + Vite
- Tailwind CSS — styling
- React Router (`react-router-dom`) — routing (single homepage route for now;
  more routes land with later phases)
- Zustand — cart + wishlist state (persisted to localStorage)
- TanStack Query (`@tanstack/react-query`) — product data fetching and caching
- React Hook Form + Zod (`@hookform/resolvers`) — installed; used by the
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
  components/   # Reusable UI components
  pages/        # Route-level pages (Home only in phase 1)
  store/        # Zustand stores (cart, wishlist)
  hooks/        # Custom React hooks (TanStack Query product hooks)
  lib/          # API client, fallback products, helpers
  types/        # Shared TypeScript types
```

## Planned (later phases)

- Shop page (full catalog, search, filters, sorting)
- Product detail page
- Cart page (free-shipping progress, totals)
- Checkout (3-step mock checkout with validation)
- Wishlist page

## Live demo

Live demo: _coming soon_
