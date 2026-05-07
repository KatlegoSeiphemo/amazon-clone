import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/ShopContext';
import './Cart.css';

export default function Cart({ onToast }) {
  const { cart, removeFromCart, updateQty, total, clearCart } = useCart();
  const navigate = useNavigate();

  if (cart.length === 0) {
    return (
      <div className="cart-empty">
        <div className="cart-empty-icon">🛒</div>
        <h2>Your cart is empty</h2>
        <p>Looks like you haven't added any items yet.</p>
        <Link to="/products" className="btn-primary">Continue Shopping</Link>
      </div>
    );
  }

  const handleCheckout = () => {
    navigate('/checkout');
  };

  return (
    <div className="cart-page">
      <div className="container">
        <h1 className="cart-title">Shopping Cart</h1>

        <div className="cart-layout">
          {/* Items */}
          <div className="cart-items">
            <div className="cart-header-row">
              <span>Price</span>
            </div>

            {cart.map(item => (
              <div key={item.id} className="cart-item">
                <Link to={`/product/${item.id}`} className="item-image">
                  <img src={item.image} alt={item.title} />
                </Link>

                <div className="item-info">
                  <Link to={`/product/${item.id}`} className="item-title">{item.title}</Link>
                  <div className="item-stock">In Stock</div>
                  <div className="item-prime">✓ Eligible for FREE Delivery</div>

                  <div className="item-controls">
                    {/* Quantity selector */}
                    <div className="qty-controls">
                      <button onClick={() => updateQty(item.id, item.quantity - 1)}>−</button>
                      <span>{item.quantity}</span>
                      <button onClick={() => updateQty(item.id, item.quantity + 1)}>+</button>
                    </div>

                    <span className="divider-v">|</span>
                    <button
                      className="item-action-btn"
                      onClick={() => { removeFromCart(item.id); onToast?.('Item removed from cart'); }}
                    >
                      Delete
                    </button>
                    <span className="divider-v">|</span>
                    <button className="item-action-btn">Save for later</button>
                  </div>
                </div>

                <div className="item-price">
                  <span className="price">${(item.price * item.quantity).toFixed(2)}</span>
                  {item.quantity > 1 && (
                    <span className="unit-price">(${item.price.toFixed(2)} each)</span>
                  )}
                </div>
              </div>
            ))}

            <div className="cart-subtotal-row">
              Subtotal ({cart.reduce((s, i) => s + i.quantity, 0)} items):&nbsp;
              <strong>${total.toFixed(2)}</strong>
            </div>

            <button
              className="btn-clear"
              onClick={() => { clearCart(); onToast?.('Cart cleared'); }}
            >
              🗑 Clear Cart
            </button>
          </div>

          {/* Order summary */}
          <div className="order-summary">
            <div className="summary-card">
              <div className="summary-prime">
                <span>✓</span>
                <span>Your order qualifies for FREE delivery!</span>
              </div>

              <div className="summary-subtotal">
                Subtotal ({cart.reduce((s, i) => s + i.quantity, 0)} items):&nbsp;
                <strong>${total.toFixed(2)}</strong>
              </div>

              <div className="summary-fees">
                <div className="fee-row"><span>Shipping</span><span className="free">FREE</span></div>
                <div className="fee-row"><span>Estimated tax</span><span>${(total * 0.15).toFixed(2)}</span></div>
              </div>

              <div className="summary-total">
                <span>Order Total</span>
                <span>${(total * 1.15).toFixed(2)}</span>
              </div>

              <button className="btn-checkout" onClick={handleCheckout}>
                Proceed to Checkout
              </button>

              <Link to="/products" className="continue-shopping">
                ← Continue Shopping
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
