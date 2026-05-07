import React from 'react';
import { Link } from 'react-router-dom';
import { useWishlist, useCart } from '../context/ShopContext';
import './Wishlist.css';

export default function Wishlist({ onToast }) {
  const { wishlist, toggleWishlist } = useWishlist();
  const { addToCart } = useCart();

  if (wishlist.length === 0) {
    return (
      <div className="wishlist-empty">
        <div className="empty-icon">♡</div>
        <h2>Your wishlist is empty</h2>
        <p>Save items you love for later</p>
        <Link to="/products" className="btn-primary">Browse Products</Link>
      </div>
    );
  }

  return (
    <div className="wishlist-page">
      <div className="container">
        <h1 className="wishlist-title">♡ My Wishlist ({wishlist.length})</h1>
        <div className="wishlist-grid">
          {wishlist.map(item => (
            <div key={item.id} className="wishlist-item">
              <Link to={`/product/${item.id}`}>
                <img src={item.image} alt={item.title} />
              </Link>
              <div className="wishlist-info">
                <Link to={`/product/${item.id}`} className="wishlist-item-title">{item.title}</Link>
                <div className="wishlist-price">${item.price.toFixed(2)}</div>
                <div className="wishlist-actions">
                  <button
                    className="btn-primary"
                    onClick={() => { addToCart(item); onToast?.(`"${item.title.slice(0,25)}..." added to cart`); }}
                  >
                    Add to Cart
                  </button>
                  <button
                    className="btn-remove-wish"
                    onClick={() => { toggleWishlist(item); onToast?.('Removed from wishlist'); }}
                  >
                    Remove ✕
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
