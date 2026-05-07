# 🛒 Amazon Clone — React

A full-featured Amazon clone built with React, featuring localStorage persistence, dark mode, search, filtering, sorting, wishlist, and a checkout flow.

## 🚀 Quick Start

```bash
npm install
npm start
```

Open [http://localhost:3000](http://localhost:3000)

## 📦 Build for Production

```bash
npm run build
```

## 🌍 Deploy to Netlify

### Option A: Drag & Drop
1. Run `npm run build`
2. Go to [netlify.com](https://netlify.com) → New Site → Drag & Drop the `build/` folder

### Option B: Git Integration
1. Push this repo to GitHub
2. In Netlify: New Site → Import from Git → select your repo
3. Build command: `npm run build`
4. Publish directory: `build`
5. Click Deploy 🎉

The `public/_redirects` file handles SPA routing automatically.

## ✅ Features Implemented

### Base (40 marks)
- ✅ Top navigation bar with logo, search, account, cart badge
- ✅ Hero banner carousel (auto-rotating, 3 banners)
- ✅ Product categories grid (6 categories)
- ✅ Product grid with 12 products (8+ required)
- ✅ Product cards with image, title, price, ratings
- ✅ Add to Cart / Remove from Cart
- ✅ Cart page with items, quantities, subtotal
- ✅ localStorage persistence for cart
- ✅ Fully responsive: desktop → tablet → mobile
- ✅ Hamburger menu for mobile
- ✅ Product grid adapts (4 → 2 → 1 columns)

### Custom Feature — No AI (15 marks)
- ✅ **Product Filtering** (category, price range, min rating)
- ✅ **Search** that filters products by name/category/description
- ✅ Stored in component state, filters apply in real time

### AI-Assisted Features (20 marks)
- ✅ **Dark Mode** — toggle in navbar, preference saved to localStorage
- ✅ **Full Checkout Flow** — 4-step: Shipping → Delivery → Payment → Confirm → Success

### Bonus Features
- ✅ **Wishlist** (♡ save for later, persisted to localStorage)
- ✅ **Quantity selector** in cart and product detail (+ / -)
- ✅ **Product Sorting** (price ↑↓, rating, reviews)
- ✅ **Related Products** on product detail page
- ✅ Toast notifications for all cart/wishlist actions

## 🧰 Tech Stack
- React 18
- React Router v6
- Context API (no Redux needed)
- localStorage for persistence
- Pure CSS (no Tailwind / Bootstrap)
