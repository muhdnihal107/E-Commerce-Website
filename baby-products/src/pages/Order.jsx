import React, { useContext } from 'react'
import { OrderContext } from '../context/OrderContext';

const Order = () => {
const {orders} = useContext(OrderContext);
if(orders.length === 0){
  return <p>no order Available. place an order</p>
}
const latestOrder = orders[orders.length -1];
  return (
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
                  Product ID: {product.productId} | Quantity: {product.quantity}
                </li>
              ))}
            </ul>
          </div>
  
          <div className="shipping-info">
            <h2>Shipping Information:</h2>
            <p>
              <strong>Name:</strong> {latestOrder.shippingInfo.firstName} {latestOrder.shippingInfo.lastName}
            </p>
            <p>
              <strong>Phone:</strong> {latestOrder.shippingInfo.phoneNumber}
            </p>
            <p>
              <strong>Email:</strong> {latestOrder.shippingInfo.email}
            </p>
            <p>
              <strong>Address:</strong> {latestOrder.shippingInfo.address}, {latestOrder.shippingInfo.city}, {latestOrder.shippingInfo.state} - {latestOrder.shippingInfo.pincode}
            </p>
          </div>
  
          <div className="payment-info">
            <h2>Payment Information:</h2>
            <p>
              <strong>Payment Method:</strong> {latestOrder.paymentInfo.paymentMethod}
            </p>
            {latestOrder.paymentInfo.paymentMethod === 'creditCard' && (
              <p>
                <strong>Card Number:</strong> **** **** **** {latestOrder.paymentInfo.cardNumber.slice(-4)}
              </p>
            )}
            {latestOrder.paymentInfo.paymentMethod === 'upi' && (
              <p>
                <strong>UPI ID:</strong> {latestOrder.paymentInfo.upiId}
              </p>
            )}
            {latestOrder.paymentInfo.paymentMethod === 'netBanking' && (
              <p>
                <strong>Bank:</strong> {latestOrder.paymentInfo.bank}
              </p>
            )}
          </div>
  
          <div className="order-total">
            <h2>Total Amount: ₹{latestOrder.totalAmount}</h2>
          </div>
        </div>
      </div>
    );
  
};

export default Order