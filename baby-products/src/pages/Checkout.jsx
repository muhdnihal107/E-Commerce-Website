import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Footer from '../components/Footer';
import { createOrder,fetchOrder } from '../redux/slices/orderSlice';
import { Link } from 'react-router-dom';

const Checkout = () => {
  const dispatch = useDispatch();
  const {totalPrice,order} = useSelector((state)=>state.cart)
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    phoneNumber: '',
    email: '',
    address: '',
    city: '',
    state: '',
    pincode: '',
    paymentMethod: 'upi', // Default to UPI
    upiId: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate required fields
    const requiredFields = ['firstName', 'lastName', 'phoneNumber', 'email', 'address', 'city', 'state', 'pincode'];
    if (formData.paymentMethod === 'upi') {
      requiredFields.push('upiId');
    };

    const isFormValid = requiredFields.every((field) => formData[field].trim() !== '');
    if (!isFormValid) {
      alert('Please fill all required fields.');
      return;
    }

    // Dispatch createOrder thunk
    const orderData = {
      first_name: formData.firstName,
      last_name: formData.lastName,
      phone_number: formData.phoneNumber,
      email: formData.email,
      address: formData.address,
      state: formData.state,
      city: formData.city,
      pincode: formData.pincode,
      payment_method: formData.paymentMethod,
      // upi_id: formData.paymentMethod === 'upi' ? formData.upiId : null,
      payment_amount: totalPrice
    };

    try {
      await dispatch(createOrder({orderData: orderData}));
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
        paymentMethod: 'upi',
        upiId: '',
      });
    } catch (error) {
      alert('Failed to place order. Please try again.');
    }
  };

  return (
    <>
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
                <option value="upi">UPI Payment</option>
                <option value="cod">Cash on Delivery</option>
              </select>
            </div>

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

            <div>

              <button className="submit-button" type="submit">
                <Link to={'/order'}>
            Place Order
                </Link>
              </button>
            </div>
          </div>
        </form>
      </div>
      <Footer />
    </>
  );
};

export default Checkout;
