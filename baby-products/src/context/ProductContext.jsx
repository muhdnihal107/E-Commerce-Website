import React, { createContext, useEffect, useState } from 'react'
import axios from 'axios';

export const ProductContext = createContext();
const ProductProvider = ({children}) => {
    const [products, setProducts] = useState([]);
    const [loading,setLoading] = useState(true);

    const fetchProducts = async ()=>{
      setLoading(true);
        try{
          const responce = await axios.get('http://localhost:5000/products');
          setProducts(responce.data);
           
        }catch (error){
            console.log('Error in fetching data',error);
            
        }finally{
          setLoading(false);
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