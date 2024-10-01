// import React, { useContext } from 'react'
// import { ProductContext } from '../context/ProductContext'
// import { Link } from 'react-router-dom';
// import { CartContext } from '../context/CartContext';



// const ProductList = () => {
//   const { products,loading } =useContext(ProductContext);
//   const { addToCart } = useContext(CartContext);
   


//   if(loading){
//     return <> <h3>Products are loading </h3></>
//   }
//   return (
    
//     <div className='product-container'>
//       <h1>SHOP</h1>
//       {products.length > 0 ? (products.map(product=>{
        
//         return(
//          <div key={product.id} className='product-card'>
//           <Link to={`/product/${product.id}`}> <img src={product.image} alt={product.name} /> </Link>  
//             <h2>{product.name}</h2>
//               <p>{product.description}</p>
//               <p><strong>${product.price.toFixed(2)}</strong></p>
//               <button className='add-to-cart-btn' onClick={()=>addToCart(product)}>Add to cart</button>
//          </div>
                                                                           
//   ); 
//   })): ( <><h3>no producta available</h3></>) }
      
//     </div>
//   );
  
// }

// export default ProductList
// //this is my product list



import React, { useContext } from 'react';
import { ProductContext } from '../context/ProductContext';
import { Link } from 'react-router-dom';
import { CartContext } from '../context/CartContext';

const ProductList = () => {
  const { products, loading } = useContext(ProductContext);
  const { addToCart } = useContext(CartContext);

  if (loading) {
    return <h3>Products are loading...</h3>;
  }

  return (
    <div className='product-container'>
      <h1>SHOP</h1>
      {products.length > 0 ? (
        products.map((product) => (
          <div key={product.id} className='product-card'>
            <Link to={`/product/${product.id}`}>
              <img src={product.image} alt={product.name} />
            </Link>
            <h2>{product.name}</h2>
            <p>{product.description}</p>
            <p>
              <strong>${product.price.toFixed(2)}</strong>
            </p>
            <button
              className='add-to-cart-btn'
              onClick={() => addToCart(product)} >
              Add to cart
            </button>
          </div>
        ))
      ) : (
        <h3>No products available</h3>
      )}
    </div>
  );
};

export default ProductList;
