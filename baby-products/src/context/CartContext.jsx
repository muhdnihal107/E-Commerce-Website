import React, { createContext, useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { AuthContext } from './AuthContext';
import axios from 'axios';

export const CartContext = createContext();
const BASE_URL = 'http://localhost:3000';

const CartProvider = ({children}) => {
    const [cart,setCart] = useState([]);
    const {user} =useContext(AuthContext);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchCart = async () => {
            if (user) {
                try {
                    const response = await axios.get(`${BASE_URL}/carts`, {
                        params: { userId: user.id } 
                    });
                    if (response.data.length > 0) {
                        setCart(response.data[0].products); 
                    } else {
                        setCart([]); 
                    }
                } catch (error) {
                    console.error('Error fetching cart:', error);
                }
            }
        };

        fetchCart();
    }, [user]);

    useEffect(() => {
        const saveCart = async () => {
            if (user && cart.length > 0) {
                try {
                    const existingCart = await axios.get(`${BASE_URL}/carts`, {
                        params: { userId: user.id } 
                    });

                    if (existingCart.data.length > 0) {
                        await axios.patch(`${BASE_URL}/carts/${existingCart.data[0].id}`, {
                            products: cart
                        });
                    } else {
                        await axios.post(`${BASE_URL}/carts`, {
                            userId: user.id,
                            products: cart
                        });
                    }
                } catch (error) {
                    console.error('Error saving cart:', error);
                }
            }
        };

        saveCart();
    }, [cart, user]);

   

    const calculateTotal =()=>{
        const subTotal = cart.reduce((total,item)=> total + item.price * item.quantity,0);
        const tax = subTotal * 0.05;
        const total = subTotal + tax;
        return { subTotal, tax, total}
    }

   const addToCart=(product)=>{
       setCart((prevCart)=>{
        const existItem = prevCart.find((item)=> item.id === product.id);
        if(existItem){
            return prevCart.map((item)=>
                item.id === product.id ? 
                {...item, quantity: item.quantity +1}: item
            );
        } else {
            return  [...prevCart,{...product, quantity: 1}];
             
        }
          ;
       });
      
   };
   const removeFromCart = async (productId) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== productId)); 
  
    if (user) {
      try {
        const existingCart = await axios.get(`${BASE_URL}/carts`, {
          params: { userId: user.id }
        });
  
        if (existingCart.data.length > 0) {
          const updatedProducts = existingCart.data[0].products.filter(
            (item) => item.id !== productId
          );
          await axios.patch(`${BASE_URL}/carts/${existingCart.data[0].id}`, {
            products: updatedProducts
          });
        }
      } catch (error) {
        console.error('Error removing item from cart:', error);
      }
    }
  };
  
   const clearCart = async () => {
    setCart([]); 
  
    if (user) {
      try {
        
        const existingCart = await axios.get(`${BASE_URL}/carts`, {
          params: { userId: user.id }
        });
  
        if (existingCart.data.length > 0) {
          
          await axios.patch(`${BASE_URL}/carts/${existingCart.data[0].id}`, {
            products: []
          });
        }
      } catch (error) {
        console.error('Error clearing cart:', error);
      }
    }
  };
  
   
  const increaseQuantity = async (productId) => {
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.id === productId
          ? { ...item, quantity: item.quantity + 1 }
          : item
      )
    );
  
    if (user) {
      try {
        const existingCart = await axios.get(`${BASE_URL}/carts`, {
          params: { userId: user.id }
        });
  
        if (existingCart.data.length > 0) {
          const updatedProducts = existingCart.data[0].products.map((item) =>
            item.id === productId
              ? { ...item, quantity: item.quantity + 1 }
              : item
          );
  
        
          await axios.patch(`${BASE_URL}/carts/${existingCart.data[0].id}`, {
            products: updatedProducts
          });
        }
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
        const existingCart = await axios.get(`${BASE_URL}/carts`, {
          params: { userId: user.id }
        });
  
        if (existingCart.data.length > 0) {
          const updatedProducts = existingCart.data[0].products.map((item) =>
            item.id === productId && item.quantity > 1
              ? { ...item, quantity: item.quantity - 1 }
              : item
          );
  
          await axios.patch(`${BASE_URL}/carts/${existingCart.data[0].id}`, {
            products: updatedProducts
          });
        }
      } catch (error) {
        console.error('Error decreasing quantity:', error);
      }
    }
  };
  

  return (
    <CartContext.Provider value={{cart,calculateTotal ,addToCart,removeFromCart,clearCart,increaseQuantity,decreaseQuantity}}>
        {children}
    </CartContext.Provider>
  )
}

export default CartProvider