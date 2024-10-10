import React from 'react';
import homeLogo from '../assets/home.png';
import searchLogo from '../assets/search.png';
import profileLogo from '../assets/account.png';
import { Link } from 'react-router-dom';

const AdminHeader = () => {
  return (
    <header className="bg-gray-200 text-gray-800 flex items-center justify-between p-4 shadow">
      <div className="flex items-center">
        <h1 className="text-xl font-bold">Admin Panel</h1>
      </div>
      <div>
        <ul className="flex space-x-4">
          <li>
            <img src={searchLogo} alt="Search" className="h-6 w-6 hover:opacity-75 transition duration-200" />
          </li>
          <li>
            <Link to={'/'}>
            <img src={homeLogo} alt="Notifications" className="h-6 w-6 hover:opacity-75 transition duration-200" />
            </Link>
          </li>
          <li>
            <Link to={'/profile'}>
            <img src={profileLogo} alt="Profile" className="h-6 w-6 hover:opacity-75 transition duration-200" />
          </Link>
          </li>
        </ul>
      </div>
    </header>
  );
}

export default AdminHeader;
