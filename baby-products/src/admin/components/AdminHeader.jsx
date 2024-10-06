import React from 'react';
import bellLogo from '../assets/bell.png';
import searchLogo from '../assets/search.png';
import profileLogo from '../assets/account.png';

const AdminHeader = () => {
  return (
    <header className="bg-gray-200 text-gray-800 flex items-center justify-between p-4 shadow"> {/* Changed to a lighter gray */}
      <div className="flex items-center">
        <h1 className="text-xl font-bold">Admin Panel</h1>
      </div>
      <div>
        <ul className="flex space-x-4">
          <li>
            <img src={searchLogo} alt="Search" className="h-6 w-6 hover:opacity-75 transition duration-200" />
          </li>
          <li>
            <img src={bellLogo} alt="Notifications" className="h-6 w-6 hover:opacity-75 transition duration-200" />
          </li>
          <li>
            <img src={profileLogo} alt="Profile" className="h-6 w-6 hover:opacity-75 transition duration-200" />
          </li>
        </ul>
      </div>
    </header>
  );
}

export default AdminHeader;
