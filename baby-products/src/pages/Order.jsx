import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Footer from '../components/Footer';
import { fetchOrder } from '../redux/slices/orderSlice';

const Order = () => {
  const dispatch = useDispatch();
  const { order, loading, error } = useSelector((state) => state.order);

  useEffect(() => {
    dispatch(fetchOrder());
  }, [dispatch]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <div className="relative w-20 h-20">
          <div className="absolute top-0 left-0 w-full h-full border-4 border-t-blue-600 border-r-transparent border-b-transparent border-l-blue-600 rounded-full animate-spin"></div>
          <div className="absolute top-2.5 left-2.5 w-14 h-14 border-4 border-t-indigo-500 border-r-transparent border-b-transparent border-l-indigo-500 rounded-full animate-spin-slow"></div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <p className="text-red-600 text-2xl font-semibold font-sans">Error: {error}</p>
      </div>
    );
  }

  return (
    <>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 min-h-screen bg-gray-50">
        {order ? (
          <div className="max-w-4xl mx-auto bg-white rounded-3xl shadow-xl p-8 sm:p-10">
            <h1 className="text-4xl font-bold text-gray-900 font-sans text-center mb-10">Order Summary</h1>

            <div className="space-y-8">
              {/* Order Details */}
              <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-6 rounded-2xl shadow-lg text-white">
                <h2 className="text-2xl font-semibold text-white font-sans mb-4">Order Details</h2>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <p className="text-base font-medium text-white">
                    <span className="font-bold">Order ID:</span> {order.id}
                  </p>
                  <p className="text-base font-medium text-white">
                    <span className="font-bold">Status:</span> {order.status}
                  </p>
                  <p className="text-base font-medium text-white">
                    <span className="font-bold">Order Date:</span> {order.orderDate}
                  </p>
                </div>
              </div>

              {/* Products */}
              <div className="bg-white rounded-2xl shadow-md p-6">
                <h2 className="text-2xl font-semibold text-gray-900 font-sans mb-4">Products</h2>
                <ul className="space-y-4">
                  {order.orderitems?.map((item, index) => (
                    <li
                      key={index}
                      className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg transition-all duration-300 hover:bg-gray-100"
                    >
                      <img
                        src={item.product.image}
                        alt={item.product.name}
                        className="w-16 h-16 object-cover rounded-md"
                      />
                      <div>
                        <p className="text-base font-medium text-gray-900 font-sans">
                          {item.product.name}
                        </p>
                        <p className="text-sm text-gray-600 font-sans">
                          Quantity: {item.quantity}
                        </p>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Shipping Information */}
              <div className="bg-white rounded-2xl shadow-md p-6">
                <h2 className="text-2xl font-semibold text-gray-900 font-sans mb-4">Shipping Information</h2>
                <div className="space-y-2">
                  <p className="text-base font-medium text-gray-700 font-sans">
                    <span className="font-bold">Name:</span> {order.first_name} {order.last_name}
                  </p>
                  <p className="text-base font-medium text-gray-700 font-sans">
                    <span className="font-bold">Phone:</span> {order.phone_number}
                  </p>
                  <p className="text-base font-medium text-gray-700 font-sans">
                    <span className="font-bold">Email:</span> {order.email}
                  </p>
                  <p className="text-base font-medium text-gray-700 font-sans">
                    <span className="font-bold">Address:</span> {order.address}, {order.state} - {order.pincode}
                  </p>
                  <p className="text-base font-medium text-gray-700 font-sans">
                    <span className="font-bold">Status:</span> {order.status}
                  </p>
                </div>
              </div>

              {/* Payment Information */}
              <div className="bg-white rounded-2xl shadow-md p-6">
                <h2 className="text-2xl font-semibold text-gray-900 font-sans mb-4">Payment Information</h2>
                <div className="space-y-2">
                  <p className="text-base font-medium text-gray-700 font-sans">
                    <span className="font-bold">Payment Method:</span> {order.payment_method}
                  </p>
                  <p className="text-base font-medium text-gray-700 font-sans">
                    <span className="font-bold">Payment Status:</span> {order.payment_status}
                  </p>
                </div>
              </div>

              {/* Order Total */}
              <div className="bg-blue-50 rounded-2xl shadow-md p-6 text-center">
                <h2 className="text-2xl font-bold text-blue-600 font-sans">
                  Total Amount: ₹{(order.payment_amount || 0).toFixed(2)}
                </h2>
              </div>
            </div>
          </div>
        ) : (
          <div className="flex items-center justify-center min-h-[50vh] bg-gray-50 rounded-2xl shadow-md">
            <p className="text-gray-600 text-xl font-semibold font-sans">No order details available</p>
          </div>
        )}
      </div>
      <Footer />
    </>
  );
};

export default Order;