import React, { createContext, useContext, useReducer, useEffect } from 'react';

const CartContext = createContext();
const WishlistContext = createContext();

function cartReducer(state, action) {
  switch (action.type) {
    case 'ADD_ITEM': {
      const existing = state.find(i => i.id === action.product.id);
      if (existing) {
        return state.map(i =>
          i.id === action.product.id ? { ...i, quantity: i.quantity + 1 } : i
        );
      }
      return [...state, { ...action.product, quantity: 1 }];
    }
    case 'REMOVE_ITEM':
      return state.filter(i => i.id !== action.id);
    case 'UPDATE_QTY':
      if (action.qty <= 0) return state.filter(i => i.id !== action.id);
      return state.map(i => i.id === action.id ? { ...i, quantity: action.qty } : i);
    case 'CLEAR':
      return [];
    default:
      return state;
  }
}

function wishlistReducer(state, action) {
  switch (action.type) {
    case 'TOGGLE':
      return state.find(i => i.id === action.product.id)
        ? state.filter(i => i.id !== action.product.id)
        : [...state, action.product];
    default:
      return state;
  }
}

function loadFromStorage(key, fallback) {
  try {
    const saved = localStorage.getItem(key);
    return saved ? JSON.parse(saved) : fallback;
  } catch { return fallback; }
}

export function CartProvider({ children }) {
  const [cart, dispatch] = useReducer(cartReducer, [], () => loadFromStorage('amazon_cart', []));

  useEffect(() => {
    localStorage.setItem('amazon_cart', JSON.stringify(cart));
  }, [cart]);

  const addToCart = (product) => dispatch({ type: 'ADD_ITEM', product });
  const removeFromCart = (id) => dispatch({ type: 'REMOVE_ITEM', id });
  const updateQty = (id, qty) => dispatch({ type: 'UPDATE_QTY', id, qty });
  const clearCart = () => dispatch({ type: 'CLEAR' });

  const total = cart.reduce((sum, i) => sum + i.price * i.quantity, 0);
  const itemCount = cart.reduce((sum, i) => sum + i.quantity, 0);

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, updateQty, clearCart, total, itemCount }}>
      {children}
    </CartContext.Provider>
  );
}

export function WishlistProvider({ children }) {
  const [wishlist, dispatch] = useReducer(wishlistReducer, [], () => loadFromStorage('amazon_wishlist', []));

  useEffect(() => {
    localStorage.setItem('amazon_wishlist', JSON.stringify(wishlist));
  }, [wishlist]);

  const toggleWishlist = (product) => dispatch({ type: 'TOGGLE', product });
  const isWishlisted = (id) => wishlist.some(i => i.id === id);

  return (
    <WishlistContext.Provider value={{ wishlist, toggleWishlist, isWishlisted }}>
      {children}
    </WishlistContext.Provider>
  );
}

export const useCart = () => useContext(CartContext);
export const useWishlist = () => useContext(WishlistContext);
