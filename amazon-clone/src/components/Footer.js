import React from 'react';
import { Link } from 'react-router-dom';
import './Footer.css';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-top" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
        Back to top
      </div>
      <div className="footer-mid">
        <div className="container footer-grid">
          <div className="footer-col">
            <h4>Get to Know Us</h4>
            <a href="#!">Careers</a>
            <a href="#!">Blog</a>
            <a href="#!">About Amazon Clone</a>
            <a href="#!">Investor Relations</a>
          </div>
          <div className="footer-col">
            <h4>Make Money with Us</h4>
            <a href="#!">Sell products on Amazon Clone</a>
            <a href="#!">Affiliate Program</a>
            <a href="#!">Advertise Your Products</a>
          </div>
          <div className="footer-col">
            <h4>Amazon Clone Payment</h4>
            <a href="#!">Amazon Clone Visa</a>
            <a href="#!">Shop with Points</a>
            <a href="#!">Reload Your Balance</a>
          </div>
          <div className="footer-col">
            <h4>Let Us Help You</h4>
            <Link to="/account">Your Account</Link>
            <Link to="/cart">Your Orders</Link>
            <a href="#!">Shipping Rates & Policies</a>
            <a href="#!">Returns & Replacements</a>
            <a href="#!">Help</a>
          </div>
        </div>
      </div>
      <div className="footer-bottom">
        <div className="container footer-bottom-content">
          <div className="footer-logo">amazon<span>.clone</span></div>
          <div className="footer-copy">© 2024 Amazon Clone Assignment — Built with React 🚀</div>
          <div className="footer-links">
            <a href="#!">Conditions of Use</a>
            <a href="#!">Privacy Notice</a>
            <a href="#!">Interest-Based Ads</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
