import React, { useContext, useEffect, useState } from 'react'
import { OrderContext } from '../../context/OrderContext'

const OrderMangement = () => {
  const {totalOrders,fetchOrder} = useContext(OrderContext);
  const [selectedOrder,setSelectedOrder] = useState(null);

  useEffect(()=>{
    fetchOrder();
  },[]);

  const handleViewBtn = (order)=>{
    setSelectedOrder(order);
  };
  return (
    <div className="p-6 bg-gray-100 min-h-screen">
  <h1 className="text-3xl font-bold text-gray-800 mb-6">Order Management</h1>
  
  <div className="overflow-x-auto bg-white rounded-lg shadow-lg">
    <table className="table-auto w-full text-left">
      <thead className="bg-gray-50">
        <tr>
          <th className="px-4 py-2 text-gray-600">Order Id</th>
          <th className="px-4 py-2 text-gray-600">First Name</th>
          <th className="px-4 py-2 text-gray-600">Last Name</th>
          <th className="px-4 py-2 text-gray-600">Phone Number</th>
          <th className="px-4 py-2 text-gray-600">Payment Method</th>
          <th className="px-4 py-2 text-gray-600">Date</th>
          <th className="px-4 py-2 text-gray-600">Status</th>
          <th className="px-4 py-2 text-gray-600">Product Amount</th>
          <th className="px-4 py-2 text-gray-600">Tax</th>
          <th className="px-4 py-2 text-gray-600">Total Amount</th>
          <th className="px-4 py-2 text-gray-600">Actions</th>
        </tr>
      </thead>
      <tbody>
        {totalOrders.length > 0 ? (
          totalOrders.map((item) => (
            <tr key={item.orderId} className="bg-white border-b hover:bg-gray-100">
              <td className="px-4 py-2">{item.orderId}</td>
              <td className="px-4 py-2">{item.firstName}</td>
              <td className="px-4 py-2">{item.lastName}</td>
              <td className="px-4 py-2">{item.phoneNumber}</td>
              <td className="px-4 py-2">{item.paymentMethod}</td>
              <td className="px-4 py-2">{item.orderDate}</td>
              <td className="px-4 py-2">{item.status}</td>
              <td className="px-4 py-2">₹{item.subtotal}</td>
              <td className="px-4 py-2">₹{item.tax}</td>
              <td className="px-4 py-2">₹{item.totalAmount}</td>
              <td className="px-4 py-2">
                <button onClick={()=>handleViewBtn(item)} className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600 transition duration-200">
                  View
                </button>
              </td>
            </tr>
          ))
        ) : (
          <tr>
            <td colSpan="11" className="text-center py-4 text-gray-500">No Orders Available</td>
          </tr>
        )}
      </tbody>
    </table>
  </div>

  {selectedOrder && (
    <div className="mt-8 bg-white p-6 rounded-lg shadow-md">
      <h3 className="text-xl font-semibold text-gray-700 mb-4">Order Details</h3>
      <div className="grid grid-cols-2 gap-4">
        <p><strong>Order ID:</strong> {selectedOrder.orderId}</p>
        <p><strong>Customer Name:</strong> {selectedOrder.firstName} {selectedOrder.lastName}</p>
        <p><strong>Phone Number:</strong> {selectedOrder.phoneNumber}</p>
        <p><strong>Payment Details:</strong> {selectedOrder.paymentMethod}::{selectedOrder.cardNumber}</p>
        <p><strong>Order Date:</strong> {selectedOrder.orderDate}</p>
        <p><strong>Status:</strong> {selectedOrder.status}</p>
        <p><strong>SubTotal:</strong> ₹{selectedOrder.subtotal}</p>
        <p><strong>Total Amount:</strong> ₹{selectedOrder.totalAmount}</p>
      </div>
      <h4 className="text-lg font-medium text-gray-700 mt-6">Products:</h4>
      <ul className="space-y-4 mt-4">
        {selectedOrder.products.map((item) => (
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
  )}
</div>

  )
}

export default OrderMangement




