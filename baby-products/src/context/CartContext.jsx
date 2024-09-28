import React, { createContext, useState } from 'react'
import { useNavigate } from 'react-router-dom';


export const CartContext = createContext();

const CartProvider = ({children}) => {
    const [cart,setCart] = useState([]);
    const navigate = useNavigate();
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
       navigate('/cart')
   };
   const removeFromCart = (productId)=>{
         setCart((prevCart)=>prevCart.filter((item)=> item.id !== productId)
         );
   };
   const clearCart=()=>{
    setCart([]);
   };
   
   const increaseQuantity = (productId)=>{
        setCart((prevCart)=>
        prevCart.map((item)=>
           item.id === productId ? 
        {...item,quantity: item.quantity + 1}
        : item
        ));
   };

   const decreaseQuantity = (productId)=>{
    setCart((prevCart)=>
    prevCart.map((item)=>
       item.id === productId && item.quantity > 1 ? 
    {...item,quantity: item.quantity - 1}
    : item
    ));
};

  return (
    <CartContext.Provider value={{cart,addToCart,removeFromCart,clearCart,increaseQuantity,decreaseQuantity}}>
        {children}
    </CartContext.Provider>
  )
}

export default CartProvider