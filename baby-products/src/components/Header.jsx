import React, { useContext, useState } from 'react'
import { Link, Outlet, useNavigate } from 'react-router-dom'
//import { AuthContext } from '../context/AuthContext'
import logo from '../assets/logo.png'
import CartLogo from '../assets/shopping.png'
import userlogo from '../assets/user.png'
import { useSelector } from 'react-redux'
const Header = () => {
  // const {isAuthenticated, user} = useContext(AuthContext);
  const [searchProduct,setSearchProduct] = useState('');
  const navigate = useNavigate();
  const {isAuthenticated} = useSelector((state)=>state.auth)
  const handleSearch = (e)=>{
    const search = e.target.value;
      setSearchProduct(search);
      searchProducts(search);
      navigate('/product');
     
  };

  const handleUserClick =()=>{
  
      navigate('/profile');
    
    
  }
  
  return (
    <div>
      <nav className='navbar'>
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
      </nav>
      <Outlet />
    </div>
  )
}

export default Header