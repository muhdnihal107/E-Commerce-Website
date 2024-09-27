import React, { useContext } from 'react'
import { ProductContext } from '../context/ProductContext'



const ProductList = () => {
  const { products,loading } =useContext(ProductContext);
  const imagePath = require(`..${image}`);
  if(loading){
    return <> <h3>Products are loading </h3></>
  }
  return (
    
    <div>
      <h1>SHOP</h1>
      {products.length > 0 ? (products.map(product=>{
        
        return(
         <div key={product.id} style={styles.productCard}>
            <img src={imagePath.default} alt={product.name} />
            <h2>{product.name}</h2>
              <p>{product.description}</p>
              <p><strong>${product.price.toFixed(2)}</strong></p>
         </div>
                                                                           
  ); 
  })): ( <><h3>no producta available</h3></>) }
      
    </div>
  );
  
}
const styles = {
    productCard: {
      border: '1px solid #ddd',
      borderRadius: '8px',
      padding: '20px',
      textAlign: 'center',
      margin: '10px',
      boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)',
    },
    productImage: {
      width: '100%',
      height: '150px',
      objectFit: 'cover',
    },
  };
export default ProductList
//this is my product list