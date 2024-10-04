import React from 'react'
import AdminHeader from './components/AdminHeader'
import Sidebar from './components/Sidebar'
import { Outlet } from 'react-router-dom'

const AdminLayout = () => {
  return (
    <div>
        <AdminHeader />
        <div>
            <Sidebar />
            <main>
                <Outlet />
            </main>
        </div>
    </div>
  )
}

export default AdminLayout