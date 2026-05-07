import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { CartProvider, WishlistProvider } from './context/ShopContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import { ToastContainer, useToast } from './components/Toast';
import Home from './pages/Home';
import Products from './pages/Products';
import ProductDetail from './pages/ProductDetail';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import Wishlist from './pages/Wishlist';
import './index.css';

function AppInner() {
  const [darkMode, setDarkMode] = useState(() => {
    try { return localStorage.getItem('amazon_dark') === 'true'; } catch { return false; }
  });
  const [searchQuery, setSearchQuery] = useState('');
  const { toasts, showToast } = useToast();

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', darkMode ? 'dark' : 'light');
    try { localStorage.setItem('amazon_dark', darkMode); } catch {}
  }, [darkMode]);

  return (
    <div className="app">
      <Navbar
        darkMode={darkMode}
        setDarkMode={setDarkMode}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
      />
      <main>
        <Routes>
          <Route path="/" element={<Home onToast={showToast} />} />
          <Route path="/products" element={<Products searchQuery={searchQuery} onToast={showToast} />} />
          <Route path="/product/:id" element={<ProductDetail onToast={showToast} />} />
          <Route path="/cart" element={<Cart onToast={showToast} />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/wishlist" element={<Wishlist onToast={showToast} />} />
          <Route path="/account" element={
            <div style={{ textAlign: 'center', padding: '80px 20px', color: 'var(--text-secondary)' }}>
              <div style={{ fontSize: 60 }}>👤</div>
              <h2 style={{ color: 'var(--text-primary)', marginTop: 16 }}>Account</h2>
              <p>Sign-in is mocked — this is a frontend-only clone!</p>
            </div>
          } />
        </Routes>
      </main>
      <Footer />
      <ToastContainer toasts={toasts} />
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <CartProvider>
        <WishlistProvider>
          <AppInner />
        </WishlistProvider>
      </CartProvider>
    </BrowserRouter>
  );
}
