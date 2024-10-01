import React, { useContext, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { AuthContext } from '../context/AuthContext'
import logo from '../assets/logo.png'
import CartLogo from '../assets/shopping.png'
import userlogo from '../assets/user.png'
import { ProductContext } from '../context/ProductContext'
import searchLogo from '../assets/search-engine.png'
const Header = () => {
  const {isAuthenticated, user} = useContext(AuthContext);
  const {searchProducts} = useContext(ProductContext);
  const [searchProduct,setSearchProduct] = useState('');
  const navigate = useNavigate();

  const handleSearchSubmit = (e)=>{
    e.preventDefault();
     if (searchProduct .trim()){
      searchProducts(searchProduct);
      navigate('/product');
     }
  };

  const handleUserClick =()=>{
    if(!isAuthenticated){
      navigate('/register');
    }else{
      navigate('/profile');
    }
    
  }
  
  return (
    <div>
      <nav className='navbar'>
        <div className='logo'>
          <img src={logo} alt="Baby Hub logo" />
        </div>
        <div className='list-con'>
           <ul>
          <li><Link to='/'>Home</Link></li>
          <li><Link to='/product'>Products</Link></li>
          <li><Link to='/checkout'>Checkout</Link></li>
          <li><Link to='/cart'>Cart</Link></li>
        
        </ul>
        </div>
        <div className='list-con2'>
           <ul>
            <li>
              <form onSubmit={handleSearchSubmit}>
              <input 
                       type="search"
                       placeholder='Search for Products'
                       value={searchProduct}
                       onChange={(e) => setSearchProduct(e.target.value)}/>
                       <button className='search-btn' type='submit'><img src={searchLogo} alt="" /></button>
              </form>
              </li>
            <li><Link to='/cart'><img className='cart-logo' src={CartLogo} alt="" /></Link></li>
            <li> <div className='user-profile' onClick={handleUserClick}>
                {isAuthenticated ? (
                  <span><img className='user-logo' src={userlogo} alt="User" /> {user.username}</span> // Display user name or default to "User"
                ) : (
                  <img className='user-logo' src={userlogo} alt="User" />
                )}
              </div></li>
           </ul>
        </div>
      </nav>
    </div>
  )
}

export default Header