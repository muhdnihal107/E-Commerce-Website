import React, { useContext, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom'
import { fetchOrderDetail } from '../../redux/slices/orderSlice';

const OrderView = () => {
    const dispatch = useDispatch();
    const {orderData,loading,error} = useSelector((state)=>state.order.orderdetails); 
    const {id} = useParams();
console.log(orderData);
    useEffect(()=>{
      dispatch(fetchOrderDetail(id));

    },[dispatch]);

    if(loading){
      return(
        <div>
          <p>Loading..</p>
        </div>
      )
    }

  return (
    <div>
        <div className="mt-8 bg-white p-6 rounded-lg shadow-md">
      <h3 className="text-xl font-semibold text-gray-700 mb-4">Order Details</h3>
      <div className="grid grid-cols-2 gap-4">
        <p><strong>Order ID:</strong> {orderData.id}</p>
        <p><strong>Customer Name:</strong> {orderData.first_name} {orderData.last_name}</p>
        <p><strong>Phone Number:</strong> {orderData.phone_number}</p>
        <p><strong>Payment Details:</strong> {orderData.payment_method}</p>
        <p><strong>Order Date:</strong> {orderData.created_at}</p>
        <p><strong>Status:</strong> {orderData.status}</p>
        <p><strong>Total Amount:</strong> ₹{orderData.payment_amount}</p>
      </div>
      <h4 className="text-lg font-medium text-gray-700 mt-6">Products:</h4>
      <ul className="space-y-4 mt-4">
        {orderData?.orderitems?.map((item) => (
          <li key={item.id} className="flex items-center space-x-4 bg-gray-50 p-4 rounded-lg shadow-sm">
            <img src={item.product.image} alt="product" className="w-16 h-16 object-cover rounded" />
            <div>
              <p className="text-gray-700 font-semibold">Quantity: {item.quantity}</p>
              <p className="text-gray-700">Price: ₹{item.product.price}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
    </div>
  )
}

export default OrderView