import React from 'react'
import AdminHeader from './components/AdminHeader'
import Sidebar from './components/Sidebar'
import { Outlet } from 'react-router-dom'
import './admin.css'; // Path to your admin.css file


const AdminLayout = () => {
  return (
    <div className="min-h-screen flex flex-col"> {/* Ensures the layout spans full height */}
        <AdminHeader />
        <div className="flex flex-1">
            <Sidebar />
            <main className="flex-1 p-4 bg-gray-100"> {/* Adds some padding and background */}
                <Outlet />
            </main>
        </div>
    </div>
  )
}


export default AdminLayout