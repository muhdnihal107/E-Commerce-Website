import React, { useContext, useState } from 'react';
import { CartContext } from '../context/CartContext';

const Checkout = () => {
  const { clearCart } = useContext(CartContext);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    phoneNumber: '',
    email: '',
    address: '',
    city: '',
    state: '',
    pincode: '',
    paymentMethod: 'creditCard', 
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    upiId: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };


  const handleSubmit = (e) => {
    e.preventDefault();
  
  
    const requiredFields = ['firstName', 'lastName', 'phoneNumber', 'email', 'address', 'city', 'state', 'pincode'];
  
  
    if (formData.paymentMethod === 'creditCard') {
      requiredFields.push('cardNumber', 'expiryDate', 'cvv');
    } else if (formData.paymentMethod === 'upi') {
      requiredFields.push('upiId');
    } else if (formData.paymentMethod === 'netBanking') {
      requiredFields.push('bank');
    }
  

    const isFormValid = requiredFields.every((field) => formData[field].trim() !== '');
  
    if (!isFormValid) {
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
      pincode: '',
      paymentMethod: 'creditCard',
      cardNumber: '',
      expiryDate: '',
      cvv: '',
      upiId: '',
      bank: ''
    });

  };
  
  return (
    <div className="checkout-component">
      <h1 className="checkout-head">Checkout</h1>
      <form onSubmit={handleSubmit} className="checkout-form">
        <div className="checkout-form-head">
          <h3>Basic Information</h3>
        </div>
        <div className="checkout-form-body">
          <div className="form-group">
            <label htmlFor="first-name">First Name</label>
            <input
              type="text"
              placeholder="First Name"
              id="first-name"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="last-name">Last Name</label>
            <input
              type="text"
              placeholder="Last Name"
              id="last-name"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="phone-number">Phone Number</label>
            <input
              type="number"
              name="phoneNumber"
              id="phone-number"
              placeholder="Phone Number"
              value={formData.phoneNumber}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="checkout-email">Email Address</label>
            <input
              type="email"
              name="email"
              id="checkout-email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="full-address">Full Address</label>
            <textarea
              name="address"
              id="full-address"
              placeholder="Full Address"
              value={formData.address}
              onChange={handleChange}
              required
            ></textarea>
          </div>
          <div className="form-group">
            <label htmlFor="city">City</label>
            <input
              type="text"
              id="city"
              name="city"
              placeholder="City"
              value={formData.city}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="state">State</label>
            <input
              type="text"
              id="state"
              name="state"
              placeholder="State"
              value={formData.state}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="pin-code">Pin Code</label>
            <input
              type="number"
              id="pin-code"
              name="pincode"
              placeholder="Pin Code"
              value={formData.pincode}
              onChange={handleChange}
              required
            />
          </div>

    
          <div className="checkout-form-head">
            <h3>Payment Information</h3>
          </div>
          <div className="form-group">
            <label htmlFor="payment-method">Payment Method</label>
            <select
              id="payment-method"
              name="paymentMethod"
              value={formData.paymentMethod}
              onChange={handleChange}
              required
            >
              <option value="creditCard">Credit/Debit Card</option>
              <option value="upi">UPI</option>
              <option value="netBanking">Net Banking</option>
            </select>
          </div>

        
          {formData.paymentMethod === 'creditCard' && (
            <>
              <div className="form-group">
                <label htmlFor="card-number">Card Number</label>
                <input
                  type="text"
                  id="card-number"
                  name="cardNumber"
                  placeholder="Card Number"
                  value={formData.cardNumber}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="expiry-date">Expiry Date</label>
                <input
                  type="text"
                  id="expiry-date"
                  name="expiryDate"
                  placeholder="MM/YY"
                  value={formData.expiryDate}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="cvv">CVV</label>
                <input
                  type="password"
                  id="cvv"
                  name="cvv"
                  placeholder="CVV"
                  value={formData.cvv}
                  onChange={handleChange}
                  required
                />
              </div>
            </>
          )}

      {formData.paymentMethod === 'upi' && (
          <div className="form-group">
              <label htmlFor="upi-id">UPI ID</label>
              <input
                type="text"
                id="upi-id"
                name="upiId"
                placeholder="UPI ID"
                value={formData.upiId}
                onChange={handleChange}
                required
              />
            </div>
          )}

      {formData.paymentMethod === 'netBanking' && (
        <div className="form-group">
            <label htmlFor="bank">Select Bank</label>
            <select id="bank" name="bank" onChange={handleChange} required>
                <option value="">--Select Bank--</option>
                <option value="bank1">Bank 1</option>
                <option value="bank2">Bank 2</option>
                <option value="bank3">Bank 3</option>
              </select>
            </div>
          )}

          <div>
            <button className="submit-button" type="submit" onClick={clearCart}>
              Place Order
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Checkout;
