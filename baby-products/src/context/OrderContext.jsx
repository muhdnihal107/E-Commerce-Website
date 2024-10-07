import React, { createContext, useContext, useEffect, useState } from 'react'
import { AuthContext } from './AuthContext';
import { CartContext } from './CartContext';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


export const OrderContext = createContext();
const BASE_URL = 'http://localhost:4000';


const OrderProvider = ({ children }) => {
    
const { user,isAuthenticated } = useContext(AuthContext);
const {cart,clearCart,calculateTotal} = useContext(CartContext);
const [orders,setOrder] = useState([]);
const navigate = useNavigate();
const {subTotal,tax,total} = calculateTotal();
const [totalOrders,setTotalOrders] = useState([]);

const fetchOrder = async()=>{
    try{
    const responce = await axios.get(`${BASE_URL}/orders`);
    setTotalOrders(responce.data);
    console.log('fetchOrder',responce.data);
    }
    catch (error){
      console.error('error fetching order:',error);
    }
};

useEffect(()=>{
  fetchOrder();
},[])


const PlaceOrder = async(formData)=>{

    if(!user || cart.length == 0 ){
      alert('!!no user loged in or cart is empty');
      return false;
     }
     const newOrder = {
      orderId: new Date().toString(),
      userId: user.id,
      products: cart.map((items)=>({
          image: items.image,
          productId: items.id,
          quantity:items.quantity,
          price: items.price
      })),
      status: "Pending",
      orderDate: new Date().toISOString().split('T')[0],
      subtotal: subTotal,
      tax: tax,
      totalAmount: total,
      ...formData
     };
  
     try{
      const responce = await axios.post(`${BASE_URL}/orders`,newOrder);
      const savedOrder = responce.data;
      console.log('Order placed:', savedOrder);
      setOrder((prevOrders) => [...prevOrders, savedOrder]);
      clearCart();
      localStorage.setItem('latestOrder', JSON.stringify(savedOrder));
      alert("Order Placed successfully");
      navigate('/order');
      return true;
     }catch (error) {
      console.error("Error placing order:", error);
      return false;
    }
  
   

};






  return (
    <OrderContext.Provider value={{orders,totalOrders,setTotalOrders,PlaceOrder,fetchOrder}}>
        {children}
    </OrderContext.Provider>
  )
}

export default OrderProvider