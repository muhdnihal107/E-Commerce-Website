import React, { useContext, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchUsers } from '../../redux/slices/authSlice';

const Customers = () => {
  const dispatch = useDispatch();
  const {users} = useSelector((state)=>state.auth);
  useEffect(()=>{
    dispatch(fetchUsers());

  },[dispatch])


  return (
    <div className="p-6 bg-gray-100 min-h-screen">
  <h1 className="text-3xl font-bold mb-6 text-center">User Management</h1>

  <div className="overflow-x-auto">
    <table className="min-w-full bg-white rounded-lg shadow-md">
      <thead>
        <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
          <th className="py-3 px-6 text-left">User ID</th>
          <th className="py-3 px-6 text-left">Name</th>
          <th className="py-3 px-6 text-left">E-mail</th>
          <th className="py-3 px-6 text-left">Block</th>
          <th className="py-3 px-6 text-center">Action</th>

        </tr>
      </thead>
      <tbody className="text-gray-600 text-sm font-light">
        {users.data.map((item) => (
          <tr key={item.id} className="border-b border-gray-200 hover:bg-gray-100">
            <td className="py-3 px-6 text-left whitespace-nowrap">{item.id}</td>
            <td className="py-3 px-6 text-left">{item.name}</td>
            <td className="py-3 px-6 text-left">{item.email}</td>
            <td className={`py-3 px-6 text-left ${
    item.is_blocked ? 'text-red-500' : 'text-green-500'
  }`}>{item.is_blocked?"blocked user":"not Blocked"}</td>
            <td className="py-3 px-6 text-center">
              <Link to={`/admin/customers/${item.id}`}>
                <button className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition duration-200">
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

  )
}

export default Customers