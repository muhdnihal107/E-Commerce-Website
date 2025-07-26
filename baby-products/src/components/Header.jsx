import React, { useState } from 'react';
import { Link, Outlet, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { searchProducts } from '../redux/slices/productSlice';

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { isAuthenticated } = useSelector((state) => state.auth);

  const handleSearch = (e) => {
    navigate('/product');
    dispatch(searchProducts(e.target.value));
  };

  const handleUserClick = () => {
    if (isAuthenticated) {
      navigate('/profile');
    } else {
      navigate('/register');
    }
  };

  return (
    <div>


        <header className="w-full bg-gradient-to-r from-blue-900 to-slate-700 shadow-lg">
        <div className="container mx-auto flex justify-between items-center p-4 lg:p-6">
          {/* Logo */}
          <Link to="/" className="text-3xl font-bold text-white font-poppins tracking-tight">
            BabyStore
          </Link>

          {/* Desktop Menu */}
          <nav className="hidden lg:flex space-x-8">
            <Link to="/" className="text-white hover:text-indigo-200 font-poppins text-lg transition-colors duration-300">
              Home
            </Link>
            <Link to="/product" className="text-white hover:text-indigo-200 font-poppins text-lg transition-colors duration-300">
              Shop
            </Link>
            <a className="text-white hover:text-indigo-200 font-poppins text-lg transition-colors duration-300">Offers</a>
            <a className="text-white hover:text-indigo-200 font-poppins text-lg transition-colors duration-300">Contact</a>
          </nav>

          {/* Right Icons */}
          <div className="hidden lg:flex items-center space-x-6">
            <div className="relative">
              <input
                type="text"
                placeholder="Search products..."
                className="bg-white/10 text-white placeholder-white/50 rounded-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-300 w-64 font-poppins"
                onChange={handleSearch}
              />
              <svg
                className="w-5 h-5 text-white absolute right-3 top-1/2 transform -translate-y-1/2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <Link to="/cart" className="text-white hover:text-indigo-200 transition-colors duration-300">
              <img className="w-7 h-7" src="https://i.postimg.cc/bwy6kxqR/shopping.png" alt="Cart" />
            </Link>
            <button onClick={handleUserClick} className="text-white hover:text-indigo-200 transition-colors duration-300">
              <img className="w-8 h-8" src="https://i.postimg.cc/wj8fvCGn/user.png" alt="User" />
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="lg:hidden focus:outline-none text-white"
            aria-label="Toggle menu"
          >
            <svg className="w-8 h-8" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d={isMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16m-7 6h7"} />
            </svg>
          </button>
        </div>

        {/* Mobile Menu Dropdown */}
        <div
          className={`lg:hidden bg-indigo-700/95 transition-all duration-300 ease-in-out ${
            isMenuOpen ? "block" : "hidden"
          } p-6`}
        >
          <nav className="flex flex-col space-y-4">
            <Link
              to="/"
              className="text-white hover:text-indigo-200 font-poppins text-lg transition-colors duration-300"
              onClick={() => setIsMenuOpen(false)}
            >
              Home
            </Link>
            <Link
              to="/product"
              className="text-white hover:text-indigo-200 font-poppins text-lg transition-colors duration-300"
              onClick={() => setIsMenuOpen(false)}
            >
              Shop
            </Link>
            <a className="text-white hover:text-indigo-200 font-poppins text-lg transition-colors duration-300">Offers</a>
            <a className="text-white hover:text-indigo-200 font-poppins text-lg transition-colors duration-300">Contact</a>
            <div className="relative mt-4">
              <input
                type="text"
                placeholder="Search products..."
                className="bg-white/10 text-white placeholder-white/50 rounded-full px-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-indigo-300 font-poppins"
                onChange={handleSearch}
              />
              <svg
                className="w-5 h-5 text-white absolute right-3 top-1/2 transform -translate-y-1/2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <Link
              to="/cart"
              className="text-white hover:text-indigo-200 flex items-center space-x-2 transition-colors duration-300"
              onClick={() => setIsMenuOpen(false)}
            >
              <img className="w-6 h-6" src="https://i.postimg.cc/bwy6kxqR/shopping.png" alt="Cart" />
              <span className="font-poppins">Cart</span>
            </Link>
            <button
              onClick={() => {
                handleUserClick();
                setIsMenuOpen(false);
              }}
              className="text-white hover:text-indigo-200 flex items-center space-x-2 transition-colors duration-300"
            >
              <img className="w-7 h-7" src="https://i.postimg.cc/wj8fvCGn/user.png" alt="User" />
              <span className="font-poppins">Profile</span>
            </button>
          </nav>
        </div>
      </header>
      <Outlet />
    </div>
  );
};

export default Header;