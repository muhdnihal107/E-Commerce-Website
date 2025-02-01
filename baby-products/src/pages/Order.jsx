import React, { useContext, useEffect, useState } from 'react'
import axios from 'axios';
import Footer from '../components/Footer';
import { useDispatch, useSelector } from 'react-redux';
import { fetchOrder } from '../redux/slices/orderSlice';

const Order = () => {
  const dispatch = useDispatch();
  const { order,loading,error} = useSelector((state)=>state.order);

  useEffect(()=>{
    dispatch(fetchOrder());
  },[dispatch])

console.log(order);

  return (
    <>{order !== null ?(
       <div className="order-summary">
        <h1>Order Summary</h1>
        <div className="order-summary-details">
          <h3>Order ID: {order.id}</h3>
          <h3>Status: {order.status}</h3>
          <h3>Order Date: {order.orderDate}</h3>
  
           <div className="order-products">
            <h2>Products:</h2>
            <ul>
              {order.orderitems?.map((item, index) => (
                <li key={index}>
                  Product Name: {item.product.name} | Quantity: {item.quantity}
                </li>
              ))}
            </ul>
          </div>
  
          <div className="shipping-info">
            <h2>Shipping Information:</h2>
            <p>
              <strong>Name:</strong> {order.first_name} {order.last_name}
            </p>
            <p>
              <strong>Phone:</strong> {order.phone_number}
            </p>
            <p>
              <strong>Email:</strong> {order.email}
            </p>
            <p>
              <strong>Address:</strong> {order.address}, {order.state} - {order.pincode}
            </p>
            <p>
              <strong>Status:</strong> {order.status}
            </p>
          </div>
  
          <div className="payment-info">
            <h2>Payment Information:</h2>
            <p>
              <strong>Payment Method:</strong> {order.payment_method}
            </p>
            <p>
              <strong>Payment Status:</strong>{order.payment_status}
            </p>
            
          </div>
  
          <div className="order-total">
            
            <h2>Total Amount: ₹{(order.payment_amount)}</h2>
          </div>
        </div>
      </div> ):(
        <div>
          <p>
            loading
          </p>
        </div>
      )}
     <Footer/>
      </>
    );
  
};

export default Order