import React from 'react';
import { Link } from 'react-router-dom';
import { useCart, useWishlist } from '../context/ShopContext';
import './ProductCard.css';

function Stars({ rating }) {
  const full = Math.floor(rating);
  const half = rating % 1 >= 0.5;
  return (
    <span className="stars" title={`${rating} out of 5`}>
      {'★'.repeat(full)}{half ? '½' : ''}{'☆'.repeat(5 - full - (half ? 1 : 0))}
    </span>
  );
}

export default function ProductCard({ product, onToast }) {
  const { addToCart } = useCart();
  const { toggleWishlist, isWishlisted } = useWishlist();
  const wishlisted = isWishlisted(product.id);

  const handleAdd = (e) => {
    e.preventDefault();
    addToCart(product);
    onToast?.(`"${product.title.slice(0,30)}..." added to cart`);
  };

  const handleWishlist = (e) => {
    e.preventDefault();
    toggleWishlist(product);
    onToast?.(wishlisted ? 'Removed from wishlist' : '♡ Added to wishlist');
  };

  const discount = product.originalPrice
    ? Math.round((1 - product.price / product.originalPrice) * 100)
    : 0;

  return (
    <Link to={`/product/${product.id}`} className="product-card fade-in">
      {/* Badge */}
      {product.badge && (
        <span className={`badge ${product.badge === 'Prime' ? 'prime' : product.badge === 'Deal' ? 'deal' : 'sale'}`}>
          {product.badge}
        </span>
      )}

      {/* Wishlist button */}
      <button
        className={`wishlist-btn ${wishlisted ? 'active' : ''}`}
        onClick={handleWishlist}
        aria-label="Toggle wishlist"
      >
        {wishlisted ? '♥' : '♡'}
      </button>

      {/* Image */}
      <div className="card-image-wrap">
        <img src={product.image} alt={product.title} loading="lazy" />
      </div>

      {/* Info */}
      <div className="card-body">
        <h3 className="card-title">{product.title}</h3>

        <div className="card-rating">
          <Stars rating={product.rating} />
          <span className="rating-count">{product.reviews.toLocaleString()}</span>
        </div>

        <div className="card-price">
          <span className="price">${product.price.toFixed(2)}</span>
          {product.originalPrice && (
            <>
              <span className="original">${product.originalPrice.toFixed(2)}</span>
              {discount > 0 && <span className="discount-pct">-{discount}%</span>}
            </>
          )}
        </div>

        <div className="card-prime">
          <span className="prime-badge">✓ prime</span>
          <span className="free-delivery">FREE Delivery</span>
        </div>

        <button className="btn-add-cart" onClick={handleAdd}>
          Add to Cart
        </button>
      </div>
    </Link>
  );
}
