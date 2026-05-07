import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { products, categories, banners } from '../data/products';
import ProductCard from '../components/ProductCard';
import './Home.css';

export default function Home({ onToast }) {
  const [bannerIdx, setBannerIdx] = useState(0);
  const navigate = useNavigate();

  // Auto-advance banner
  useEffect(() => {
    const timer = setInterval(() => {
      setBannerIdx(i => (i + 1) % banners.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const banner = banners[bannerIdx];

  const featuredProducts = products.slice(0, 8);
  const bestSellers = [...products].sort((a, b) => b.reviews - a.reviews).slice(0, 4);

  return (
    <div className="home">
      {/* Hero Banner */}
      <section className="hero" style={{ background: banner.bg }}>
        <div className="hero-overlay" style={{
          backgroundImage: `url(${banner.image})`,
        }} />
        <div className="hero-content">
          <div className="hero-text">
            <h1 className="hero-title" style={{ color: banner.accent }}>{banner.title}</h1>
            <p className="hero-subtitle">{banner.subtitle}</p>
            <Link to="/products" className="hero-cta" style={{ background: banner.accent, color: '#111' }}>
              {banner.cta}
            </Link>
          </div>
        </div>
        {/* Dots */}
        <div className="banner-dots">
          {banners.map((_, i) => (
            <button
              key={i}
              className={`dot ${i === bannerIdx ? 'active' : ''}`}
              onClick={() => setBannerIdx(i)}
              aria-label={`Banner ${i + 1}`}
            />
          ))}
        </div>
        {/* Arrows */}
        <button className="banner-arrow left" onClick={() => setBannerIdx(i => (i - 1 + banners.length) % banners.length)}>‹</button>
        <button className="banner-arrow right" onClick={() => setBannerIdx(i => (i + 1) % banners.length)}>›</button>
      </section>

      {/* Categories */}
      <section className="categories-section">
        <div className="container">
          <h2 className="section-title">Shop by Category</h2>
          <div className="categories-grid">
            {categories.map(cat => (
              <Link
                key={cat.name}
                to="/products"
                className="category-card"
              >
                <div className="cat-image">
                  <img src={cat.image} alt={cat.name} loading="lazy" />
                  <div className="cat-overlay">
                    <span className="cat-icon">{cat.icon}</span>
                  </div>
                </div>
                <div className="cat-name">{cat.name}</div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Best Sellers */}
      <section className="featured-section">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">🔥 Best Sellers</h2>
            <Link to="/products" className="see-all">See all deals →</Link>
          </div>
          <div className="products-grid products-grid--4">
            {bestSellers.map(p => (
              <ProductCard key={p.id} product={p} onToast={onToast} />
            ))}
          </div>
        </div>
      </section>

      {/* All Featured Products */}
      <section className="featured-section">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">Featured Products</h2>
            <Link to="/products" className="see-all">View all →</Link>
          </div>
          <div className="products-grid">
            {featuredProducts.map(p => (
              <ProductCard key={p.id} product={p} onToast={onToast} />
            ))}
          </div>
        </div>
      </section>

      {/* Prime Banner */}
      <section className="prime-banner">
        <div className="container">
          <div className="prime-content">
            <div className="prime-left">
              <div className="prime-logo">prime</div>
              <h3>Try Prime — Free for 30 Days</h3>
              <p>Free delivery, exclusive deals, streaming & more</p>
            </div>
            <Link to="/" className="btn-orange">Start free trial</Link>
          </div>
        </div>
      </section>
    </div>
  );
}
