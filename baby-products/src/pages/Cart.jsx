import React, { useContext } from 'react'
import { CartContext } from '../context/CartContext'

const Cart = () => {
  const {cart ,removeFromCart, clearCart,increaseQuantity,decreaseQuantity} = useContext(CartContext);
  return (
    <div className='cart-sec'>
      <h1 className='cart-head'>Cart</h1>
      {cart.length == 0?(<p>Your cart is empty</p>):(
        cart.map((item)=>(
          <div className='cart-product-con'>
          <div key={item.id} className='cart-productcard'>
            <img src={item.image} alt={item.name} />
            <h1>{item.name}</h1>
            <p className='cart-product-price'><strong>Price:{item.price * item.quantity}</strong></p>
            <div>
              <p>Quantity:{item.quantity}</p>
              <button onClick={()=>increaseQuantity(item.id)}>+</button>
              <button onClick={()=>decreaseQuantity(item.id)}>-</button>
            </div>
            
            <button onClick={()=>removeFromCart(item.id)}>Remove Item</button>
          </div>
          <button onClick={clearCart}>Clear Cart</button>
          </div>
        ))
      )}
      

    </div>
  )
}

export default Cart