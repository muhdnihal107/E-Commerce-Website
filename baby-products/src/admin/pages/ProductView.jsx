import React, { useContext, useEffect, useState } from 'react'
import { ProductContext } from '../../context/ProductContext'
import { Link, useParams } from 'react-router-dom';

const ProductView = () => {
    const {products,deleteProduct} = useContext(ProductContext);
    const [product,setProduct] = useState(null);
    const {id} = useParams();

    useEffect(()=>{
        const findProduct = products.find((item)=> item.id == parseInt(id));
        setProduct(findProduct);
    },[id,products]);

    if (!product) {
        return <p className="text-red-500 text-xl font-semibold">Product not found</p>;  
      }
  return (
    <div className="container mx-auto p-8">
        <h1 className="text-4xl font-bold text-gray-800 mb-6">Product View</h1>
        
           <div className="bg-white shadow-lg rounded-lg overflow-hidden flex flex-col md:flex-row" key={product.id}>
        <img src={product.image} alt='product img' className="w-full md:w-1/2 object-cover h-64 md:h-auto"
        />
        <div className="p-6 md:p-8 w-full md:w-1/2">
           <h2 className="text-2xl font-bold text-gray-900 mb-4">{product.name}</h2>
        <p className="text-lg text-gray-700 mb-2">ID:{product.id}</p>
        <p className="text-lg text-gray-700 mb-4">{product.description}</p>
        <p className="text-2xl font-semibold text-gray-800 mb-2">Price: ₹{product.price}</p>
        <p className="text-lg font-semibold text-gray-600 mb-4">Stock: {product.stock}</p>
        <div>
            <button onClick={()=>deleteProduct(product.id)}
                className="bg-red-600 text-white font-semibold py-2 px-4 rounded hover:bg-red-700 transition duration-300 ease-in-out"
                >Delete Product</button>
                <Link to={`/admin/productmanage/edit/${product.id}`}>
                <button className="bg-blue-600 text-white font-semibold py-2 px-4 rounded hover:bg-blue-900 transition duration-300 ease-in-out"
  
                >Edit Product</button>
                </Link>
        </div> 
        </div>
        
      </div> 

        
    </div>
  )
}

export default ProductView



