// import React, { createContext, useEffect, useState } from 'react'
// import axios from 'axios';

// export const ProductContext = createContext();
// const ProductProvider = ({children}) => {
//     const [products, setProducts] = useState([]);
//     const [loading,setLoading] = useState(true);
//     const [filteredProducts, setFilteredProducts] = useState([]);

//      useEffect(()=>{
//         fetchProducts();
//     },[]);

//     const fetchProducts = async ()=>{
//       setLoading(true);
//         try{
//           const responce = await axios.get('http://localhost:5000/products');
//           setProducts(responce.data);
//            setFilteredProducts(responce.data);
//         }catch (error){
//             console.log('Error in fetching data',error);
            
//         }finally{
//           setLoading(false);
//         }   
        
//     };

//     const searchProducts = (query) => {
//       const lowercasedQuery = query.toLowerCase();
//       const filtered = products.filter(product =>
//         product.name.toLowerCase().includes(lowercasedQuery) ||
//         product.description.toLowerCase().includes(lowercasedQuery)
//       );
//       setFilteredProducts(filtered); // Set filtered products based on search
//     };
    
//   return (
//    <ProductContext.Provider  value={{products : filteredProducts, loading, searchProducts}}>
//     {children}
//    </ProductContext.Provider>
//   )
// }

// export default ProductProvider
// // this my product context





import React, { createContext, useEffect, useState } from 'react';
import axios from 'axios';

export const ProductContext = createContext();

const ProductProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filteredProducts, setFilteredProducts] = useState([]);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const response = await axios.get('http://localhost:4000/products');
      setProducts(response.data);
      setFilteredProducts(response.data); 
    } catch (error) {
      console.log('Error in fetching data', error);
    } finally {
      setLoading(false);
    }
  };

  const searchProducts = (query) => {
    const lowercasedQuery = query.toLowerCase();
    const filtered = products.filter((product) =>
      product.name.toLowerCase().includes(lowercasedQuery) ||
      product.description.toLowerCase().includes(lowercasedQuery)
    );
    setFilteredProducts(filtered);
  };

  return (
    <ProductContext.Provider value={{ products: filteredProducts, loading, searchProducts }}>
      {children}
    </ProductContext.Provider>
  );
};

export default ProductProvider;
