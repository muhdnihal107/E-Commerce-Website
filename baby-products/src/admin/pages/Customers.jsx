import React, { useContext } from 'react'
import { AuthContext } from '../../context/AuthContext'

const Customers = () => {
  const {totalUser} = useContext(AuthContext);
  return (
    <div>
      <h1>User Managment</h1>
      <div>
        <table>
          <thead>
            <tr>
            <th>User ID</th>
            <th>Name</th>
            <th>E-mail</th>
            <th>Password</th>
            <th>Cart</th>
            <th>Action</th>
          </tr>
          </thead>
          <tbody>
            {totalUser.map((item)=>(
            <tr key={item.id}>
              <td>{item.id}</td>
              <td>{item.name}</td>
              <td>{item.email}</td>
              <td>{item.password}</td>
              <td></td>
            </tr>
            ))}
            
          </tbody>

        </table>
      </div>
    </div>
  )
}

export default Customers