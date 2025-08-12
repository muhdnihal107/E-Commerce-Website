import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Footer from '../components/Footer';
import { fetchCart, updateCartItemQuantity, clearCart, removeCartItem } from '../redux/slices/cartSlice';

const Cart = () => {
  const dispatch = useDispatch();
  const { items, totalItems, totalPrice, status, error } = useSelector((state) => state.cart);
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(fetchCart());
  }, [dispatch]);

  const handleBtn = () => {
    navigate('/checkout');
  };

  const handleClearCart = () => {
    dispatch(clearCart());
  };

  const handleQuantityUpdate = (pk, product_id, action) => {
    const dataupdateQuantity = { product_id, action };
    dispatch(updateCartItemQuantity({ updatedata: dataupdateQuantity, pk }));
  };

  const handleRemoveItem = (product_id, pk) => {
    dispatch(removeCartItem({ product_id, pk }));
  };

  return (
    <>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 min-h-screen bg-[#fff]">
        <h1 className="text-4xl font-bold text-gray-900 font-sans mb-10 text-center">Your Cart</h1>

        {status === 'loading' ? (
          <div className="flex items-center justify-center min-h-[50vh] bg-gray-50">
            <div className="relative w-20 h-20">
              <div className="absolute top-0 left-0 w-full h-full border-4 border-t-blue-600 border-r-transparent border-b-transparent border-l-blue-600 rounded-full animate-spin"></div>
              <div className="absolute top-2.5 left-2.5 w-14 h-14 border-4 border-t-indigo-500 border-r-transparent border-b-transparent border-l-indigo-500 rounded-full animate-spin-slow"></div>
            </div>
          </div>
        ) : error ? (
          <div className="flex items-center justify-center min-h-[50vh] bg-gray-50">
            <p className="text-red-600 text-2xl font-semibold font-sans">Error: {error}</p>
          </div>
        ) : items?.length > 0 ? (
          <div className="grid grid-cols-1 gap-6">
            {items.map((item) => (
              <div
                key={item.id}
                className="bg-white rounded-2xl shadow-lg p-6 flex flex-col sm:flex-row items-start sm:items-center gap-6 transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
              >
                <img
                  src={item.product.image}
                  alt={item.product.name}
                  className="w-full sm:w-32 h-32 object-cover rounded-lg"
                />
                <div className="flex-1">
                  <h2 className="text-xl font-semibold text-gray-900 font-sans truncate">{item.product.name}</h2>
                  <p className="text-sm text-gray-600 font-sans mt-1 line-clamp-2">{item.product.description}</p>
                  <p className="text-lg font-bold text-blue-600 font-sans mt-2">
                    ₹{(item.product.price * item.quantity).toFixed(2)}
                  </p>
                  <div className="flex items-center gap-4 mt-4">
                    <div className="flex items-center gap-2">
                      <button
                        className="w-8 h-8 bg-gray-100 text-gray-900 font-semibold rounded-full hover:bg-gray-200 focus:ring-2 focus:ring-blue-600 transition-all duration-300"
                        onClick={() => handleQuantityUpdate(item.id, item.product.id, 'decrement')}
                        aria-label={`Decrease quantity of ${item.product.name}`}
                      >
                        -
                      </button>
                      <span className="text-base font-medium text-gray-900 font-sans">{item.quantity}</span>
                      <button
                        className="w-8 h-8 bg-gray-100 text-gray-900 font-semibold rounded-full hover:bg-gray-200 focus:ring-2 focus:ring-blue-600 transition-all duration-300"
                        onClick={() => handleQuantityUpdate(item.id, item.product.id, 'increment')}
                        aria-label={`Increase quantity of ${item.product.name}`}
                      >
                        +
                      </button>
                    </div>
                    <button
                      className="text-red-600 text-sm font-medium font-sans hover:text-red-700 transition-colors duration-300"
                      onClick={() => handleRemoveItem(item.product.id, item.id)}
                      aria-label={`Remove ${item.product.name} from cart`}
                    >
                      Remove
                    </button>
                  </div>
                </div>
              </div>
            ))}
            <div className="flex justify-end mt-6">
              <button
                className="px-6 py-2 bg-red-600 text-white text-base font-medium font-sans rounded-lg hover:bg-red-700 focus:ring-4 focus:ring-red-300 transition-all duration-300"
                onClick={handleClearCart}
                aria-label="Clear cart"
              >
                Clear Cart
              </button>
            </div>
          </div>
        ) : (
          <div className="flex items-center justify-center min-h-[50vh] bg-gray-50 rounded-2xl shadow-md">
            <p className="text-gray-600 text-xl font-semibold font-sans">Your cart is empty</p>
          </div>
        )}

        {items?.length > 0 && (
          <div className="mt-10 bg-white rounded-2xl shadow-lg p-6 max-w-md mx-auto">
            <h2 className="text-2xl font-semibold text-gray-900 font-sans mb-4">Cart Totals</h2>
            <div className="space-y-3">
              <p className="text-base font-medium text-gray-700 font-sans">
                Total Items: <span className="font-bold">{totalItems}</span>
              </p>
              <p className="text-lg font-bold text-blue-600 font-sans">
                Total: ₹{(totalPrice || 0).toFixed(2)}
              </p>
            </div>
            <button
              className="w-full mt-6 px-6 py-3 bg-blue-600 text-white text-base font-medium font-sans rounded-lg hover:bg-blue-700 focus:ring-4 focus:ring-blue-300 transition-all duration-300"
              onClick={handleBtn}
              aria-label="Proceed to checkout"
            >
              Proceed to Checkout
            </button>
          </div>
        )}
      </div>
      <Footer />
    </>
  );
};

export default Cart;