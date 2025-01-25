import React, { useContext, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchProducts } from '../../redux/slices/productSlice';
import { fetchAllOrders } from '../../redux/slices/orderSlice';
import { fetchUsers } from '../../redux/slices/authSlice';

const Dashboard = () => {
    const dispatch = useDispatch();
    const {data} = useSelector((state)=>state.products.products);
    const {orders} = useSelector((state)=>state.order);
    const {users} = useSelector((state)=>state.auth);

    useEffect(()=>{
        dispatch(fetchProducts());
    },[dispatch]);

    useEffect(()=>{
        dispatch(fetchAllOrders());
    },[dispatch]);

    useEffect(()=>{
        dispatch(fetchUsers());
    },[dispatch]);

  return (



    <div className="p-6 bg-gradient-to-r from-gray-100 to-gray-200 min-h-screen">
    <h2 className="text-3xl font-extrabold text-gray-800 mb-8 text-center">Dashboard Overview</h2>
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        <div className="bg-white shadow-lg rounded-xl p-6 flex flex-col items-center hover:shadow-2xl hover:-translate-y-2 transition-transform duration-300">
            <p className="text-gray-500 text-lg">Total Products</p>
            <h3 className="text-4xl font-extrabold text-blue-600 transition-colors duration-200">{data.length}</h3>
            <p className="text-gray-400 mt-2 text-sm">in the last month</p>
        </div>
        <div className="bg-white shadow-lg rounded-xl p-6 flex flex-col items-center hover:shadow-2xl hover:-translate-y-2 transition-transform duration-300">
            <p className="text-gray-500 text-lg">Total Orders</p>
            <h3 className="text-4xl font-extrabold text-green-600 transition-colors duration-200">{orders.data.length}</h3>
            <p className="text-gray-400 mt-2 text-sm">in the last month</p>
        </div>
        <div className="bg-white shadow-lg rounded-xl p-6 flex flex-col items-center hover:shadow-2xl hover:-translate-y-2 transition-transform duration-300">
            <p className="text-gray-500 text-lg">Total Customers</p>
            <h3 className="text-4xl font-extrabold text-yellow-600 transition-colors duration-200">{users.data.length}</h3>
            <p className="text-gray-400 mt-2 text-sm">in the last month</p>
        </div>
        <div className="bg-white shadow-lg rounded-xl p-6 flex flex-col items-center hover:shadow-2xl hover:-translate-y-2 transition-transform duration-300">
            <p className="text-gray-500 text-lg">Total Revenue</p>
            <h3 className="text-4xl font-extrabold text-red-600 transition-colors duration-200">₹102241</h3>
            <p className="text-gray-400 mt-2 text-sm">in the last month</p>
        </div>
    </div>
</div>


  )
}

export default Dashboard