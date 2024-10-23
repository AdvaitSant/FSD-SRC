import React, { useState } from 'react';

const Register = () => {
    const [username, setUsername] = useState('');
    const [message, setMessage] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!username) {
            setMessage('Please enter a username.');
            return;
        }

        const response = await fetch('http://localhost:5000/api/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username }),
        });

        if (response.ok) {
            setMessage('Registration successful!');
            setUsername(''); // Clear the input field
        } else {
            setMessage('Error registering player. Please try again.');
        }
    };

    return (
        <div>
            <h2>Register Player</h2>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="Enter username"
                />
                <button type="submit">Register</button>
            </form>
            {message && <p>{message}</p>}
        </div>
    );
};

export default Register;
