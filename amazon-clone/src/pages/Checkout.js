import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/ShopContext';
import './Checkout.css';

const STEPS = ['Shipping', 'Delivery', 'Payment', 'Confirm'];

export default function Checkout() {
  const { cart, total, clearCart } = useCart();
  const navigate = useNavigate();
  const [step, setStep] = useState(0);
  const [ordered, setOrdered] = useState(false);

  const [form, setForm] = useState({
    name: '', email: '', address: '', city: '', zip: '', country: 'ZA',
    delivery: 'standard',
    card: '', expiry: '', cvv: '',
  });

  const update = (field, val) => setForm(f => ({ ...f, [field]: val }));

  const handleOrder = () => {
    clearCart();
    setOrdered(true);
  };

  if (ordered) {
    return (
      <div className="checkout-success">
        <div className="success-icon">🎉</div>
        <h1>Order Placed!</h1>
        <p>Thanks <strong>{form.name || 'valued customer'}</strong>! Your order is on its way.</p>
        <p className="success-estimate">
          Estimated delivery: {form.delivery === 'express' ? 'Tomorrow' : '3–5 business days'}
        </p>
        <div className="success-order-id">
          Order #{Math.random().toString(36).slice(2, 10).toUpperCase()}
        </div>
        <button className="btn-checkout-primary" onClick={() => navigate('/')}>
          Back to Home
        </button>
      </div>
    );
  }

  if (cart.length === 0 && !ordered) {
    navigate('/cart');
    return null;
  }

  const deliveryCost = form.delivery === 'express' ? 9.99 : 0;
  const tax = total * 0.15;
  const grandTotal = total + deliveryCost + tax;

  return (
    <div className="checkout-page">
      <div className="container">
        <h1 className="checkout-title">Checkout</h1>

        {/* Progress */}
        <div className="checkout-steps">
          {STEPS.map((s, i) => (
            <div key={s} className={`step ${i <= step ? 'active' : ''} ${i < step ? 'done' : ''}`}>
              <div className="step-num">{i < step ? '✓' : i + 1}</div>
              <div className="step-label">{s}</div>
              {i < STEPS.length - 1 && <div className="step-line" />}
            </div>
          ))}
        </div>

        <div className="checkout-grid">
          {/* Form area */}
          <div className="checkout-form-area">
            {step === 0 && (
              <div className="form-section">
                <h2>Shipping Information</h2>
                <div className="form-grid">
                  <div className="form-group full">
                    <label>Full Name *</label>
                    <input value={form.name} onChange={e => update('name', e.target.value)} placeholder="Jane Doe" />
                  </div>
                  <div className="form-group full">
                    <label>Email Address *</label>
                    <input type="email" value={form.email} onChange={e => update('email', e.target.value)} placeholder="jane@example.com" />
                  </div>
                  <div className="form-group full">
                    <label>Street Address *</label>
                    <input value={form.address} onChange={e => update('address', e.target.value)} placeholder="123 Main Street" />
                  </div>
                  <div className="form-group">
                    <label>City *</label>
                    <input value={form.city} onChange={e => update('city', e.target.value)} placeholder="Johannesburg" />
                  </div>
                  <div className="form-group">
                    <label>Postal Code</label>
                    <input value={form.zip} onChange={e => update('zip', e.target.value)} placeholder="2000" />
                  </div>
                  <div className="form-group full">
                    <label>Country</label>
                    <select value={form.country} onChange={e => update('country', e.target.value)}>
                      <option value="ZA">South Africa</option>
                      <option value="US">United States</option>
                      <option value="GB">United Kingdom</option>
                      <option value="AU">Australia</option>
                    </select>
                  </div>
                </div>
              </div>
            )}

            {step === 1 && (
              <div className="form-section">
                <h2>Delivery Option</h2>
                <div className="delivery-options">
                  <label className={`delivery-option ${form.delivery === 'standard' ? 'selected' : ''}`}>
                    <input type="radio" name="delivery" value="standard"
                      checked={form.delivery === 'standard'}
                      onChange={() => update('delivery', 'standard')} />
                    <div className="delivery-info">
                      <div className="delivery-name">Standard Delivery <span className="delivery-free">FREE</span></div>
                      <div className="delivery-eta">3–5 business days</div>
                    </div>
                  </label>
                  <label className={`delivery-option ${form.delivery === 'express' ? 'selected' : ''}`}>
                    <input type="radio" name="delivery" value="express"
                      checked={form.delivery === 'express'}
                      onChange={() => update('delivery', 'express')} />
                    <div className="delivery-info">
                      <div className="delivery-name">Express Delivery <span className="delivery-price">R199 / $9.99</span></div>
                      <div className="delivery-eta">Tomorrow by 8pm 🚀</div>
                    </div>
                  </label>
                </div>
              </div>
            )}

            {step === 2 && (
              <div className="form-section">
                <h2>Payment Details</h2>
                <div className="card-preview">
                  <div className="card-chip">💳</div>
                  <div className="card-number-display">
                    {form.card ? form.card.replace(/\d{4}(?=.)/g, '$& ') : '•••• •••• •••• ••••'}
                  </div>
                  <div className="card-bottom">
                    <span>{form.name || 'CARD HOLDER'}</span>
                    <span>{form.expiry || 'MM/YY'}</span>
                  </div>
                </div>
                <div className="form-grid">
                  <div className="form-group full">
                    <label>Card Number *</label>
                    <input value={form.card}
                      onChange={e => update('card', e.target.value.replace(/\D/g,'').slice(0,16))}
                      placeholder="1234 5678 9012 3456" maxLength={16} />
                  </div>
                  <div className="form-group">
                    <label>Expiry Date</label>
                    <input value={form.expiry}
                      onChange={e => update('expiry', e.target.value)}
                      placeholder="MM/YY" maxLength={5} />
                  </div>
                  <div className="form-group">
                    <label>CVV</label>
                    <input value={form.cvv}
                      onChange={e => update('cvv', e.target.value.replace(/\D/,'').slice(0,3))}
                      placeholder="123" maxLength={3} type="password" />
                  </div>
                </div>
                <p className="secure-note">🔒 Your payment info is securely processed (simulated)</p>
              </div>
            )}

            {step === 3 && (
              <div className="form-section">
                <h2>Order Confirmation</h2>
                <div className="confirm-rows">
                  <div className="confirm-row"><span>Name</span><strong>{form.name}</strong></div>
                  <div className="confirm-row"><span>Address</span><strong>{form.address}, {form.city}</strong></div>
                  <div className="confirm-row"><span>Delivery</span><strong>{form.delivery === 'express' ? 'Express (Tomorrow)' : 'Standard (3–5 days)'}</strong></div>
                  <div className="confirm-row"><span>Payment</span><strong>Card ending ···{form.card.slice(-4) || '????'}</strong></div>
                  <div className="confirm-row"><span>Total</span><strong className="total-confirm">${grandTotal.toFixed(2)}</strong></div>
                </div>
                <div className="confirm-items">
                  {cart.map(item => (
                    <div key={item.id} className="confirm-item">
                      <img src={item.image} alt={item.title} />
                      <span>{item.title.slice(0, 35)}...</span>
                      <span>×{item.quantity}</span>
                      <span>${(item.price * item.quantity).toFixed(2)}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div className="checkout-nav">
              {step > 0 && (
                <button className="btn-back" onClick={() => setStep(s => s - 1)}>← Back</button>
              )}
              {step < 3 ? (
                <button className="btn-checkout-primary" onClick={() => setStep(s => s + 1)}>
                  Continue →
                </button>
              ) : (
                <button className="btn-checkout-primary btn-place-order" onClick={handleOrder}>
                  🛒 Place Order — ${grandTotal.toFixed(2)}
                </button>
              )}
            </div>
          </div>

          {/* Order summary sidebar */}
          <div className="checkout-summary">
            <h3>Order Summary</h3>
            {cart.map(item => (
              <div key={item.id} className="summary-item">
                <img src={item.image} alt={item.title} />
                <div>
                  <div className="summary-item-title">{item.title.slice(0, 28)}...</div>
                  <div className="summary-item-qty">Qty: {item.quantity}</div>
                </div>
                <div className="summary-item-price">${(item.price * item.quantity).toFixed(2)}</div>
              </div>
            ))}
            <div className="summary-lines">
              <div className="summary-line"><span>Subtotal</span><span>${total.toFixed(2)}</span></div>
              <div className="summary-line"><span>Shipping</span><span>{deliveryCost === 0 ? 'FREE' : `$${deliveryCost.toFixed(2)}`}</span></div>
              <div className="summary-line"><span>Tax (15%)</span><span>${tax.toFixed(2)}</span></div>
              <div className="summary-line total-line"><span>Total</span><span>${grandTotal.toFixed(2)}</span></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
