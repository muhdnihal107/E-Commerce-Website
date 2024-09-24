import React from 'react'
import { Link } from 'react-router-dom'
import logo from '../assets/logo.png'
import CartLogo from '../assets/shopping.png'
import userlogo from '../assets/user.png'

const Header = () => {
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
            <li><input type="search" /></li>
            <li><Link><img src={CartLogo} alt="" /></Link></li>
            <li><Link><img src={userlogo} alt="" /></Link></li>
           </ul>
        </div>
      </nav>
    </div>
  )
}

export default Header