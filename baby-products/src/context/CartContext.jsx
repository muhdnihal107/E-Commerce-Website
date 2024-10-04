
import React, { createContext, useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { AuthContext } from './AuthContext';
import axios from 'axios';

export const CartContext = createContext();

const BASE_URL = 'http://localhost:4000';

const CartProvider = ({children}) => {
  const { isAuthenticated } = useContext(AuthContext);
  const [cart, setCart] = useState([]);
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  // Fetch the user's cart when component mounts
  useEffect(() => {
    const fetchCart = async () => {
      if (user) {
        try {
          const response = await axios.get(`${BASE_URL}/users/${user.id}`);
          if (response.data.cart) {
            setCart(response.data.cart); // Fetch the cart directly from user data
          } else {
            setCart([]); // Set empty cart if none exists
          }
        } catch (error) {
          console.error('Error fetching cart:', error);
        }
      }
    };

    fetchCart();
  }, [user]);

  // Save the user's cart whenever it changes
  useEffect(() => {
    const saveCart = async () => {
      if (user && cart.length > 0) {
        try {
          await axios.patch(`${BASE_URL}/users/${user.id}`, {
            cart: cart, // Update the user's cart in the database
          });
        } catch (error) {
          console.error('Error saving cart:', error);
        }
      }
    };

    saveCart();
  }, [cart, user]);

  const calculateTotal = () => {
    const subTotal = cart.reduce((total, item) => total + item.price * item.quantity, 0);
    const tax = subTotal * 0.05;
    const total = subTotal + tax;
    return { subTotal, tax, total };
  };

  const addToCart = (product) => {
    if (!isAuthenticated) {
      alert('Please log in to add items to your cart!');
      return;
    }

    setCart((prevCart) => {
      const existItem = prevCart.find((item) => item.id === product.id);
      if (existItem) {
        return prevCart.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      } else {
        return [...prevCart, { ...product, quantity: 1 }];
      }
    });
  };

  const removeFromCart = async (productId) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== productId));

    if (user) {
      try {
        const response = await axios.get(`${BASE_URL}/users/${user.id}`);
        const updatedCart = response.data.cart.filter((item) => item.id !== productId);

        await axios.patch(`${BASE_URL}/users/${user.id}`, {
          cart: updatedCart,
        });
      } catch (error) {
        console.error('Error removing item from cart:', error);
      }
    }
  };

  const clearCart = async () => {
    setCart([]);

    if (user) {
      try {
        await axios.patch(`${BASE_URL}/users/${user.id}`, {
          cart: [],
        });
      } catch (error) {
        console.error('Error clearing cart:', error);
      }
    }
  };

  const increaseQuantity = async (productId) => {
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.id === productId ? { ...item, quantity: item.quantity + 1 } : item
      )
    );

    if (user) {
      try {
        const response = await axios.get(`${BASE_URL}/users/${user.id}`);
        const updatedCart = response.data.cart.map((item) =>
          item.id === productId ? { ...item, quantity: item.quantity + 1 } : item
        );

        await axios.patch(`${BASE_URL}/users/${user.id}`, {
          cart: updatedCart,
        });
      } catch (error) {
        console.error('Error increasing quantity:', error);
      }
    }
  };

  const decreaseQuantity = async (productId) => {
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.id === productId && item.quantity > 1
          ? { ...item, quantity: item.quantity - 1 }
          : item
      )
    );

    if (user) {
      try {
        const response = await axios.get(`${BASE_URL}/users/${user.id}`);
        const updatedCart = response.data.cart.map((item) =>
          item.id === productId && item.quantity > 1
            ? { ...item, quantity: item.quantity - 1 }
            : item
        );

        await axios.patch(`${BASE_URL}/users/${user.id}`, {
          cart: updatedCart,
        });
      } catch (error) {
        console.error('Error decreasing quantity:', error);
      }
    }
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        calculateTotal,
        addToCart,
        removeFromCart,
        clearCart,
        increaseQuantity,
        decreaseQuantity,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export default CartProvider;
