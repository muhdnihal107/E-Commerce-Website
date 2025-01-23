import { Link } from 'react-router-dom';
import Footer from '../components/Footer';
import { useEffect,useState } from "react";
import { useDispatch, useSelector } from "react-redux"
import { fetchCategories, fetchProductByCategory, fetchProducts } from "../redux/slices/productSlice";
import { addToCart } from '../redux/slices/cartSlice';

const ProductList = () => {
  const dispatch = useDispatch();
  const { products,categories,productByCategory } = useSelector((state) => state.products);
  const [selectedCategory, setSelectedCategory] = useState(0);


   useEffect(() => {
     dispatch(fetchProducts());
   }, [dispatch]);
  useEffect(()=>{
    dispatch(fetchCategories());
  },dispatch);

  useEffect(() => {
    if (selectedCategory!=0 || selectedCategory !== "") {
      dispatch(fetchProductByCategory(selectedCategory));
    } else {
      dispatch(fetchProducts()); // Fetch all products if no category is selected
    }
  }, [selectedCategory, dispatch]);


  if (products.loading) {
    return (<h3>Products are loading...</h3>);
  }

  const handleAddToCart = (product_id) => {
    const itemData = {
      product_id,
      quantity: 1
    }
    dispatch(addToCart(itemData));
  };

  const handleCategoryChange = (event) => {
    setSelectedCategory(event.target.value);
  };


  return (
    <>

<div className="category-filter mb-6 flex justify-end">
  
  <select
    name="category"
    value={selectedCategory}
    onChange={handleCategoryChange}
    className="w-40 p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300 ease-in-out hover:border-blue-400 hover:bg-blue-50"
  >
    <option value="" className="transition-colors duration-200">Select Category</option>
    {categories.data.map((category) => (
      <option
        key={category.id}
        value={category.id}
        className="transition-colors duration-200 hover:bg-blue-100"
      >
        {category.name}
      </option>
    ))}
  </select>
</div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 px-4 py-10">
        {productByCategory?.data.length>0 && selectedCategory !==0?(
          productByCategory.data.map((product) =>(
            <div
              key={product.id}
              className="bg-white opacity-90 shadow-md rounded-lg overflow-hidden hover:shadow-lg transition-shadow duration-300"
            >
              <Link to={`/product/${product.id}`} className="block">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-52 object-cover"
                />
              </Link>
              <div className="p-4">
                <h2 className="text-lg font-semibold text-gray-800">{product.name}</h2>
                <p className="text-sm text-gray-600 mt-2 line-clamp-2">
                  {product.description}
                </p>
                <p className="text-xl font-bold text-yellow-600 mt-4">₹{product.price}</p>
                <button
                  className="w-full bg-green-700 text-white py-2 mt-4 rounded-lg hover:bg-orange-500 transition-colors duration-300"
                  onClick={() => handleAddToCart(product.id)}
                >
                  Add to Cart
                </button>
              </div>
            </div>
          ))
        ): products.data.length > 0 ? (
          products.data.map((product) => (
            <div
              key={product.id}
              className="bg-white opacity-90 shadow-md rounded-lg overflow-hidden hover:shadow-lg transition-shadow duration-300"
            >
              <Link to={`/product/${product.id}`} className="block">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-52 object-cover"
                />
              </Link>
              <div className="p-4">
                <h2 className="text-lg font-semibold text-gray-800">{product.name}</h2>
                <p className="text-sm text-gray-600 mt-2 line-clamp-2">
                  {product.description}
                </p>
                <p className="text-xl font-bold text-yellow-600 mt-4">₹{product.price}</p>
                <button
                  className="w-full bg-green-700 text-white py-2 mt-4 rounded-lg hover:bg-orange-500 transition-colors duration-300"
                  onClick={() => handleAddToCart(product.id)}
                >
                  Add to Cart
                </button>
              </div>
            </div>
          ))
        ) : (
          <h3 className="text-center text-gray-600 text-lg col-span-full">
            No products available
          </h3>
        )}
      </div>

      <Footer />
    </>
  );

}

export default ProductList;
