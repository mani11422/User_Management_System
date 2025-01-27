import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => (
  <nav className="navbar">
    <h1>User Management Dashboard</h1>
    <ul>
      <li><Link to="/">Home</Link></li>
      <li><Link to="/add-user">Add User</Link></li>
    </ul>
  </nav>
);

export default Navbar;
