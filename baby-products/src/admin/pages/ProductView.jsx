import React, {  useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { deleteProduct, fetchProductdetail } from '../../redux/slices/productSlice';

const ProductView = () => {
    // const [product,setProduct] = useState(null);
    const dispatch = useDispatch();
    const {data} = useSelector((state)=>state.products.productdetails);
    const {success,error,loading} = useSelector((state)=>state.products.deleteStatus);
    const {id} = useParams();
    const navigate = useNavigate();

    useEffect(()=>{
      dispatch(fetchProductdetail(id));
    },[dispatch,id])


    const handleDelete = ()=>{
       dispatch(deleteProduct(id));
       navigate('/admin/productmanage')
    };

    // if (!product) {
    //     return <p className="text-red-500 text-xl font-semibold">Product not found</p>;  
    //   }
  return (
    <div className="container mx-auto p-8">
        <h1 className="text-4xl font-bold text-gray-800 mb-6">Product View</h1>
        
           <div className="bg-white shadow-lg rounded-lg overflow-hidden flex flex-col md:flex-row" key={data.id}>
        <img src={data.image} alt='product img' className="w-full md:w-1/2 object-cover h-64 md:h-auto"
        />
        <div className="p-6 md:p-8 w-full md:w-1/2">
           <h2 className="text-2xl font-bold text-gray-900 mb-4">{data.name}</h2>
        <p className="text-lg text-gray-700 mb-2">ID:{data.id}</p>
        <p className="text-lg text-gray-700 mb-4">{data.description}</p>
        <p className="text-2xl font-semibold text-gray-800 mb-2">Price: ₹{data.price}</p>
        <p className="text-lg font-semibold text-gray-600 mb-4">Stock: {data.stock}</p>
        <div>
            <button onClick={handleDelete}
                className="bg-red-600 text-white font-semibold py-2 px-4 rounded hover:bg-red-700 transition duration-300 ease-in-out"
                >Delete Product</button>
                <Link to={`/admin/productmanage/edit/${data.id}`}>
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



