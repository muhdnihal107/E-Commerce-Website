import React, { useContext, useState } from 'react'
import { Link, Outlet, useNavigate } from 'react-router-dom'

import { useDispatch, useSelector } from 'react-redux'
import { searchProducts } from '../redux/slices/productSlice'
const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {isAuthenticated} = useSelector((state)=>state.auth)
  const handleSearch = (e)=>{
      navigate('/product');
      dispatch(searchProducts(e.target.value));
     
  };

  const handleUserClick =()=>{
    if(isAuthenticated){
      navigate('/profile');

    }else{
navigate('/register');
    }
    
    
  };
  
  return (
    <div>

<header className="w-full bg-white opacity-90 shadow">
        <div className="container mx-auto flex justify-between items-center p-4">
          <div className="text-2xl font-bold text-blue-600">BabyStore</div>
          <nav className="space-x-6">
            <a className="text-gray-700 hover:text-blue-600"><Link to='/'>Home</Link></a>
            <a className="text-gray-700 hover:text-blue-600"><Link to='/product'>Shop</Link></a>
            <a className="text-gray-700 hover:text-blue-600">Offers</a>
            <a className="text-gray-700 hover:text-blue-600">Contact</a>
          </nav>
          <div className="space-x-4 flex items-center">
            <input
              type="text"
              placeholder="Search..."
              className="border rounded px-2 py-1"
              onChange={handleSearch}
            />
            <a className="text-gray-700 hover:text-blue-600"><Link to={'/cart'}><img className='w-8'src='https://i.postimg.cc/bwy6kxqR/shopping.png' ></img></Link></a>
            <a onClick={handleUserClick} className="hover:text-blue-600"><img className='w-9' src='https://i.postimg.cc/wj8fvCGn/user.png' alt="" /></a>
          </div>
        </div>
      </header>
      <Outlet />
    </div>
  )
}

export default Header