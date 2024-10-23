import React from 'react';
import { Link } from 'react-router-dom'; // Use Link for client-side routing
import './Navbar.css';

function Navbar() {
  return (
    <header className="navbar">
      <div className="logo">E-Sports Analytics</div>
      <nav>
        <ul>
          <li><Link to="/">Home</Link></li>
          <li><Link to="/dashboard">Dashboard</Link></li>
          <li><Link to="/teams">Teams</Link></li>
          <li><Link to="/game">Game</Link></li> {/* Add Game tab */}
          <li><Link to="/about">About</Link></li>
          <li><Link to="/login" className="login-btn">Sign In</Link></li>
          
        </ul>
      </nav>
    </header>
  );
}

export default Navbar;
