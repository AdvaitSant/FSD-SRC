// TicTacToe.js
import React, { useState, useContext } from 'react';
import { UserContext } from '../context/UserContext'; // Adjust the path if necessary


const TicTacToe = () => {
    const [board, setBoard] = useState(Array(9).fill(null));
    const [isXNext, setIsXNext] = useState(true);
    const [secondPlayer, setSecondPlayer] = useState('');
    const { currentUser } = useContext(UserContext); // Get current user from context

    const handleClick = (index) => {
        if (board[index] || calculateWinner(board)) return;

        const newBoard = board.slice();
        newBoard[index] = isXNext ? currentUser : secondPlayer; // Update board based on current player
        setBoard(newBoard);
        setIsXNext(!isXNext);
    };

    const startGame = () => {
        const username = prompt("Enter second player's username:");
        const password = prompt("Enter second player's password:");
        
        // Validate second player credentials
        fetch('http://localhost:5000/api/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, password }),
        }).then(response => response.json())
          .then(data => {
              if (data.success) {
                  setSecondPlayer(username);
              } else {
                  alert(data.message);
              }
          });
    };

    const calculateWinner = (squares) => {
        // ... (same logic as before)
    };

    return (
        <div>
            <button onClick={startGame}>Start Game</button>
            <div>
                {board.map((cell, index) => (
                    <button key={index} onClick={() => handleClick(index)}>
                        {cell}
                    </button>
                ))}
            </div>
        </div>
    );
};

export default TicTacToe;
