import React, { useContext, useEffect, useState } from 'react'
import { OrderContext } from '../context/OrderContext';
import axios from 'axios';
import { CartContext } from '../context/CartContext';
import Footer from '../components/Footer';

const Order = () => {
const [latestOrder,setLatestOrder] = useState([]);
const [loading, setLoading] = useState(true); 
const [error, setError] = useState(null); 

const BASE_URL = 'http://localhost:4000/orders';

useEffect(() => {

  const fetchOrders = async () => {
    try {
      const response = await axios.get(BASE_URL); 
      const orders = response.data;

      if (orders.length > 0) {
        const latestOrder = orders[orders.length - 1]; 
        setLatestOrder(latestOrder);
      }
    } catch (err) {
      console.error('Error fetching orders:', err);
      setError('Failed to load orders.');
    } finally {
      setLoading(false);
    }
  };

  fetchOrders(); 
}, []);

if (loading) {
  return <p>Loading order details...</p>;
}

if (error) {
  return <p>{error}</p>;
}

if (!latestOrder) {
  return <p>No orders available. Please place an order.</p>;
}
  return (
    <>
      <div className="order-summary">
        <h1>Order Summary</h1>
        <div className="order-summary-details">
          <h3>Order ID: {latestOrder.orderId}</h3>
          <h3>Status: {latestOrder.status}</h3>
          <h3>Order Date: {latestOrder.orderDate}</h3>
  
          <div className="order-products">
            <h2>Products:</h2>
            <ul>
              {latestOrder.products.map((product, index) => (
                <li key={index}>
                  Product Name: {product.productName} | Quantity: {product.quantity}
                </li>
              ))}
            </ul>
          </div>
  
          <div className="shipping-info">
            <h2>Shipping Information:</h2>
            <p>
              <strong>Name:</strong> {latestOrder.firstName} {latestOrder.lastName}
            </p>
            <p>
              <strong>Phone:</strong> {latestOrder.phoneNumber}
            </p>
            <p>
              <strong>Email:</strong> {latestOrder.email}
            </p>
            <p>
              <strong>Address:</strong> {latestOrder.address}, {latestOrder.city}, {latestOrder.state} - {latestOrder.pincode}
            </p>
          </div>
  
          <div className="payment-info">
            <h2>Payment Information:</h2>
            <p>
              <strong>Payment Method:</strong> {latestOrder.paymentMethod}
            </p>
            {latestOrder.paymentMethod === 'creditCard' && (
              <p>
                <strong>Card Number:</strong> **** **** **** {latestOrder.cardNumber.slice(-4)}
              </p>
            )}
            {latestOrder.paymentMethod === 'upi' && (
              <p>
                <strong>UPI ID:</strong> {latestOrder.upiId}
              </p>
            )}
            {latestOrder.paymentMethod === 'netBanking' && (
              <p>
                <strong>Bank:</strong> 
              </p>
            )}
          </div>
  
          <div className="order-total">
            <h2>Subtotal: ₹{(latestOrder.subtotal).toFixed(2)}</h2>
            <h2>Tax: ₹{(latestOrder.tax).toFixed(2)}</h2>
            <h2>Total Amount: ₹{(latestOrder.totalAmount).toFixed(2)}</h2>
          </div>
        </div>
      </div>
     <Footer/>
      </>
    );
  
};

export default Order