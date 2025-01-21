import React, {  useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchProducts } from '../../redux/slices/productSlice';

const ProductManagement = () => {
  const dispatch =  useDispatch();
  const {products} = useSelector((state)=>state.products);

   useEffect(() => {
      dispatch(fetchProducts());
    }, [dispatch]);


if (products.loading) {
  return (<h3>Products are loading...</h3>);
}
  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold text-gray-800 mb-8">Product Management</h1>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-lg">
          <thead>
            <tr className="bg-gray-100">
              <th className="py-3 px-6 text-left text-xs font-semibold text-gray-600 uppercase">Product ID</th>
              <th className="py-3 px-6 text-left text-xs font-semibold text-gray-600 uppercase">Image</th>
              <th className="py-3 px-6 text-left text-xs font-semibold text-gray-600 uppercase">Name</th>
              <th className="py-3 px-6 text-left text-xs font-semibold text-gray-600 uppercase">Description</th>
              <th className="py-3 px-6 text-left text-xs font-semibold text-gray-600 uppercase">Price</th>
              <th className="py-3 px-6 text-left text-xs font-semibold text-gray-600 uppercase">Action</th>
            </tr>
          </thead>
          <tbody>
            {products != null?products.data.map((item) => (
              <tr key={item.id} className="border-b border-gray-200">
                <td className="py-4 px-6">{item.id}</td>
                <td className="py-4 px-6">
                  <img
                    src={item.image}
                    alt="product img"
                    className="h-16 w-16 object-cover rounded-lg shadow-sm"
                  />
                </td>
                <td className="py-4 px-6">{item.name}</td>
                <td className="py-4 px-6">{item.description}</td>
                <td className="py-4 px-6">₹{item.price}</td>
                <td className="py-4 px-6">
                  <Link to={`/admin/productmanage/${item.id}`}>
                    <button className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded transition duration-200">
                      View
                    </button>
                  </Link>
                </td>
              </tr>
            )):(
              <div>
                <p>
                  loading
                </p>
              </div>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ProductManagement;
