import React, { useContext, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchAllOrders } from '../../redux/slices/orderSlice';

const OrderMangement = () => {
  const dispatch = useDispatch();
  const {data,loading,error} = useSelector((state)=>state.order.orders);

  useEffect(()=>{
    dispatch(fetchAllOrders());
  },[dispatch]);

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
          <th className="px-4 py-2 text-gray-600">Date</th>
          <th className="px-4 py-2 text-gray-600">Product Amount</th>
          <th className="px-4 py-2 text-gray-600">Total Amount</th>
          <th className="px-4 py-2 text-gray-600">Actions</th>
        </tr>
      </thead>
      <tbody>
        {data.length > 0 ? (
          data.map((item) => (
            <tr key={item.orderId} className="bg-white border-b hover:bg-gray-100">
              <td className="px-4 py-2">{item.id}</td>
              <td className="px-4 py-2">{item.first_name}</td>
              <td className="px-4 py-2">{item.last_name}</td>
              <td className="px-4 py-2">{item.phone_number}</td>
              <td className="px-4 py-2">{item.created_at}</td>
              <td className="px-4 py-2">₹{item.payment_amount}</td>
              <td className="px-4 py-2">₹{item.payment_amount}</td>
              <td className="px-4 py-2">
                <Link to={`/admin/ordermanage/${item.id}`}>
                <button  className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600 transition duration-200">
                  View
                </button>
                </Link>
                
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
</div>

  )
};

export default OrderMangement




