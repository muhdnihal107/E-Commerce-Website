import React, { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logoutUser } from '../redux/slices/authSlice';

const Profile = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { user, refreshToken, accessToken, isAuthenticated, loading, error } = useSelector((state) => state.auth);

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
    }
  }, [isAuthenticated, navigate]);

  const handleLogout = () => {
    try{
      dispatch(logoutUser(refreshToken));

    }catch{
      console.log('error in dispatch in profile page ')
    }
    navigate('/');
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <div className="max-w-4xl mx-auto bg-rgb(190, 128, 128) rounded-xl shadow-lg p-8 mt-10">
    <h1 className="text-3xl font-semibold text-center text-gray-900 mb-6">
      Profile
    </h1>
  
    {user ? (
      <div className="profile-info space-y-6">
        <div className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 p-6 rounded-lg shadow-md text-white transition-transform duration-300 hover:scale-105">
          <p className="text-lg font-medium text-black">
            Name: <span className="font-bold text-black">{user.name}</span>
          </p>
          <p className="text-lg font-medium text-black">
            Email: <span className="font-bold text-black">{user.email}</span>
          </p>
        </div>
  
        <div className="flex justify-center">
          <button
            onClick={handleLogout}
            className="bg-gradient-to-r from-red-500 to-red-700 text-white font-semibold py-2 px-6 rounded-full shadow-md hover:from-red-600 hover:to-red-800 focus:outline-none focus:ring-4 focus:ring-red-300 transform hover:scale-105 active:scale-95 transition-all duration-300 ease-in-out"
          >
            Logout
          </button>
        </div>
      </div>
    ) : (
      <p className="text-center text-lg text-gray-600 mt-4">
        Please log in to view your profile.
      </p>
    )}
  </div>
  

  );
};

export default Profile;
