import { Link } from 'react-router-dom';
import Footer from '../components/Footer';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCategories, fetchProductByCategory, fetchProducts } from '../redux/slices/productSlice';
import { addToCart } from '../redux/slices/cartSlice';

const ProductList = () => {
  const dispatch = useDispatch();
  const { products, categories, productByCategory, productSearch, error } = useSelector((state) => state.products);
  const [selectedCategory, setSelectedCategory] = useState(0);

  useEffect(() => {
    dispatch(fetchProducts());
    dispatch(fetchCategories());
  }, [dispatch]);

  const handleCategoryChange = (event) => {
    setSelectedCategory(event.target.value);
  };

  useEffect(() => {
    if (selectedCategory) {
      dispatch(fetchProductByCategory(selectedCategory));
    }
  }, [selectedCategory, dispatch]);

  const handleAddToCart = (product_id) => {
    const itemData = {
      product_id,
      quantity: 1,
    };
    dispatch(addToCart(itemData));
  };

  const isLoading = products.loading || productByCategory.loading || productSearch.loading;

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-100 opacity-60">
        <div className="relative w-16 h-16">
          {/* Outer Circle */}
          <div className="absolute top-0 left-0 w-full h-full border-4 border-t-blue-500 border-r-transparent border-b-transparent border-l-blue-500 rounded-full animate-spin"></div>
          {/* Inner Circle */}
          <div className="absolute top-2 left-2 w-12 h-12 border-4 border-t-green-400 border-r-transparent border-b-transparent border-l-green-400 rounded-full animate-spin-slow"></div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-100">
        <p className="text-red-500 text-lg">Error: {error}</p>
      </div>
    );
  }

  const renderProductCard = (product) => (
    <div
      key={product.id}
      className="bg-white opacity-90 shadow-md rounded-lg overflow-hidden transform hover:scale-105 hover:shadow-xl transition-all duration-300 ease-out"
    >
      <Link to={`/product/${product.id}`} className="block">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-52 object-cover hover:opacity-90 transition-opacity duration-300"
        />
      </Link>
      <div className="p-4">
        <h2 className="text-lg font-semibold text-gray-800 hover:text-blue-600 transition-colors duration-300">
          {product.name}
        </h2>
        <p className="text-sm text-gray-600 mt-2 line-clamp-2 hover:text-gray-800 transition-colors duration-300">
          {product.description}
        </p>
        <p className="text-xl font-bold text-yellow-600 mt-4">₹{product.price}</p>
        <button
          className="w-full bg-green-600 text-white py-2 mt-4 rounded-lg hover:bg-orange-500 focus:ring-4 focus:ring-orange-300 focus:outline-none transition-all duration-300"
          onClick={() => handleAddToCart(product.id)}
          aria-label={`Add ${product.name} to cart`}
        >
          Add to Cart
        </button>
      </div>
    </div>
  );

  const productsToRender =
    productSearch?.data.length > 0
      ? productSearch.data
      : productByCategory?.data.length > 0
      ? productByCategory.data
      : products.data;

  return (
    <>
      <div className="category-filter mb-6 flex justify-end">
        <select
          name="category"
          value={selectedCategory}
          onChange={handleCategoryChange}
          className="w-40 p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300 ease-in-out hover:border-blue-400 hover:bg-blue-50"
        >
          <option className="transition-colors duration-200">Select Category</option>
          <option value="0" className="transition-colors duration-200 hover:bg-blue-100">
            All
          </option>
          {categories.data.map((category) => (
            <option key={category.id} value={category.id} className="transition-colors duration-200 hover:bg-blue-100">
              {category.name}
            </option>
          ))}
        </select>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 px-4 py-10">
        {productsToRender.length > 0 ? (
          productsToRender.map((product) => renderProductCard(product))
        ) : (
          <div className="flex items-center justify-center h-screen bg-gray-100">
            <div className="relative w-16 h-16">
              {/* Outer Circle */}
              <div className="absolute top-0 left-0 w-full h-full border-4 border-t-blue-500 border-r-transparent border-b-transparent border-l-blue-500 rounded-full animate-spin"></div>
              {/* Inner Circle */}
              <div className="absolute top-2 left-2 w-12 h-12 border-4 border-t-green-400 border-r-transparent border-b-transparent border-l-green-400 rounded-full animate-spin-slow"></div>
            </div>
          </div>
        )}
      </div>

      <Footer />
    </>
  );
};

export default ProductList;