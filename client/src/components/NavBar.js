import React from 'react';
import axios from 'axios';
import { NavLink } from 'react-router-dom';

const NavBar = () => {
  const baseUrl = 'http://localhost:5000';

  const logout = () => {
    axios.get(`${baseUrl}/api/auth/logout`)
      .then(response => {
        console.log(response);
      })
      .catch(error => {
        console.log(error);
      })

  }

  return (
    <div>
      <h2>Authentication app</h2>
      <NavLink to='/login'>Login</NavLink>
      <NavLink to='/register'>Register</NavLink>
      <NavLink to='/dashboard'>Dashboard</NavLink>
      <NavLink to='/' onClick={logout}>Logout</NavLink>
    </div>
  )
}

export default NavBar;
