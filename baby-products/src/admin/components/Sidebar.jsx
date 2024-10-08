import React from 'react';
import { Link } from 'react-router-dom';

const Sidebar = () => {
  return (
    // <nav className="bg-gray-800 text-white w-64 h-screen shadow-md"> {/* Set height to full screen */}
    //   <div className="flex items-center justify-center h-16 border-b border-gray-700">
    //     <img src="" alt="Logo" className="h-8" /> {/* Add your logo here */}
    //   </div>
    //   <nav className="mt-4">
    //     <ul className="space-y-2">
    //       <li>
    //         <Link
    //           to={'/admin/dashboard'}
    //           className="block py-2 px-4 rounded hover:bg-gray-700 transition duration-200"
    //         >
    //           Dashboard
    //         </Link>
    //       </li>
    //       <li>
    //         <Link
    //           to={'/admin/productmanage'}
    //           className="block py-2 px-4 rounded hover:bg-gray-700 transition duration-200"
    //         >
    //           Products
    //         </Link>
    //       </li>
    //       <li>
    //         <Link
    //           to={'/admin/ordermanage'}
    //           className="block py-2 px-4 rounded hover:bg-gray-700 transition duration-200"
    //         >
    //           Orders
    //         </Link>
    //       </li>
    //       <li>
    //         <Link
    //           to={'/admin/customers'}
    //           className="block py-2 px-4 rounded hover:bg-gray-700 transition duration-200"
    //         >
    //           Customers
    //         </Link>
    //       </li>
    //       <li>
    //         <Link
    //           to={'/admin/settings'}
    //           className="block py-2 px-4 rounded hover:bg-gray-700 transition duration-200"
    //         >
    //           Settings
    //         </Link>
    //       </li>
    //     </ul>
    //   </nav>
    // </nav>
    <nav className="bg-gray-800 text-white w-64 h-screen shadow-md flex flex-col"> {/* Set height to full screen and use flex */}
  <div className="flex items-center justify-center h-16 border-b border-gray-700">
    <img src="" alt="Logo" className="h-8" /> {/* Add your logo here */}
  </div>
  <nav className="mt-4 flex-grow"> {/* Allow the nav to grow and fill the remaining space */}
    <ul className="space-y-2">
      <li>
        <Link
          to={'/admin/dashboard'}
          className="block py-2 px-4 rounded hover:bg-gray-700 transition duration-200"
        >
          Dashboard
        </Link>
      </li>
      <li>
        <Link
          to={'/admin/productmanage'}
          className="block py-2 px-4 rounded hover:bg-gray-700 transition duration-200"
        >
          Products
        </Link>
      </li>
      <li>
        <Link
          to={'/admin/ordermanage'}
          className="block py-2 px-4 rounded hover:bg-gray-700 transition duration-200"
        >
          Orders
        </Link>
      </li>
      <li>
        <Link
          to={'/admin/customers'}
          className="block py-2 px-4 rounded hover:bg-gray-700 transition duration-200"
        >
          Customers
        </Link>
      </li>
      <li>
        <Link
          to={'/admin/addproduct'}
          className="block py-2 px-4 rounded hover:bg-gray-700 transition duration-200"
        >
          Add Products
        </Link>
      </li>
    </ul>
  </nav>
</nav>

  );
}

export default Sidebar;
