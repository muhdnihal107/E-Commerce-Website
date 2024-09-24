import React from 'react'
import logo from '../assets/logo.png'
import insta from '../assets/instagram-logo.png'
import facebook from '../assets/facebook-logo.png'
import twitter from '../assets/twitter-logo.png'
import youtube from '../assets/youtube-logo.png'


const Footer = () => {
  return (
<footer>
 <div className='info-con'>
    <div className='info-1'>
      <div className='info-div'>
         <img className='footer-logo' src={logo} alt="" />
         <p>123 Fifth Ave, New</p>
         <p>York, NY 12004.</p>
         <p>+1 123 456 78 90</p>
         <p>mail@example.com</p>
         <ul className='social-logo'>
          <li><img src={facebook} alt="" /></li>
          <li><img src={twitter} alt="" /></li>
          <li><img src={youtube} alt="" /></li>
          <li><img src={insta} alt="" /></li>
        </ul>
      </div>
       
      
    </div>
    <div className='info-div'>
          <h3>Customer Service</h3>
         <p>Contact Us</p>
         <p>Help & FAQs</p>
         <p>Payment Method</p>
         <p>Delivery Information</p>
         <p>Track Your Order</p>
         <p>Return & Exchanges</p>
    </div>
    <div className='info-div'>
          <h3>Catogories</h3>
          <p>Clothing & Fashion</p>
          <p>Toys</p>
          <p>School Supplies</p>
          <p>Birthday Party</p>
          <p>Supplies</p>
          <p>Baby Diapering</p>
          </div>
    <div className='info-div'>
          <h3>Our Company</h3>
          <p>Corporate</p>
          <p>Information</p>
          <p>Privacy & Cookies</p>
          <p>Policy</p>
          <p>Terms & Conditions</p>
          <p>Promo & Terms</p>
    </div>
  </div>
  <div className='copyright-con'>
    <p>Copyright &copy; 2024 Baby Store | Powered by Baby Store</p>
  </div>
</footer>
     
        
    
  )
}

export default Footer