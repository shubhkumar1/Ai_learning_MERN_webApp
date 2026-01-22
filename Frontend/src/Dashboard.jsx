import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Dashboard = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');

    // 1. If no token found, force logout immediately
    if (!token) {
      handleLogout();
      return;
    }

    // 2. Verify token with backend (checks if 5 days passed)
    axios.get('http://localhost:5000/api/me', {
      headers: { 'Authorization': token }
    })
    .then(res => {
      setUser(res.data); // Token is valid, save user data
    })
    .catch(err => {
      // If backend says token is expired (401 error)
      console.log("Session expired:", err);
      handleLogout();
    });
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token'); // Delete the key
    navigate('/login'); // Send back to login
  };

  if (!user) return <div>Loading Profile...</div>;

  return (
    <div style={{ padding: '40px', textAlign: 'center' }}>
      <h1>Welcome to your Dashboard</h1>
      <div style={{ border: '1px solid #ccc', padding: '20px', display: 'inline-block' }}>
        <h3>Student Profile</h3>
        <p><strong>ID:</strong> {user._id}</p>
        <p><strong>Name:</strong> {user.name}</p>
        <p><strong>Email:</strong> {user.email}</p>
        <p><strong>Class:</strong> {user.classLevel}</p>
        <p><strong>Mobile:</strong> {user.mobile}</p>
      </div>

      <br /><br />
      <button 
        onClick={handleLogout} 
        style={{ padding: '10px 20px', background: 'red', color: 'white', border: 'none', cursor: 'pointer' }}
      >
        Logout
      </button>
    </div>
  );
};

export default Dashboard;