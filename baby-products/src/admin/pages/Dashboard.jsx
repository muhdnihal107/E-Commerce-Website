import React, { useContext } from 'react'
import { OrderContext } from '../../context/OrderContext'
import { AuthContext } from '../../context/AuthContext';

const Dashboard = () => {
  const { totalOrders,fetchOrder } = useContext(OrderContext);
  const { totalUser,fetchUser } = useContext(AuthContext);
  return (
    <div>
      <div>
        <div>
          <p>Total Sales</p>
          <h3></h3>
          <p>in the last month</p>
        </div>
        <div>
          <p>Total Orders</p>
          <h3>{totalOrders.length}</h3>
          <p>in the last month</p>
        </div>
        <div>
          <p>Total Customers</p>
          <h3>{totalUser.length}</h3>
          <p>in the last month</p>
        </div>
        <div>
          <p>Total Revenue</p>
          <h3></h3>
          <p>in the last month</p>
        </div>
      </div>
    </div>
  )
}

export default Dashboard