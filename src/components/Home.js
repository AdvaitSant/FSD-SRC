// components/Home.js
import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css';

const Home = () => {
    return (
        <div className="home">
            <h1>Welcome to Tic Tac Toe!</h1>
              <h2>Please Sign In </h2>
            <p>Select an option below:</p>
            <ul>
                <li><Link to="/dashboard">Dashboard</Link></li>
                <li><Link to="/about">About the App</Link></li>
            </ul>
        </div>
    );
};

export default Home;
