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



    <div className="p-6 bg-gray-100">
    <h2 className="text-2xl font-bold mb-6">Dashboard Overview</h2>
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white shadow-md rounded-lg p-4 flex flex-col items-center">
            <p className="text-gray-500">Total Products</p>
            <h3 className="text-3xl font-bold text-gray-800">{data.length}</h3>
            <p className="text-gray-500">in the last month</p>
        </div>
        <div className="bg-white shadow-md rounded-lg p-4 flex flex-col items-center">
            <p className="text-gray-500">Total Orders</p>
            <h3 className="text-3xl font-bold text-gray-800">{orders.data.length}</h3>
            <p className="text-gray-500">in the last month</p>
        </div>
        <div className="bg-white shadow-md rounded-lg p-4 flex flex-col items-center">
            <p className="text-gray-500">Total Customers</p>
            <h3 className="text-3xl font-bold text-gray-800">{users.data.length}</h3>
            <p className="text-gray-500">in the last month</p>
        </div>
        <div className="bg-white shadow-md rounded-lg p-4 flex flex-col items-center">
            <p className="text-gray-500">Total Revenue</p>
            <h3 className="text-3xl font-bold text-gray-800">₹102241</h3>
            <p className="text-gray-500">in the last month</p>
        </div>
    </div>
</div>

  )
}

export default Dashboard