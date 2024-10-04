import React from 'react'
import bellLogo from '../assets/bell.png'
import searchLogo from '../assets/search.png'
import profileLogo from '../assets/account.png'

const AdminHeader = () => {
  return (
    <header>
        <div>
          <h1></h1>
        </div>
        <div>
          <ul>
            <li><img src={searchLogo} alt="search-logo" /></li>
            <li><img src={bellLogo} alt="bell-logo" /></li>
            <li><img src={profileLogo} alt="profile-logo" /></li>
          </ul>
        </div>
    </header>
  )
}

export default AdminHeader