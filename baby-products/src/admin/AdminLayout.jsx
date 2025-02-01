import React, { useEffect } from 'react'
import AdminHeader from './components/AdminHeader'
import Sidebar from './components/Sidebar'
import { Outlet, useNavigate } from 'react-router-dom'
import './admin.css'; 
import { useSelector } from 'react-redux';


const AdminLayout = () => {

  const {user} = useSelector((state)=>state.auth);
  const navigate=useNavigate()

  useEffect(()=>{
    if(user?.is_staff){

    }else{
      navigate('/')
    }
  },[])
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