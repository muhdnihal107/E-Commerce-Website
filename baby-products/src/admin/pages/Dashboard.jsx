import React, { useContext } from 'react'
import { OrderContext } from '../../context/OrderContext'
import { AuthContext } from '../../context/AuthContext';
import { ProductContext } from '../../context/ProductContext';

const Dashboard = () => {
  const { totalOrders,fetchOrder } = useContext(OrderContext);
  const { totalUser,fetchUser } = useContext(AuthContext);
  const {products} = useContext(ProductContext);

  const totalRevenue = totalOrders.reduce((acc, order) => acc + order.totalAmount, 0);
  return (



    <div className="p-6 bg-gray-100">
    <h2 className="text-2xl font-bold mb-6">Dashboard Overview</h2>
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white shadow-md rounded-lg p-4 flex flex-col items-center">
            <p className="text-gray-500">Total Products</p>
            <h3 className="text-3xl font-bold text-gray-800">{products.length}</h3>
            <p className="text-gray-500">in the last month</p>
        </div>
        <div className="bg-white shadow-md rounded-lg p-4 flex flex-col items-center">
            <p className="text-gray-500">Total Orders</p>
            <h3 className="text-3xl font-bold text-gray-800">{totalOrders.length}</h3>
            <p className="text-gray-500">in the last month</p>
        </div>
        <div className="bg-white shadow-md rounded-lg p-4 flex flex-col items-center">
            <p className="text-gray-500">Total Customers</p>
            <h3 className="text-3xl font-bold text-gray-800">{totalUser.length}</h3>
            <p className="text-gray-500">in the last month</p>
        </div>
        <div className="bg-white shadow-md rounded-lg p-4 flex flex-col items-center">
            <p className="text-gray-500">Total Revenue</p>
            <h3 className="text-3xl font-bold text-gray-800">₹{totalRevenue}</h3>
            <p className="text-gray-500">in the last month</p>
        </div>
    </div>
</div>

  )
}

export default Dashboard