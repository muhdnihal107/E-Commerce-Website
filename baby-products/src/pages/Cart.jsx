import React, { useContext } from 'react';
import { CartContext } from '../context/CartContext';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import Footer from '../components/Footer';


const Cart = () => {
  const { cart,calculateTotal, removeFromCart, clearCart, increaseQuantity, decreaseQuantity } = useContext(CartContext);
const {subTotal,tax,total} = calculateTotal();
const navigate = useNavigate();

const handleBtn = ()=>{
  navigate('/checkout');
};
  
  return (
    <>
    
    <div className="cart-sec">
      <h1 className="cart-head">Your Cart</h1>
      {cart.length === 0 ? (
        <p className="empty-cart-message">Your cart is empty</p>
      ) : (
        cart.map((item) => (
          <div key={item.id} className="cart-product-con">
            <div className="cart-productcard">
              <img src={item.image} alt={item.name} className="product-image" />
              <div className="product-details">
                <h2 className="product-name">{item.name}</h2>
                <p className="product-price">
                  <strong>Price: ₹{item.price * item.quantity}</strong>
                </p>
                <div className="quantity-controls">
                  <button className="quantity-dec-btn" onClick={() => decreaseQuantity(item.id)}>-</button>
                  <p className="product-quantity">{item.quantity}</p>
                  <button className="quantity-inc-btn" onClick={() => increaseQuantity(item.id)}>+</button>
                </div>
              </div>
              <button className="remove-btn" onClick={() => removeFromCart(item.id)}>Remove</button>
            </div>
          </div>
        ))
      )}
      {cart.length > 0 && (
        <div className="clear-cart">
          <button className="clear-cart-btn" onClick={clearCart}>Clear Cart</button>
        </div>
      )}
      
      <div className='cart-total-bill'>
        <h1>Cart totals</h1>
        <p>Subtotal: ₹{subTotal.toFixed(2)}</p>
        <p>tax  ₹{tax.toFixed(1)}</p>
        <p> total ₹{total.toFixed(2)}</p>
           <button className='cart-checkout-btn' onClick={handleBtn}>Proceed to Checkout</button>
      </div>
      
    </div>
    <Footer/>
    </>
  );
};

export default Cart;
