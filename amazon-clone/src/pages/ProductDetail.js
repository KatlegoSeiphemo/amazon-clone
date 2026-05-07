import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { products } from '../data/products';
import { useCart, useWishlist } from '../context/ShopContext';
import ProductCard from '../components/ProductCard';
import './ProductDetail.css';

function Stars({ rating, large }) {
  const full = Math.floor(rating);
  const half = rating % 1 >= 0.5;
  return (
    <span className={`stars ${large ? 'stars-lg' : ''}`}>
      {'★'.repeat(full)}{half ? '½' : ''}{'☆'.repeat(5 - full - (half ? 1 : 0))}
    </span>
  );
}

export default function ProductDetail({ onToast }) {
  const { id } = useParams();
  const product = products.find(p => p.id === Number(id));
  const { addToCart } = useCart();
  const { toggleWishlist, isWishlisted } = useWishlist();
  const [qty, setQty] = useState(1);
  const [added, setAdded] = useState(false);

  if (!product) {
    return (
      <div className="container" style={{ padding: '60px 16px', textAlign: 'center' }}>
        <h2>Product not found</h2>
        <Link to="/products" className="btn-primary" style={{ marginTop: 16, display: 'inline-block' }}>
          Back to Products
        </Link>
      </div>
    );
  }

  const related = products
    .filter(p => p.category === product.category && p.id !== product.id)
    .slice(0, 4);

  const discount = product.originalPrice
    ? Math.round((1 - product.price / product.originalPrice) * 100)
    : 0;

  const handleAddToCart = () => {
    for (let i = 0; i < qty; i++) addToCart(product);
    onToast?.(`${qty}x "${product.title.slice(0, 25)}..." added to cart`);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  const wishlisted = isWishlisted(product.id);

  return (
    <div className="product-detail-page">
      <div className="container">
        {/* Breadcrumb */}
        <nav className="breadcrumb">
          <Link to="/">Home</Link>
          <span> › </span>
          <Link to="/products">{product.category}</Link>
          <span> › </span>
          <span>{product.title.slice(0, 40)}...</span>
        </nav>

        <div className="detail-grid">
          {/* Image */}
          <div className="detail-image-wrap">
            <img src={product.image} alt={product.title} />
            {product.badge && (
              <span className={`badge badge-lg ${product.badge === 'Prime' ? 'prime' : 'deal'}`}>
                {product.badge}
              </span>
            )}
          </div>

          {/* Info */}
          <div className="detail-info">
            <h1 className="detail-title">{product.title}</h1>
            <p className="detail-desc">{product.description}</p>

            <div className="detail-rating">
              <Stars rating={product.rating} large />
              <span className="detail-rating-num">{product.rating}</span>
              <span className="detail-reviews">{product.reviews.toLocaleString()} ratings</span>
            </div>

            <hr className="detail-divider" />

            <div className="detail-price-block">
              <div className="detail-price">${product.price.toFixed(2)}</div>
              {product.originalPrice && (
                <div className="detail-original">
                  List Price: <del>${product.originalPrice.toFixed(2)}</del>
                  {discount > 0 && <span className="detail-discount"> You save {discount}%</span>}
                </div>
              )}
            </div>

            <div className="detail-prime">
              <span className="prime-badge-lg">prime</span>
              <span>FREE delivery <strong>tomorrow</strong> for Prime members</span>
            </div>

            <div className="detail-stock">✓ In Stock</div>

            {/* Quantity */}
            <div className="qty-wrap">
              <label>Qty:</label>
              <div className="qty-controls">
                <button onClick={() => setQty(q => Math.max(1, q - 1))}>−</button>
                <span>{qty}</span>
                <button onClick={() => setQty(q => Math.min(10, q + 1))}>+</button>
              </div>
            </div>

            <div className="detail-actions">
              <button
                className={`btn-add-cart-lg ${added ? 'added' : ''}`}
                onClick={handleAddToCart}
              >
                {added ? '✓ Added to Cart!' : 'Add to Cart'}
              </button>
              <button className="btn-buy-now">Buy Now</button>
              <button
                className={`btn-wishlist-lg ${wishlisted ? 'active' : ''}`}
                onClick={() => {
                  toggleWishlist(product);
                  onToast?.(wishlisted ? 'Removed from wishlist' : '♡ Added to wishlist');
                }}
              >
                {wishlisted ? '♥ Wishlisted' : '♡ Add to Wishlist'}
              </button>
            </div>

            <div className="detail-meta">
              <div><span>Category:</span> {product.category}</div>
              <div><span>Ships from:</span> Amazon Clone</div>
              <div><span>Sold by:</span> Amazon Clone Store</div>
            </div>
          </div>
        </div>

        {/* Related Products */}
        {related.length > 0 && (
          <section className="related-section">
            <h2 className="section-title">You May Also Like</h2>
            <div className="products-grid-related">
              {related.map(p => (
                <ProductCard key={p.id} product={p} onToast={onToast} />
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}
