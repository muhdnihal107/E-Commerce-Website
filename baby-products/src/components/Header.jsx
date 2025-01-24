import React, { useContext, useState } from 'react'
import { Link, Outlet, useNavigate } from 'react-router-dom'
//import { AuthContext } from '../context/AuthContext'
import logo from '../assets/logo.png'
import CartLogo from '../assets/shopping.png'
import userlogo from '../assets/user.png'
import { useDispatch, useSelector } from 'react-redux'
import { searchProducts } from '../redux/slices/productSlice'
const Header = () => {
  // const {isAuthenticated, user} = useContext(AuthContext);
  const dispatch = useDispatch();
  const [searchProduct,setSearchProduct] = useState('');
  const navigate = useNavigate();
  const {isAuthenticated} = useSelector((state)=>state.auth)
  const handleSearch = (e)=>{
    const search = e.target.value;
      setSearchProduct(search);
      dispatch(searchProducts({searchProduct}));
      navigate('/product');
     
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
            <a href="#" className="text-gray-700 hover:text-blue-600">Offers</a>
            <a href="#" className="text-gray-700 hover:text-blue-600">Contact</a>
          </nav>
          <div className="space-x-4 flex items-center">
            <input
              type="text"
              placeholder="Search..."
              className="border rounded px-2 py-1"
              onChange={handleSearch}
            />
            <a className="text-gray-700 hover:text-blue-600"><Link to={'/cart'}><img className='w-8' src='src/assets/shopping.png'></img></Link></a>
            <a onClick={handleUserClick} className="hover:text-blue-600"><img className='w-9' src='src/assets/user.png' alt="" /></a>
          </div>
        </div>
      </header>

      {/* <nav className='navbar'>
        <div className='logo'>
          <img  alt="" />
        </div>
        <div className='list-con'>
           <ul>
          <li><Link to='/'>Home</Link></li>
          <li><Link to='/product'>Products</Link></li>
          <li><Link to='/cart'>Cart</Link></li>
          <li><Link to='/'>About</Link></li>
        </ul>
        </div>
        <div className='list-con2'>
           <ul>
            <li>
          
              <input 
                       type="search"
                       placeholder='Search for Products'
                       value={searchProduct}
                       onChange={handleSearch}/>
              
              </li>
            <li><Link to='/cart'><img className='cart-logo' src={CartLogo} alt="" /></Link></li>
            <li> <div className='user-profile' onClick={handleUserClick}>
                {isAuthenticated ? (
                  <span><img className='user-logo' src={userlogo} alt="User" /> name</span> 
                ) : (
                  <img className='user-logo' src={userlogo} alt="User" />
                )}
              </div></li>
           </ul>
        </div>
      </nav> */}
      <Outlet />
    </div>
  )
}

export default Header