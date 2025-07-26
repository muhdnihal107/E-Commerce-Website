import React, { useEffect } from 'react';
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
    try {
      dispatch(logoutUser(refreshToken));
    } catch {
      console.log('Error in dispatch in profile page');
    }
    navigate('/');
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <div className="relative w-20 h-20">
          <div className="absolute top-0 left-0 w-full h-full border-4 border-t-blue-600 border-r-transparent border-b-transparent border-l-blue-600 rounded-full animate-spin"></div>
          <div className="absolute top-2.5 left-2.5 w-14 h-14 border-4 border-t-indigo-500 border-r-transparent border-b-transparent border-l-indigo-500 rounded-full animate-spin-slow"></div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <p className="text-red-600 text-2xl font-semibold font-sans">Error: {error}</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 min-h-screen bg-gray-50">
      <div className="max-w-2xl mx-auto bg-white rounded-3xl shadow-xl p-8 sm:p-10">
        <h1 className="text-4xl font-bold text-gray-900 font-sans text-center mb-8">Your Profile</h1>

        {user ? (
          <div className="space-y-8">
            <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-8 rounded-2xl shadow-lg text-white transition-all duration-300 hover:shadow-2xl hover:-translate-y-1">
              <div className="flex items-center gap-6 mb-6">
                <div className="w-20 h-20 rounded-full bg-white/20 flex items-center justify-center">
                  <span className="text-3xl font-semibold text-white">{user.name.charAt(0).toUpperCase()}</span>
                </div>
                <div>
                  <p className="text-xl font-semibold text-white">Welcome, {user.name}!</p>
                  <p className="text-sm text-blue-100">Manage your account details below.</p>
                </div>
              </div>
              <div className="space-y-4">
                <p className="text-lg font-medium text-white">
                  Name: <span className="font-bold">{user.name}</span>
                </p>
                <p className="text-lg font-medium text-white">
                  Email: <span className="font-bold">{user.email}</span>
                </p>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <button
                onClick={handleLogout}
                className="w-full sm:w-auto px-8 py-3 bg-red-600 text-white text-base font-medium font-sans rounded-lg hover:bg-red-700 focus:ring-4 focus:ring-red-300 transition-all duration-300 hover:scale-105 active:scale-95"
                aria-label="Logout"
              >
                Logout
              </button>
              <button
                onClick={() => navigate('/edit-profile')}
                className="w-full sm:w-auto px-8 py-3 bg-blue-600 text-white text-base font-medium font-sans rounded-lg hover:bg-blue-700 focus:ring-4 focus:ring-blue-300 transition-all duration-300 hover:scale-105 active:scale-95"
                aria-label="Edit Profile"
              >
                Edit Profile
              </button>
            </div>
          </div>
        ) : (
          <p className="text-center text-lg text-gray-600 font-sans mt-6">
            Please log in to view your profile.
          </p>
        )}
      </div>
    </div>
  );
};

export default Profile;