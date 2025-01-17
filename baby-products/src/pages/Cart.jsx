import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Footer from '../components/Footer';
import { fetchCart, updateCartItemQuantity, clearCart } from '../redux/slices/cartSlice';

const Cart = () => {
  const dispatch = useDispatch();
  const { items,totalItems,totalPrice, status, error } = useSelector((state) => state.cart);
  const navigate = useNavigate();

  useEffect(() => {
      dispatch(fetchCart());
  }, [dispatch]);

console.log(items);
  // Navigate to checkout page
  const handleBtn = () => {
    navigate('/checkout');
  };

  // Handle clear cart action
  const handleClearCart = () => {
    dispatch(clearCart());
  };

  // Handle quantity update action
  const handleQuantityUpdate = (itemId, action) => {
    const { product, quantity } = items.find((item) => item.id === itemId);
    dispatch(updateCartItemQuantity({ pk: itemId, action, product_id: product.id }));
  };

  // Handle item removal
  const handleRemoveItem = (itemId) => {
    // Add your logic to remove an item from the cart if needed
  };

  return (
    <>
      <div className="cart-sec">
        <h1 className="cart-head">Your Cart</h1>
        {status === 'loading' ? (
          <p>Loading cart...</p>
        ) : items?.length > 0 ? (
          items.map((item) => (
            <div key={item.id} className="cart-product-con">
              <div className="cart-productcard">
                <img
                  src={item.product.image}
                  alt={item.product.name}
                  className="product-image"
                />
                <div className="product-details">
                  <h2 className="product-name">{item.product.name}</h2>
                  <p className="product-price">
                    <strong>Price: ₹{item.product.price * item.quantity}</strong>
                  </p>
                  <div className="quantity-controls">
                    <button
                      className="quantity-dec-btn"
                      onClick={() => handleQuantityUpdate(item.id, 'decrement')}
                    >
                      -
                    </button>
                    <p className="product-quantity">{item.quantity}</p>
                    <button
                      className="quantity-inc-btn"
                      onClick={() => handleQuantityUpdate(item.id, 'increment')}
                    >
                      +
                    </button>
                  </div>
                </div>
                <button className="remove-btn" onClick={() => handleRemoveItem(item.id)}>
                  Remove
                </button>
              </div>
            </div>
          ))
        ) : (
          <p className="empty-cart-message">Your cart is empty</p>
        )}

        {items?.length > 0 && (
          <div className="clear-cart">
            <button className="clear-cart-btn" onClick={handleClearCart}>
              Clear Cart
            </button>
          </div>
        )}

        <div className="cart-total-bill">
          <h1>Cart totals</h1>
          <p>Subtotal: ₹{items?.total_price || 0}</p>
          <p>Tax: ₹{(items?.total_price * 0.1) || 0}</p> {/* Example tax calculation */}
          <p>Total: ₹{(items?.total_price * 1.1) || 0}</p> {/* Example total price */}
          <button className="cart-checkout-btn" onClick={handleBtn}>
            Proceed to Checkout
          </button>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Cart;

