// import React, { useContext } from 'react'
// import { ProductContext } from '../../context/ProductContext'
// import { Link } from 'react-router-dom';

// const ProductManagement = () => {
//   const {products,fetchProducts} = useContext(ProductContext);

//   return (
//     <div>
//       <h1>Product Management</h1>
//       <div>
//         <table>
//           <thead>
//             <tr>
//               <th>Product ID</th>
//               <th>Image</th>
//               <th>Name</th>
//               <th>Description</th>
//               <th>Price</th>
//               <th>Stock</th>
//               <th>Action</th>
//             </tr>
//           </thead>
//           <tbody>
//             {products.map((item)=>(
//               <tr key={item.id}>
//                 <td>{item.id}</td>
//                 <td><img src={item.image} alt="product img" /></td>
//                 <td>{item.name}</td>
//                 <td>{item.description}</td>
//                 <td>{item.price}</td>
//                 <td>{item.stock}</td>
//                 <td>
//                   <Link to={`/admin/productmanage/${item.id}`}>
//                   <button>View</button>
//                   </Link>
                  
//                 </td>
//               </tr>
//             ))}
            
//           </tbody>
//         </table>
//       </div>
//     </div>
//   )
// }

// export default ProductManagement






import React, { useContext } from 'react';
import { ProductContext } from '../../context/ProductContext';
import { Link } from 'react-router-dom';

const ProductManagement = () => {
  const { products } = useContext(ProductContext);

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
              <th className="py-3 px-6 text-left text-xs font-semibold text-gray-600 uppercase">Stock</th>
              <th className="py-3 px-6 text-left text-xs font-semibold text-gray-600 uppercase">Action</th>
            </tr>
          </thead>
          <tbody>
            {products.map((item) => (
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
                <td className="py-4 px-6">{item.stock}</td>
                <td className="py-4 px-6">
                  <Link to={`/admin/productmanage/${item.id}`}>
                    <button className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded transition duration-200">
                      View
                    </button>
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ProductManagement;
