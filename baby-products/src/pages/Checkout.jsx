import React, { useState } from 'react'

const Checkout = () => {
  const [formData,setFormData] = useState({
    firstName: '',
    lastName: '',
    phoneNumber: '',
    email: '',
    address: '',
    city: '',
    state: '',
    pincode: ''

  });

  const handleChange = (e)=>{
   const name =  e.target.name;
   const value = e.target.value;

   setFormData({...formData,[name]: value});
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (Object.values(formData).some(field => !field)) {
      alert('Please fill all fields');
      return;
    }
    
    console.log('Order placed:', formData);
    alert('Order placed successfully!');
    setFormData({
      firstName: '',
      lastName: '',
      phoneNumber: '',
      email: '',
      address: '',
      city: '',
      state: '',
      pinCode: ''
    });
  };
  return (
    <div className='checkout-component'>
      <h1 className='checkout-head'>Checkout</h1>
      <form onSubmit={handleSubmit} className='checkout-form'>
        <div className='checkout-form-head'>
          <h3>Basic Information</h3>
        </div>
        <div className='checkout-form-body'>
          <div className='form-group'>
            <label htmlFor="first-name">First Name</label>
            <input 
                    type="text"
                    placeholder='First Name'
                    id='first-name'
                    name='firstName'
                    value={formData.firstName}
                    onChange={handleChange}
                    required
             />
          </div>
          <div className='form-group'>
            <label htmlFor="last-name">Last Name</label>
            <input 
                   type="text"
                   placeholder='Last Name'
                   id='last-name'
                   name='lastName'
                   value={formData.lastName}
                   onChange={handleChange}
                   required />
          </div>
          <div className='form-group'>
            <label htmlFor="phone-number">Phone Number</label>
            <input 
                   type="number" 
                   name="phoneNumber" 
                   id="phone-number"
                   placeholder='Phone Number'
                   value={formData.phoneNumber}
                   onChange={handleChange}
                   required
                   />
          </div>
          <div className='form-group'>
            <label htmlFor="checkout-email">Email Address</label>
            <input type="email"
                   name='email'
                   id='checkout-email'
                   placeholder='Email'
                   value={formData.email}
                   onChange={handleChange}
                   required />
          </div>
          <div className='form-group'>
            <label htmlFor="full-address">Full Address</label>
            <textarea name="address" id="full-address" value={formData.address} onChange={handleChange} required></textarea>
          </div>
          <div className='form-group'>
            <label htmlFor="city">City</label>
            <input type="text"
                   id='city'
                   name='city'
                   placeholder='City'
                   value={formData.city}
                   onChange={handleChange}
                   required />
          </div>
          <div className='form-group'>
            <label htmlFor="state">State</label>
            <input type="text"
                   id='state' 
                   name='state'
                   placeholder='State'
                   value={formData.state}
                   onChange={handleChange}
                   required/>
          </div>
          <div className='form-group'>
            <label htmlFor="pin-code">Pin code</label>
            <input type="number"
                   id='pin-code'
                   name='pincode'
                   placeholder='Pin Code'
                   value={formData.pincode}
                   onChange={handleChange}
                   required />
          </div>
          <div>
            <button className='submit-button' type='submit'>Place Order</button>
          </div>
        </div>
      </form>
    </div>
  )
}

export default Checkout