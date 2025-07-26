import React, { useEffect, useState, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Footer from '../components/Footer';
import { fetchProductdetail } from '../redux/slices/productSlice';
import { addToCart } from '../redux/slices/cartSlice';

const ProductDetails = () => {
  const dispatch = useDispatch();
  const { data, loading, error } = useSelector((state) => state.products.productdetails);
  const { id } = useParams();
  const [quantity, setQuantity] = useState(1);
  const [zoomStyle, setZoomStyle] = useState({ display: 'none' });
  const [backgroundPosition, setBackgroundPosition] = useState('0% 0%');
  const imageRef = useRef(null);

  useEffect(() => {
    dispatch(fetchProductdetail(id));
  }, [dispatch, id]);

  const handleAddToCart = (product_id) => {
    const itemData = {
      product_id,
      quantity,
    };
    dispatch(addToCart(itemData));
  };

  const handleQuantityChange = (e) => {
    const value = parseInt(e.target.value, 10);
    if (value >= 1) {
      setQuantity(value);
    }
  };

  const handleZoom = (e) => {
    const rect = imageRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const xPercent = (x / rect.width) * 100;
    const yPercent = (y / rect.height) * 100;

    setBackgroundPosition(`${xPercent}% ${yPercent}%`);
    setZoomStyle({
      display: 'block',
      backgroundImage: `url(${data.image})`,
      backgroundSize: '200%',
      backgroundPosition: `${xPercent}% ${yPercent}%`,
    });
  };

  const handleMouseLeave = () => {
    setZoomStyle({ display: 'none' });
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="relative w-20 h-20">
          <div className="absolute top-0 left-0 w-full h-full border-4 border-t-blue-600 border-r-transparent border-b-transparent border-l-blue-600 rounded-full animate-spin"></div>
          <div className="absolute top-2.5 left-2.5 w-14 h-14 border-4 border-t-indigo-500 border-r-transparent border-b-transparent border-l-indigo-500 rounded-full animate-spin-slow"></div>
        </div>
      </div>
    );
  }

  if (error || !data) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <p className="text-red-600 text-2xl font-semibold font-sans">Product not found or an error occurred.</p>
      </div>
    );
  }

  return (
    <>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          <div className="flex flex-col lg:flex-row gap-8 p-6 lg:p-10">
            {/* Product Image with Zoom */}
            <div className="flex-shrink-0 w-full lg:w-1/2 relative">
              <div className="relative">
                <img
                  ref={imageRef}
                  src={data.image}
                  alt={data.name}
                  className="w-full h-[32rem] object-cover rounded-xl transition-transform duration-300 hover:cursor-zoom-in"
                  onMouseMove={handleZoom}
                  onMouseLeave={handleMouseLeave}
                />
                <div
                  className="absolute top-0 left-[calc(100%+1.5rem)] w-80 h-80 border border-gray-200 rounded-lg shadow-lg"
                  style={zoomStyle}
                ></div>
              </div>
            </div>

            {/* Product Details */}
            <div className="flex flex-col justify-between w-full lg:w-1/2">
              <div>
                <h1 className="text-4xl font-bold text-gray-900 font-sans mb-4">{data.name}</h1>
                <p className="text-lg text-gray-600 font-sans mb-6">{data.description}</p>
                <p className="text-base text-gray-500 font-sans leading-relaxed mb-8">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
                </p>
              </div>
              <div className="flex flex-col gap-6">
                <p className="text-3xl font-bold text-blue-600 font-sans">₹{data.price}</p>
                <div className="flex items-center gap-4">
                  <label htmlFor="quantity" className="text-sm font-medium text-gray-700 font-sans">
                    Quantity:
                  </label>
                  <input
                    type="number"
                    id="quantity"
                    value={quantity}
                    onChange={handleQuantityChange}
                    min="1"
                    className="w-20 py-2 px-3 border border-gray-200 rounded-lg shadow-sm font-sans text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-blue-600 transition-all duration-300"
                  />
                </div>
                <div className="flex flex-col sm:flex-row gap-4">
                  <button
                    onClick={() => handleAddToCart(data.id)}
                    className="w-full sm:w-auto px-8 py-3 bg-blue-600 text-white text-base font-medium font-sans rounded-lg hover:bg-blue-700 focus:ring-4 focus:ring-blue-300 transition-all duration-300"
                    aria-label={`Add ${data.name} to cart`}
                  >
                    Add to Cart
                  </button>
                  <button
                    className="w-full sm:w-auto px-8 py-3 bg-indigo-600 text-white text-base font-medium font-sans rounded-lg hover:bg-indigo-700 focus:ring-4 focus:ring-indigo-300 transition-all duration-300"
                    aria-label={`Buy ${data.name} now`}
                  >
                    Buy Now
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
};

export default ProductDetails;