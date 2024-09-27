import React, { createContext, useEffect, useState } from 'react'
import axios from 'axios';

export const ProductContext = createContext();
const ProductProvider = ({children}) => {
    const [products, setProducts] = useState([]);
    const [loading,setLoading] = useState(false);

    const fetchProducts = async ()=>{
        try{
          const responce = await axios.get('http://localhost:5000/products');
          setProducts(responce.data);
          setLoading(false);  
        }catch (error){
            console.log('Error in fetching data',error);
            
        }
        
    }

    useEffect(()=>{
        fetchProducts();
    },[])
  return (
   <ProductContext.Provider  value={{products,loading}}>
    {children}
   </ProductContext.Provider>
  )
}

export default ProductProvider
// this my product context