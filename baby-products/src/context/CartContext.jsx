


// import React, { createContext, useContext, useEffect, useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { AuthContext } from './AuthContext';
// import axios from 'axios';

// export const CartContext = createContext();

// const BASE_URL = 'http://localhost:4000';

// const CartProvider = ({ children }) => {
//   const { user, isAuthenticated } = useContext(AuthContext);
//   const [cart, setCart] = useState([]);
//   const navigate = useNavigate();

//   // Fetch the user's cart when component mounts
//   useEffect(() => {
//     const fetchCart = async () => {
//       if (user?.id) {
//         try {
//           const response = await axios.get(`${BASE_URL}/users/${user.id}`);
//           setCart(response.data.cart || []); // Fetch the cart directly from user data
//         } catch (error) {
//           console.error('Error fetching cart:', error);
//         }
//       }
//     };

//     fetchCart();
//   }, [user]);

//   // Save the user's cart whenever it changes
//   useEffect(() => {
//     const saveCart = async () => {
//       if (user && cart.length > 0) {
//         try {
//           await axios.patch(`${BASE_URL}/users/${user.id}`, {
//             cart: cart, // Update the user's cart in the database
//           });
//         } catch (error) {
//           console.error('Error saving cart:', error);
//         }
//       }
//     };

//     saveCart();
//   }, [cart, user]);

//   const calculateTotal = () => {
//     const subTotal = cart.reduce((total, item) => total + item.price * item.quantity, 0);
//     const tax = subTotal * 0.05;
//     const total = subTotal + tax;
//     return { subTotal, tax, total };
//   };

//   const addToCart = (product) => {
//     if (!isAuthenticated) {
//       alert('Please log in to add items to your cart!');
//       return;
//     }

//     setCart((prevCart) => {
//       const existItem = prevCart.find((item) => item.id === product.id);
//       if (existItem) {
//         return prevCart.map((item) =>
//           item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
//         );
//       } else {
//         return [...prevCart, { ...product, quantity: 1 }];
//       }
//     });
//   };

//   const removeFromCart = async (productId) => {
//     setCart((prevCart) => {
//       const updatedCart = prevCart.filter((item) => item.id !== productId);
//       if (user) {
//         axios.patch(`${BASE_URL}/users/${user.id}`, {
//           cart: updatedCart,
//         });
//       }
//       return updatedCart;
//     });
//   };

//   const clearCart = async () => {
//     setCart([]);
//     if (user) {
//       await axios.patch(`${BASE_URL}/users/${user.id}`, {
//         cart: [],
//       });
//     }
//   };

//   const increaseQuantity = async (productId) => {
//     setCart((prevCart) => {
//       const updatedCart = prevCart.map((item) =>
//         item.id === productId ? { ...item, quantity: item.quantity + 1 } : item
//       );
//       if (user) {
//         axios.patch(`${BASE_URL}/users/${user.id}`, {
//           cart: updatedCart,
//         });
//       }

//       return updatedCart;
//     });
//   };

//   const decreaseQuantity = async (productId) => {
//     setCart((prevCart) => {
//       const updatedCart = prevCart.map((item) =>
//         item.id === productId && item.quantity > 1
//           ? { ...item, quantity: item.quantity - 1 }
//           : item
//       );
//       if (user) {
//         axios.patch(`${BASE_URL}/users/${user.id}`, {
//           cart: updatedCart,
//         });
//       }

//       return updatedCart;
//     });
//   };

//   return (
//     <CartContext.Provider
//       value={{
//         cart,
//         calculateTotal,
//         addToCart,
//         removeFromCart,
//         clearCart,
//         increaseQuantity,
//         decreaseQuantity,
//       }}
//     >
//       {children}
//     </CartContext.Provider>
//   );
// };

// export default CartProvider;


import React, { createContext, useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from './AuthContext';
import axios from 'axios';

export const CartContext = createContext();

const BASE_URL = 'http://localhost:4000';

const CartProvider = ({ children }) => {
  const { user, isAuthenticated } = useContext(AuthContext);
  const [cart, setCart] = useState([]);
  const navigate = useNavigate();

  
  useEffect(() => {
    const fetchCart = async () => {
      if (user?.id) {
        try {
          const response = await axios.get(`${BASE_URL}/users/${user.id}`);
          setCart(response.data.cart || []); 
        } catch (error) {
          console.error('Error fetching cart:', error);
        }
      } else {
        setCart([]); 
      }
    };

    fetchCart();
  }, [user]);

  useEffect(() => {
    const saveCart = async () => {
      if (user) { 
        try {
          await axios.patch(`${BASE_URL}/users/${user.id}`, {
            cart: cart, 
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
    setCart((prevCart) => {
      const updatedCart = prevCart.filter((item) => item.id !== productId);
      if (user) {
        axios.patch(`${BASE_URL}/users/${user.id}`, {
          cart: updatedCart,
        });
      }
      return updatedCart;
    });
  };

  const clearCart = async () => {
    setCart([]);
    if (user) {
      await axios.patch(`${BASE_URL}/users/${user.id}`, {
        cart: [],
      });
    }
  };

  const increaseQuantity = async (productId) => {
    setCart((prevCart) => {
      const updatedCart = prevCart.map((item) =>
        item.id === productId ? { ...item, quantity: item.quantity + 1 } : item
      );
      if (user) {
        axios.patch(`${BASE_URL}/users/${user.id}`, {
          cart: updatedCart,
        });
      }

      return updatedCart;
    });
  };

  const decreaseQuantity = async (productId) => {
    setCart((prevCart) => {
      const updatedCart = prevCart.map((item) =>
        item.id === productId && item.quantity > 1
          ? { ...item, quantity: item.quantity - 1 }
          : item
      );
      if (user) {
        axios.patch(`${BASE_URL}/users/${user.id}`, {
          cart: updatedCart,
        });
      }

      return updatedCart;
    });
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


