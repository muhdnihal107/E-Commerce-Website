import { Link } from 'react-router-dom';
import Footer from '../components/Footer';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCategories, fetchProductByCategory, fetchProducts ,searchProducts} from '../redux/slices/productSlice';
import { addToCart } from '../redux/slices/cartSlice';

const ProductList = () => {
  const dispatch = useDispatch();
  const { products, categories, productByCategory, productSearch, error } = useSelector((state) => state.products);
  const [selectedCategory, setSelectedCategory] = useState(0);
  // const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    dispatch(fetchProducts());
    dispatch(fetchCategories());   
  }, [dispatch]);

  const handleCategoryChange = (event) => {
    setSelectedCategory(event.target.value);
    // setSearchQuery(''); // Clear search when category changes
  };

  const handleSearch = (e) => {
      navigate('/product');
      dispatch(searchProducts(e.target.value));    
    };

  useEffect(() => {
    if (selectedCategory) {
      dispatch(fetchProductByCategory(selectedCategory));
    }
  }, [selectedCategory, dispatch]);

  // const handleSearch = (e) => {
  //   const query = e.target.value;
  //   setSearchQuery(query);
  //   if (query) {
  //     dispatch(searchProducts(query));
  //   } else {
  //     dispatch(fetchProducts()); // Reset to all products if search is cleared
  //   }
  // };

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
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="relative w-20 h-20">
          <div className="absolute top-0 left-0 w-full h-full border-4 border-t-blue-600 border-r-transparent border-b-transparent border-l-blue-600 rounded-full animate-spin"></div>
          <div className="absolute top-2.5 left-2.5 w-14 h-14 border-4 border-t-indigo-500 border-r-transparent border-b-transparent border-l-indigo-500 rounded-full animate-spin-slow"></div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <p className="text-red-600 text-2xl font-semibold font-sans">Error: {error}</p>
      </div>
    );
  }

  const renderProductCard = (product) => (
    <div
      key={product.id}
      className="relative bg-white rounded-2xl shadow-lg overflow-hidden group transition-all duration-500 hover:shadow-2xl hover:-translate-y-2"
    >
      <Link to={`/product/${product.id}`} className="block relative">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-72 object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#a3a1a100] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
        <div className="absolute top-4 right-4 bg-blue-600 text-white text-xs font-semibold font-sans px-3 py-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500">
          View Details
        </div>
      </Link>
      <div className="p-6 bg-gradient-to-b from-white to-gray-50">
        <h2 className="text-xl font-bold text-gray-900 font-sans truncate group-hover:text-blue-600 transition-colors duration-300">
          {product.name}
        </h2>
        <p className="text-sm text-gray-600 font-sans mt-2 line-clamp-2 group-hover:text-gray-800">
          {product.description}
        </p>
        <div className="flex justify-between items-center mt-4">
          <p className="text-2xl font-bold text-blue-600 font-sans">₹{product.price}</p>
          <button
            className="bg-blue-600 text-white px-4 py-2 rounded-lg font-sans text-sm font-medium hover:bg-blue-700 focus:ring-4 focus:ring-blue-300 transition-all duration-300"
            onClick={() => handleAddToCart(product.id)}
            aria-label={`Add ${product.name} to cart`}
          >
            Add to Cart
          </button>
        </div>
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
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-10 flex justify-center">
          <div className="relative w-full max-w-lg">
            <input
              type="text"
              placeholder="Search products..."
              onChange={handleSearch}
              className="w-full py-4 px-6 pr-12 bg-white border border-gray-200 rounded-full shadow-md font-sans text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-blue-600 transition-all duration-300 hover:bg-blue-50/30"
            />
            <svg
              className="absolute right-4 top-1/2 -translate-y-1/2 w-6 h-6 text-gray-500"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row justify-between items-center mb-10 gap-4">
          <h1 className="text-3xl font-bold text-gray-900 font-sans">Our Products</h1>
          <select
            name="category"
            value={selectedCategory}
            onChange={handleCategoryChange}
            className="w-full sm:w-56 py-3 px-4 bg-white border border-gray-200 rounded-lg shadow-md font-sans text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-blue-600 transition-all duration-300 hover:bg-blue-50"
          >
            <option className="text-gray-600 font-sans">Select Category</option>
            <option value="0" className="text-gray-600 font-sans hover:bg-blue-50">All</option>
            {categories.data.map((category) => (
              <option
                key={category.id}
                value={category.id}
                className="text-gray-600 font-sans hover:bg-blue-50"
              >
                {category.name}
              </option>
            ))}
          </select>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {productsToRender.length > 0 ? (
            productsToRender.map((product) => renderProductCard(product))
          ) : (
            <div className="col-span-full flex items-center justify-center min-h-[50vh] bg-gray-100 rounded-lg">
              <p className="text-gray-600 text-xl font-semibold font-sans">No products found</p>
            </div>
          )}
        </div>
      </div>

      <Footer />
    </>
  );
};

export default ProductList;