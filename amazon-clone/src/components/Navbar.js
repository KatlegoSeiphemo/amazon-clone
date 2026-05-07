import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/ShopContext';
import './Navbar.css';

export default function Navbar({ darkMode, setDarkMode, searchQuery, setSearchQuery }) {
  const { itemCount } = useCart();
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  const [inputVal, setInputVal] = useState(searchQuery || '');

  useEffect(() => { setInputVal(searchQuery || ''); }, [searchQuery]);

  const handleSearch = (e) => {
    e.preventDefault();
    if (inputVal.trim()) {
      setSearchQuery(inputVal.trim());
      navigate('/products');
    }
  };

  return (
    <header className="navbar-wrap">
      <nav className="navbar">
        {/* Logo */}
        <Link to="/" className="navbar-logo" onClick={() => setSearchQuery('')}>
          <span className="logo-text">amazon</span>
          <span className="logo-dot">.clone</span>
        </Link>

        {/* Deliver to */}
        <div className="navbar-deliver">
          <span className="deliver-icon">📍</span>
          <div>
            <div className="deliver-label">Deliver to</div>
            <div className="deliver-val">South Africa</div>
          </div>
        </div>

        {/* Search */}
        <form className="navbar-search" onSubmit={handleSearch}>
          <input
            type="text"
            placeholder="Search Amazon Clone..."
            value={inputVal}
            onChange={e => setInputVal(e.target.value)}
          />
          <button type="submit" className="search-btn" aria-label="Search">
            🔍
          </button>
        </form>

        {/* Right Actions */}
        <div className="navbar-actions">
          {/* Dark mode toggle (AI-assisted feature) */}
          <button
            className="navbar-action dark-toggle"
            onClick={() => setDarkMode(!darkMode)}
            title="Toggle dark mode"
          >
            {darkMode ? '☀️' : '🌙'}
          </button>

          <Link to="/account" className="navbar-action">
            <span className="action-label">Hello, Sign in</span>
            <span className="action-main">Account &amp; Lists ▾</span>
          </Link>

          <Link to="/wishlist" className="navbar-action">
            <span className="action-label">Saved</span>
            <span className="action-main">Wishlist ♡</span>
          </Link>

          <Link to="/cart" className="navbar-action cart-action">
            <div className="cart-icon-wrap">
              <span className="cart-icon">🛒</span>
              {itemCount > 0 && <span className="cart-badge">{itemCount}</span>}
            </div>
            <span className="action-main">Cart</span>
          </Link>
        </div>

        {/* Hamburger */}
        <button className="hamburger" onClick={() => setMenuOpen(!menuOpen)} aria-label="Menu">
          {menuOpen ? '✕' : '☰'}
        </button>
      </nav>

      {/* Secondary nav */}
      <nav className="navbar-secondary">
        <div className="container">
          <button className="sec-item" onClick={() => setMenuOpen(!menuOpen)}>☰ All</button>
          {['Today\'s Deals','Prime','Electronics','Fashion','Home','Books','Sports'].map(cat => (
            <Link
              key={cat}
              to="/products"
              className="sec-item"
              onClick={() => { setSearchQuery(''); }}
            >
              {cat}
            </Link>
          ))}
        </div>
      </nav>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="mobile-menu">
          <form onSubmit={handleSearch} className="mobile-search">
            <input
              type="text"
              placeholder="Search products..."
              value={inputVal}
              onChange={e => setInputVal(e.target.value)}
            />
            <button type="submit">🔍 Search</button>
          </form>
          <Link to="/" className="mobile-link" onClick={() => setMenuOpen(false)}>🏠 Home</Link>
          <Link to="/products" className="mobile-link" onClick={() => setMenuOpen(false)}>🛍️ All Products</Link>
          <Link to="/wishlist" className="mobile-link" onClick={() => setMenuOpen(false)}>♡ Wishlist</Link>
          <Link to="/cart" className="mobile-link" onClick={() => setMenuOpen(false)}>🛒 Cart ({itemCount})</Link>
          <button className="mobile-link" onClick={() => { setDarkMode(!darkMode); setMenuOpen(false); }}>
            {darkMode ? '☀️ Light Mode' : '🌙 Dark Mode'}
          </button>
        </div>
      )}
    </header>
  );
}
