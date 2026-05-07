import React, { useState, useMemo } from 'react';
import { products, categories } from '../data/products';
import ProductCard from '../components/ProductCard';
import './Products.css';

export default function Products({ searchQuery, onToast }) {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [sortBy, setSortBy] = useState('featured');
  const [priceRange, setPriceRange] = useState([0, 600]);
  const [minRating, setMinRating] = useState(0);

  const allCategories = ['All', ...categories.map(c => c.name)];

  const filtered = useMemo(() => {
    let result = [...products];

    // Search filter
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      result = result.filter(p =>
        p.title.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q)
      );
    }

    // Category filter
    if (selectedCategory !== 'All') {
      result = result.filter(p => p.category === selectedCategory);
    }

    // Price filter
    result = result.filter(p => p.price >= priceRange[0] && p.price <= priceRange[1]);

    // Rating filter
    result = result.filter(p => p.rating >= minRating);

    // Sort
    switch (sortBy) {
      case 'price-asc': result.sort((a, b) => a.price - b.price); break;
      case 'price-desc': result.sort((a, b) => b.price - a.price); break;
      case 'rating': result.sort((a, b) => b.rating - a.rating); break;
      case 'reviews': result.sort((a, b) => b.reviews - a.reviews); break;
      default: break; // featured — original order
    }

    return result;
  }, [searchQuery, selectedCategory, sortBy, priceRange, minRating]);

  return (
    <div className="products-page">
      <div className="container products-layout">
        {/* Sidebar filters */}
        <aside className="filters-sidebar">
          <h2 className="filters-title">Filters</h2>

          {/* Category */}
          <div className="filter-group">
            <h3>Category</h3>
            {allCategories.map(cat => (
              <label key={cat} className="filter-option">
                <input
                  type="radio"
                  name="category"
                  checked={selectedCategory === cat}
                  onChange={() => setSelectedCategory(cat)}
                />
                <span>{cat}</span>
              </label>
            ))}
          </div>

          {/* Price range */}
          <div className="filter-group">
            <h3>Max Price: <span className="price-val">${priceRange[1]}</span></h3>
            <input
              type="range"
              min={0}
              max={600}
              step={10}
              value={priceRange[1]}
              onChange={e => setPriceRange([0, Number(e.target.value)])}
              className="price-slider"
            />
            <div className="price-labels"><span>$0</span><span>$600+</span></div>
          </div>

          {/* Min rating */}
          <div className="filter-group">
            <h3>Minimum Rating</h3>
            {[0, 3, 4, 4.5].map(r => (
              <label key={r} className="filter-option">
                <input
                  type="radio"
                  name="rating"
                  checked={minRating === r}
                  onChange={() => setMinRating(r)}
                />
                <span>{r === 0 ? 'All' : `${r}★ & up`}</span>
              </label>
            ))}
          </div>

          <button className="btn-clear-filters" onClick={() => {
            setSelectedCategory('All');
            setSortBy('featured');
            setPriceRange([0, 600]);
            setMinRating(0);
          }}>
            Clear All Filters
          </button>
        </aside>

        {/* Main content */}
        <main className="products-main">
          <div className="products-toolbar">
            <div className="results-info">
              {searchQuery && <span>Results for <strong>"{searchQuery}"</strong> — </span>}
              <span>{filtered.length} products</span>
            </div>

            <div className="sort-wrap">
              <label htmlFor="sort">Sort by: </label>
              <select id="sort" value={sortBy} onChange={e => setSortBy(e.target.value)}>
                <option value="featured">Featured</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
                <option value="rating">Avg. Rating</option>
                <option value="reviews">Most Reviews</option>
              </select>
            </div>
          </div>

          {filtered.length === 0 ? (
            <div className="no-results">
              <div className="no-results-icon">🔍</div>
              <h3>No products found</h3>
              <p>Try adjusting your filters or search query.</p>
            </div>
          ) : (
            <div className="products-grid-page">
              {filtered.map(p => (
                <ProductCard key={p.id} product={p} onToast={onToast} />
              ))}
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
