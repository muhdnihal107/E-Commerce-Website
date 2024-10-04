import React from 'react'
import { Link } from 'react-router-dom'

const Sidebar = () => {
  return (
    <nav>
      <div>
        <img src="" alt="" />
      </div>
      <nav>
        <ul>
          <li><Link to={'/admin/dashboard'}>Dashboard</Link></li>
          <li><Link to={'/admin/productmanage'}>Products</Link></li>
          <li><Link to={'/admin/ordermanage'}>Order</Link></li>
          <li><Link to={'/admin/users'}>Users</Link></li>
          <li><Link to={'/admin/settings'}>Settings</Link></li>
        </ul>
      </nav>
    </nav>
  )
}

export default Sidebar