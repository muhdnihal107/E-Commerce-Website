// import React, { useContext } from 'react';
// import { ProductContext } from '../context/ProductContext';


// const ProductList = () => {
//   const { products, loading } = useContext(ProductContext);
//   const { addToCart } = useContext(CartContext);

//   if (loading) {
//     return <h3>Products are loading...</h3>;
//   }

//   return (
//     <>
//     <div className='product-container'>

//       {products.length > 0 ? (
//         products.map((product) => (
//           <div key={product.id} className='product-card'>
//             <Link to={`/product/${product.id}`}>
//               <img src={product.image} alt={product.name} />
//             </Link>
//             <h2>{product.name}</h2>
//             <p>{product.description}</p>
//             <p>
//               <strong>₹{product.price}</strong>
//             </p>
//             <button
//               className='add-to-cart-btn'
//               onClick={() => addToCart(product)} >
//               Add to cart
//             </button>
//           </div>
//         ))
//       ) : (
//         <h3>No products available</h3>
//       )}
//     </div>
//     <Footer/>
//     </>
//   );
// };

// export default ProductList;

import { Link } from 'react-router-dom';
import Footer from '../components/Footer';
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux"
import { fetchProducts } from "../redux/slices/productSlice";
import { addToCart } from '../redux/slices/cartSlice';

const ProductList = () => {
  const dispatch = useDispatch();
  const { products } = useSelector((state) => state.products);
  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  if (products.loading) {
    return (<h3>Products are loading...</h3>);
  }
  
  const handleAddToCart = (product_id)=>{
    const itemData = {
      product_id,
      quantity:1
    }
    dispatch(addToCart(itemData))
  };

  return (
    <>
      <div className='product-container'>

        {products.data.length > 0 ? (
          products.data.map((product) => (
            <div key={product.id} className='product-card'>
              <Link to={`/product/${product.id}`}>
                <img src={product.image} alt={product.name} />
              </Link>
              <h2>{product.name}</h2>
              <p>{product.description}</p>
              <p>
                <strong>₹{product.price}</strong>
              </p>
              <button
                className='add-to-cart-btn'
                onClick={()=>handleAddToCart(product.id)} >
                Add to cart
              </button>
            </div>
          ))
        ) : (
          <h3>No products available</h3>
        )}
      </div>
      <Footer />
    </>
  );

}

export default ProductList;
