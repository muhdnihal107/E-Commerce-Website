import React, { useContext, useEffect, useState } from 'react'
import ProfileLogo from '../assets/account.png';
import { useParams } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';

const CustomerView = () => {
    const {id} = useParams();
    const {user,totalUser,deleteUser,blockedUser} = useContext(AuthContext);
    const [userView,setUserView] = useState(null);

    useEffect(()=>{
    const findUser = totalUser.find((item)=>item.id== id);
    setUserView(findUser);
    }
    ,[id,totalUser,user]);

    if (!userView) {
        return <p>Loading user data...</p>;  
      }

      
  return (
    <div className="p-6 bg-gray-100 min-h-screen">
  <h1 className="text-3xl font-bold mb-6 text-center">User Details</h1>
  
  <div key={userView.id} className="bg-white p-6 rounded-lg shadow-md">
    <div className="flex items-center space-x-4 mb-6">
      <img src={ProfileLogo} alt="Profile Photo" className="w-20 h-20 rounded-full border-2 border-gray-300" />
      <div>
        <p className="text-lg font-semibold">User ID: <span className="text-gray-700">{userView.id}</span></p>
        <p className="text-lg font-semibold">Name: <span className="text-gray-700">{userView.name}</span></p>
        <p className="text-lg font-semibold">E-Mail: <span className="text-gray-700">{userView.email}</span></p>
        <p className="text-lg font-semibold">Password: <span className="text-gray-700">{userView.password}</span></p>
      
            <p className="text-lg font-semibold">Block Status: <span className="text-gray-700">{userView.blocked == true?'User is Blocked':'not Blocked'}</span></p>
      

        <div>
          <button className="mr-4 bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded transition-colors"
           onClick={()=>blockedUser(userView.id,userView.blocked)}>{userView.blocked?'UnBlock':'Block'}</button>
          <button  className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded transition-colors"
           onClick={()=>deleteUser(userView.id)}>Delete</button>
        </div>
        
      </div>
    </div>
    
    <h1 className="text-2xl font-bold mb-4">User Cart</h1>
    
    {userView?.cart?.length > 0 ? (
      userView.cart.map((p) => (
        <div key={p.id} className="bg-gray-50 p-4 rounded-lg shadow mb-4">
          <div className="flex space-x-4 items-center">
            <img src={p.image} alt="product image" className="w-16 h-16 rounded-lg object-cover" />
            <div>
              <p className="text-lg font-medium">{p.name}</p>
              <p className="text-sm text-gray-600">Quantity: {p.quantity}</p> 
              <p className="text-sm text-gray-600">Price: ₹{p.price}</p>
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