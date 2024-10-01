import React, { useContext } from 'react';
import { AuthContext } from '../context/AuthContext'; 
import { useNavigate } from 'react-router-dom';

const Profile = () => {
  const { user, logout } = useContext(AuthContext); 
  const navigate = useNavigate();

  const handleLogout = () => {
    logout(); 
    navigate('/'); 
  };

  return (
    <div className="profile-container">
      <h1>Profile</h1>
      {user ? (
        <div className="profile-info">
          <p><strong>Name:</strong> {user.username}</p>
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
