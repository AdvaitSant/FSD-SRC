import React, { useEffect, useState, useCallback } from 'react';
import './Game.css';

const initialBoard = Array(9).fill(null);

function App() {
  const [board, setBoard] = useState(initialBoard);
  const [currentPlayer, setCurrentPlayer] = useState('X');
  const [winner, setWinner] = useState(null);
  const [username, setUsername] = useState('Guest'); // Set initial username to Guest
  const [gameResult, setGameResult] = useState(null);

  const handleCellClick = (index) => {
    if (board[index] || winner) return;

    const newBoard = [...board];
    newBoard[index] = currentPlayer;
    setBoard(newBoard);

    const result = calculateWinner(newBoard);
    if (result) {
      setWinner(result);
      setGameResult(result === 'X' ? 'win' : result === 'O' ? 'loss' : 'draw');
    } else if (newBoard.every(cell => cell)) {
      // Check for draw if all cells are filled
      setGameResult('draw');
    } else {
      setCurrentPlayer(currentPlayer === 'X' ? 'O' : 'X');
    }
  };

  const calculateWinner = (squares) => {
    const lines = [
      [0, 1, 2], [3, 4, 5], [6, 7, 8],
      [0, 3, 6], [1, 4, 7], [2, 5, 8],
      [0, 4, 8], [2, 4, 6],
    ];
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return squares[a];
      }
    }
    return null;
  };

  const handleGameEnd = useCallback(async () => {
    const moves = board.filter(Boolean).length;
    const response = await fetch('http://localhost:8080/game', {
      method: 'POST',
      body: JSON.stringify({ username, result: gameResult, moves }),
      headers: { 'Content-Type': 'application/json' },
    });
    const data = await response.json();
    console.log(data);
  }, [board, username, gameResult]);

  useEffect(() => {
    if (gameResult) {
      handleGameEnd();
    }
  }, [gameResult, handleGameEnd]);

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };

  const handleRestart = () => {
    setBoard(initialBoard);
    setCurrentPlayer('X');
    setWinner(null);
    setGameResult(null);
    setUsername('Guest'); // Reset username to Guest on restart
  };

  return (
    <div className="app">
      <div className="username-input">
        <input
          type="text"
          value={username}
          onChange={handleUsernameChange}
          placeholder="Enter username (optional)"
        />
      </div>
      <div className="game-container">
        <div className="board">
          {board.map((cell, index) => (
            <div key={index} className="cell" onClick={() => handleCellClick(index)}>
              {cell}
            </div>
          ))}
        </div>
        {winner && <div className="result">{winner} wins!</div>}
        {gameResult === 'draw' && <div className="result">It's a draw!</div>}
        <button onClick={handleRestart}>Restart Game</button>
      </div>
    </div>
  );
}

export default App;