import React, { useContext, useState } from 'react'
import { useParams } from 'react-router-dom'
import { OrderContext } from '../../context/OrderContext';

const OrderView = () => {
    const {totalOrders,fetchOrder} = useContext(OrderContext);
    const {id} = useParams();

    const order = totalOrders.find(item => item.orderId == parseInt(id));
  return (
    <div>
        <div className="mt-8 bg-white p-6 rounded-lg shadow-md">
      <h3 className="text-xl font-semibold text-gray-700 mb-4">Order Details</h3>
      <div className="grid grid-cols-2 gap-4">
        <p><strong>Order ID:</strong> {order.orderId}</p>
        <p><strong>Customer Name:</strong> {order.firstName} {order.lastName}</p>
        <p><strong>Phone Number:</strong> {order.phoneNumber}</p>
        <p><strong>Payment Details:</strong> {order.paymentMethod}::{order.cardNumber}</p>
        <p><strong>Order Date:</strong> {order.orderDate}</p>
        <p><strong>Status:</strong> {order.status}</p>
        <p><strong>SubTotal:</strong> ₹{order.subtotal}</p>
        <p><strong>Total Amount:</strong> ₹{order.totalAmount}</p>
      </div>
      <h4 className="text-lg font-medium text-gray-700 mt-6">Products:</h4>
      <ul className="space-y-4 mt-4">
        {order.products.map((item) => (
          <li key={item.productId} className="flex items-center space-x-4 bg-gray-50 p-4 rounded-lg shadow-sm">
            <img src={item.image} alt="product" className="w-16 h-16 object-cover rounded" />
            <div>
              <p className="text-gray-700 font-semibold">Quantity: {item.quantity}</p>
              <p className="text-gray-700">Price: ₹{item.price}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
    </div>
  )
}

export default OrderView