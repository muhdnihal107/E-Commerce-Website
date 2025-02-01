import React, { useContext, useState } from 'react'
import { Link, Outlet, useNavigate } from 'react-router-dom'

import { useDispatch, useSelector } from 'react-redux'
import { searchProducts } from '../redux/slices/productSlice'
const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

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
        {/* Logo */}
        <div className="text-2xl font-bold text-blue-600">BabyStore</div>

        {/* Desktop Menu */}
        <nav className="hidden md:flex space-x-6">
          <Link to="/" className="text-gray-700 hover:text-blue-600">Home</Link>
          <Link to="/product" className="text-gray-700 hover:text-blue-600">Shop</Link>
          <a className="text-gray-700 hover:text-blue-600">Offers</a>
          <a className="text-gray-700 hover:text-blue-600">Contact</a>
        </nav>

        {/* Right Icons */}
        <div className="hidden md:flex space-x-4 items-center">
          <input
            type="text"
            placeholder="Search..."
            className="border rounded px-2 py-1"
            onChange={handleSearch}
          />
          <Link to="/cart" className="text-gray-700 hover:text-blue-600">
            <img className="w-8" src="https://i.postimg.cc/bwy6kxqR/shopping.png" alt="Cart" />
          </Link>
          <a onClick={handleUserClick} className="hover:text-blue-600 cursor-pointer">
            <img className="w-9" src="https://i.postimg.cc/wj8fvCGn/user.png" alt="User" />
          </a>
        </div>

        {/* Mobile Menu Button */}
        <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="md:hidden focus:outline-none">
          <svg className="w-8 h-8 text-gray-700" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16m-7 6h7" />
          </svg>
        </button>
      </div>

      {/* Mobile Menu Dropdown */}
      <div className={`md:hidden bg-white ${isMenuOpen ? "block" : "hidden"} p-4 space-y-3`}>
        <Link to="/" className="block text-gray-700 hover:text-blue-600">Home</Link>
        <Link to="/product" className="block text-gray-700 hover:text-blue-600">Shop</Link>
        <a className="block text-gray-700 hover:text-blue-600">Offers</a>
        <a className="block text-gray-700 hover:text-blue-600">Contact</a>

        <div className="flex flex-col space-y-2 mt-3">
          <input
            type="text"
            placeholder="Search..."
            className="border rounded px-2 py-1"
            onChange={handleSearch}
          />
          <Link to="/cart" className="text-gray-700 hover:text-blue-600 flex items-center space-x-2">
            <img className="w-8" src="https://i.postimg.cc/bwy6kxqR/shopping.png" alt="Cart" />
            <span>Cart</span>
          </Link>
          <a onClick={handleUserClick} className="hover:text-blue-600 cursor-pointer flex items-center space-x-2">
            <img className="w-9" src="https://i.postimg.cc/wj8fvCGn/user.png" alt="User" />
            <span>Profile</span>
          </a>
        </div>
      </div>
    </header>
      <Outlet />
    </div>
  )
}

export default Header