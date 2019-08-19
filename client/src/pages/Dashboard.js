import React, { useState, useEffect } from 'react';
import axios from 'axios';
import NavBar from '../components/NavBar';
import UserList from '../components/UserList';

const Dashboard = () => {
  const [users, setUsers] = useState([]);
  
  const baseUrl = 'http://localhost:5000';
  useEffect(() => {
    axios.get(`${baseUrl}/api/users`)
      .then(response => {
        console.log(response);
        setUsers(response.data);
      })
      .catch(error => {
        console.log(error);
      })
  }, [])

  return (
    <div>
      <NavBar />
      <UserList users={users} />
    </div>
  )
}

export default Dashboard;