
import React, { createContext, useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export const ProductContext = createContext();

const ProductProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const navigate = useNavigate();
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
 
  const updateStock = async(productId,placedQuantity)=>{
     const updatedProducts = products.map((item)=>{
      if(item.id == productId){
        if(item.stock >= placedQuantity){
          return{...products,stock: item.stock - placedQuantity};
        }
        else{
          console.log('Not enough stock available');
        }
      }
      return item;
     });
     setProducts(updatedProducts);
     const updatedProduct = updatedProducts.find(item =>item.id==productId);
     if(updatedProduct){
      try{
        const responce = await axios.post(`http://localhost:4000/products/${productId}`,updatedProduct);
        console.log("updated stock data",responce.data);
        
     }catch (error){
      console.error('Error updating product stock:', error);
     }
     }
     
  };

  const deleteProduct = async(productId)=>{
    try{
     const responce = await axios.delete(`http://localhost:4000/products/${productId}`);
     setProducts((prevProducts) => prevProducts.filter((product) => product.id !== productId));
     navigate('/admin/productmanage')
    }catch (error){
      console.error('error during delete product'); 
    }
  };

  const addProduct = async(newProduct)=>{
    try{
      const responce = await axios.post('http://localhost:4000/products', newProduct);
      const addedProduct = responce.data;
      console.log(addedProduct);
      setProducts(addedProduct);
      
    }catch(error) {
      console.error('Error during Add new product');
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
    <ProductContext.Provider value={{ products: filteredProducts, loading, searchProducts ,updateStock,addProduct,deleteProduct}}>
      {children}
    </ProductContext.Provider>
  );
};

export default ProductProvider;
