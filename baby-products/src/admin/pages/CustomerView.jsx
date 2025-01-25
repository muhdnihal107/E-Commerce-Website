import React, { useContext, useEffect, useState } from 'react'
import ProfileLogo from '../assets/account.png';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { blockUser, fetchUserdetail } from '../../redux/slices/authSlice';
import { fetchUserCartItems } from '../../redux/slices/cartSlice';

const CustomerView = () => {
    const {id} = useParams();
    const dispatch = useDispatch();
    const {data,loading,error} = useSelector((state)=>state.auth.userdetails);
    const {success} = useSelector((state)=>state.auth.blockUserState)
    const {item} = useSelector((state)=>state.cart.user);

    useEffect(()=>{
      dispatch(fetchUserdetail(id));
    }
    ,[id,dispatch,success]);

    useEffect(()=>{
      dispatch(fetchUserCartItems(id))
    },[dispatch]);

    const handleblockedUser = ()=>{
      dispatch(blockUser(id));
    };

    if (loading) {
      <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="relative w-16 h-16">
        {/* Outer Circle */}
        <div className="absolute top-0 left-0 w-full h-full border-4 border-t-blue-500 border-r-transparent border-b-transparent border-l-blue-500 rounded-full animate-spin"></div>

        {/* Inner Circle */}
        <div className="absolute top-2 left-2 w-12 h-12 border-4 border-t-green-400 border-r-transparent border-b-transparent border-l-green-400 rounded-full animate-spin-slow"></div>
      </div>
    </div>  
      };

      
  return (
    <div className="p-6 bg-gray-100 min-h-screen">
  <h1 className="text-3xl font-bold mb-6 text-center">User Details</h1>
  
  <div key={data.id} className="bg-white p-6 rounded-lg shadow-md">
    <div className="flex items-center space-x-4 mb-6">
      <img src={ProfileLogo} alt="Profile Photo" className="w-20 h-20 rounded-full border-2 border-gray-300" />
      <div>
        <p className="text-lg font-semibold">User ID: <span className="text-gray-700">{data.id}</span></p>
        <p className="text-lg font-semibold">Name: <span className="text-gray-700">{data.name}</span></p>
        <p className="text-lg font-semibold">E-Mail: <span className="text-gray-700">{data.email}</span></p>
      
             <p className="text-lg font-semibold">Block Status: <span className="text-gray-700">{data.is_blocked?'Blocked User':'Not Blocked'||null}</span></p> 
      

         <div>
          <button className="mr-4 bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded transition-colors"
           onClick={handleblockedUser}>{data.is_blocked?'UnBlock':'Block'}</button>
          <button  className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded transition-colors"
           >Delete</button>
        </div> 
        
      </div>
    </div>
    
    <h1 className="text-2xl font-bold mb-4">User Cart</h1>
    
    {item?.length > 0 ? (
  item.map((cartItem) => (
    <div key={cartItem.product.id} className="bg-gray-50 p-4 rounded-lg shadow mb-4">
      <div className="flex space-x-4 items-center">
        {/* Uncomment the following line if the product image is available */}
        {/* <img src={cartItem.product.image} alt="product image" className="w-16 h-16 rounded-lg object-cover" /> */}
        <div>
          <p className="text-lg font-medium">{cartItem.product.name}</p>
          <p className="text-sm text-gray-600">Quantity: {cartItem.quantity}</p> 
          <p className="text-sm text-gray-600">Price: ₹{cartItem.product.price}</p>
        </div>
      </div>
    </div>
  ))
) : (
  <p className="text-center text-gray-500">No products in cart</p>
)}

  </div>
</div>

  )
}

export default CustomerView