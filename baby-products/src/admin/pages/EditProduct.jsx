import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { ProductContext } from '../../context/ProductContext';

const EditProduct = () => {
    const {products,editProduct} = useContext(ProductContext);
    const [editedProduct,setEditedProduct] = useState({
            id: '',
            name: '',
            description: '',
            price: 0,
            image: ''
            });
    
    const {id} =useParams();
    useEffect(()=>{
        const findProduct = products.find((item)=>item.id == id);
        if(findProduct){
            setEditedProduct(findProduct);
        }else{
            console.log('Product not found');
            
        }
    },[id,products]);

    const handleChange = (e)=>{
        const name = e.target.name;
        const value = e.target.value;
        setEditedProduct({...editedProduct,[name]:value});
    };

    const handleSubmit = async(e)=>{
        e.preventDefault();
        const success = await editProduct(editedProduct.id,editedProduct);
        if(success){
            setEditedProduct({
                id: '',
                name: '',
                description: '',
                price: 0,
                image: ''
            });
        };

    };
    
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <h1 className="text-2xl font-bold mb-6 text-gray-800">Edit Product</h1>
      <div className="bg-white shadow-md rounded-lg p-8 w-full max-w-lg">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="product-id" className="block text-gray-700 font-medium mb-2">Product ID</label>
            <input
              type="number"
              name="id"
              id="product-id"
              placeholder={editedProduct.id}
              value={editedProduct.id}
              onChange={handleChange}
              className="w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 p-2"
            />
          </div>
          <div>
            <label htmlFor="product-name" className="block text-gray-700 font-medium mb-2">Product Name</label>
            <input
              type="text"
              name="name"
              id="product-name"
              placeholder={editedProduct.name}
              value={editedProduct.name}
              onChange={handleChange}
              className="w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 p-2"
            />
          </div>
          <div>
            <label htmlFor="product-description" className="block text-gray-700 font-medium mb-2">Product Description</label>
            <textarea
              name="description"
              id="product-description"
              placeholder={editedProduct.description}
              value={editedProduct.description}
              onChange={handleChange}
              className="w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 p-2"
            ></textarea>
          </div>
          <div>
            <label htmlFor="product-price" className="block text-gray-700 font-medium mb-2">Product Price</label>
            <input
              type="number"
              name="price"
              id="product-price"
              placeholder={editedProduct.price}
              value={editedProduct.price}
              onChange={handleChange}
              className="w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 p-2"
            />
          </div>
          <div>
            <label htmlFor="product-image" className="block text-gray-700 font-medium mb-2">Product Image</label>
            <input
              type="text"
              name="image"
              id="product-image"
              placeholder={editedProduct.image}
              value={editedProduct.image}
              onChange={handleChange}
              className="w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 p-2"
            />
          </div>
          <div>
            <button
              type="submit"
              className="w-full bg-blue-500 text-white py-2 px-4 rounded-md shadow-md hover:bg-blue-600 focus:ring-2 focus:ring-blue-400 focus:ring-opacity-50 transition duration-150"
            >
              Edit Product
            </button>
          </div>
        </form>
      </div>
   </div>
   
  )
}

export default EditProduct