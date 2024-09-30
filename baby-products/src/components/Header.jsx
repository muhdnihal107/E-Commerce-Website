import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import logo from '../assets/logo.png'
import CartLogo from '../assets/shopping.png'
import userlogo from '../assets/user.png'

const Header = () => {
  const [searchProduct,setSearchProduct] = useState('');
  const navigate = useNavigate();

  const handleSearchSubmit = (e)=>{
    e.preventDefault();
     if (searchProduct .trim()){
      navigate(`/product?search=${searchProduct}`);
     }
  };

  
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
          <li><Link>About us</Link></li>
          <li><Link>Testimonial</Link></li>
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
                       <button type='submit'>Submit</button>
              </form>
              </li>
            <li><Link to='/cart'><img src={CartLogo} alt="" /></Link></li>
            <li><Link to='/register'><img src={userlogo} alt="" /></Link></li>
           </ul>
        </div>
      </nav>
    </div>
  )
}

export default Header