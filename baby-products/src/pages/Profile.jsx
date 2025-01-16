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
    <div className="profile-container">
      <h1>Profile</h1>
      {user ? (
        <div className="profile-info">
          <p><strong>Name:</strong> {user.name}</p>
          <p><strong>Email:</strong> {user.email}</p>

          <button onClick={handleLogout} className="logout-button">
            Logout
          </button>
        </div>
      ) : (
        <p>Please log in to view your profile.</p>
      )}
    </div>
  );
};

export default Profile;
