import type { Product } from '../types/index.ts';

export const fallbackProducts: Product[] = [
  {
    id: 1,
    title: "Men's Slim-Fit Leather Jacket",
    price: 89.99,
    description:
      'A timeless slim-fit leather jacket with a soft inner lining and sturdy zips. Pairs easily with jeans or chinos for a sharp casual look.',
    category: "men's clothing",
    image:
      'https://images.unsplash.com/photo-1551028719-00167b16eac5?auto=format&fit=crop&w=800&q=80',
    rating: { rate: 4.6, count: 214 },
  },
  {
    id: 2,
    title: "Men's Classic Cotton T-Shirt",
    price: 19.99,
    description:
      'A breathable 100% cotton crew-neck t-shirt with a comfortable regular fit. Pre-shrunk fabric keeps its shape wash after wash.',
    category: "men's clothing",
    image:
      'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=800&q=80',
    rating: { rate: 4.3, count: 486 },
  },
  {
    id: 3,
    title: "Men's Travel Backpack",
    price: 49.99,
    description:
      'A durable everyday backpack with a padded 15-inch laptop sleeve, water-resistant fabric and multiple organizer pockets for travel or work.',
    category: "men's clothing",
    image:
      'https://images.unsplash.com/photo-1590874103328-eac38a683ce7?auto=format&fit=crop&w=800&q=80',
    rating: { rate: 4.5, count: 178 },
  },
  {
    id: 4,
    title: "Women's Running Sneakers",
    price: 74.99,
    description:
      'Lightweight running sneakers with responsive cushioning and a breathable mesh upper. Built for daily runs and all-day comfort.',
    category: "women's clothing",
    image:
      'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=800&q=80',
    rating: { rate: 4.7, count: 392 },
  },
  {
    id: 5,
    title: "Women's Leather Handbag",
    price: 79.99,
    description:
      'An elegant structured leather handbag with an adjustable shoulder strap and roomy interior. A versatile piece for work or evenings out.',
    category: "women's clothing",
    image:
      'https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=800&q=80',
    rating: { rate: 4.4, count: 156 },
  },
  {
    id: 6,
    title: "Women's Leather Shoes",
    price: 64.99,
    description:
      'Classic leather shoes with a cushioned insole and durable sole. Comfortable enough for long days, polished enough for the office.',
    category: "women's clothing",
    image:
      'https://images.unsplash.com/photo-1560343090-f0409e92791a?auto=format&fit=crop&w=800&q=80',
    rating: { rate: 4.2, count: 98 },
  },
  {
    id: 7,
    title: 'Wireless Noise-Cancelling Headphones',
    price: 129.99,
    description:
      'Over-ear wireless headphones with active noise cancellation, 30-hour battery life and rich, balanced sound for music and calls.',
    category: 'electronics',
    image:
      'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=800&q=80',
    rating: { rate: 4.8, count: 621 },
  },
  {
    id: 8,
    title: 'Smartwatch with Fitness Tracking',
    price: 149.99,
    description:
      'A sleek smartwatch that tracks workouts, heart rate and sleep, with notifications and a battery that lasts up to 7 days on a charge.',
    category: 'electronics',
    image:
      'https://images.unsplash.com/photo-1546868871-7041f2a55e12?auto=format&fit=crop&w=800&q=80',
    rating: { rate: 4.5, count: 340 },
  },
  {
    id: 9,
    title: 'Bluetooth Over-Ear Headphones',
    price: 59.99,
    description:
      'Comfortable Bluetooth headphones with deep bass, foldable design and up to 20 hours of playtime. Great for travel, work and workouts.',
    category: 'electronics',
    image:
      'https://images.unsplash.com/photo-1583394838336-acd977736f90?auto=format&fit=crop&w=800&q=80',
    rating: { rate: 4.1, count: 267 },
  },
  {
    id: 10,
    title: 'Classic Minimalist Analog Watch',
    price: 119.99,
    description:
      'A minimalist analog watch with a genuine leather strap and scratch-resistant glass. Understated design that suits any occasion.',
    category: 'jewelery',
    image:
      'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=800&q=80',
    rating: { rate: 4.7, count: 189 },
  },
  {
    id: 11,
    title: 'Gold Pendant Necklace',
    price: 39.99,
    description:
      'A delicate gold-tone pendant necklace on a fine chain. Hypoallergenic and tarnish-resistant, it adds a subtle shine to any outfit.',
    category: 'jewelery',
    image:
      'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?auto=format&fit=crop&w=800&q=80',
    rating: { rate: 4.6, count: 143 },
  },
  {
    id: 12,
    title: 'Gold-Frame Aviator Sunglasses',
    price: 29.99,
    description:
      'Timeless aviator sunglasses with a gold-tone metal frame and UV400 lenses. Includes a protective case and microfibre cleaning cloth.',
    category: 'jewelery',
    image:
      'https://images.unsplash.com/photo-1572635196237-14b3f281503f?auto=format&fit=crop&w=800&q=80',
    rating: { rate: 4.3, count: 87 },
  },
];
