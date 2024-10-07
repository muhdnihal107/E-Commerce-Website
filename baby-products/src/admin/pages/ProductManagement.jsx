import React, { useContext } from 'react'
import { ProductContext } from '../../context/ProductContext'

const ProductManagement = () => {
  const {products,fetchProducts} = useContext(ProductContext);

  return (
    <div>
      <h1>Product Management</h1>
      <div>
        <table>
          <thead>
            <tr>
              <th>Product ID</th>
              <th>Image</th>
              <th>Name</th>
              <th>Description</th>
              <th>Price</th>
              <th>Stock Quantity</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {products.map((item)=>(
              <tr>
                <td>{item.id}</td>
                <td><img src={item.image} alt="product img" /></td>
                <td>{item.name}</td>
                <td>{item.description}</td>
                <td>{item.price}</td>
                <td></td>
                <td></td>
              </tr>
            ))}
            
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default ProductManagement