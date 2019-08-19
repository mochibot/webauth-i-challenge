import React from 'react';
import { NavLink } from 'react-router-dom';

const NavBar = () => {
  return (
    <div>
      <h2>Authentication app</h2>
      <NavLink to='/login'>Login</NavLink>
      <NavLink to='/register'>Register</NavLink>
      <NavLink to='/dashboard'>Dashboard</NavLink>
    </div>
  )
}

export default NavBar;
