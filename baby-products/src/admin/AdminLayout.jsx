import React from 'react'
import AdminHeader from './components/AdminHeader'
import Sidebar from './components/Sidebar'
import { Outlet } from 'react-router-dom'
import './admin.css'; 


const AdminLayout = () => {
  return (
    <div className="min-h-screen flex flex-col"> 
        <AdminHeader />
        <div className="flex flex-1">
            <Sidebar />
            <main className="flex-1 p-4 bg-gray-100"> 
                <Outlet />
            </main>
        </div>
    </div>
  )
}


export default AdminLayout