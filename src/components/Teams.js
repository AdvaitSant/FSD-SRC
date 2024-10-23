import React, { useEffect, useState } from 'react';

const Teams = () => {
  const [players, setPlayers] = useState([]);
  const [editedPlayer, setEditedPlayer] = useState(null);

  const fetchPlayers = async () => {
    try {
      const response = await fetch('http://localhost:8080/api/players');
      const data = await response.json();
      setPlayers(data);
    } catch (error) {
      console.error('Error fetching player data:', error);
    }
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditedPlayer((prev) => ({ ...prev, [name]: value }));
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();

    if (!editedPlayer || !editedPlayer._id) {
      console.error('No player data to update');
      return;
    }

    try {
      const response = await fetch('http://localhost:8080/api/players/${editedPlayer._id}', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(editedPlayer),
      });

      if (response.ok) {
        fetchPlayers(); // Refresh the player list after editing
        setEditedPlayer(null); // Clear the edit state
      } else {
        const errorData = await response.json();
        console.error('Failed to update player data:', errorData);
      }
    } catch (error) {
      console.error('Error updating player data:', error);
    }
  };

  useEffect(() => {
    fetchPlayers(); // Fetch initially
  }, []);

  return (
    <div>
      <h1>Players</h1>
      {editedPlayer && (
        <form onSubmit={handleEditSubmit}>
          <h2>Edit Player</h2>
          <input
            name="username"
            value={editedPlayer.username}
            onChange={handleEditChange}
            placeholder="Username"
          />
          <input
            name="totalGames"
            type="number"
            value={editedPlayer.totalGames}
            onChange={handleEditChange}
            placeholder="Total Games"
          />
          {/* Add more fields as needed */}
          <button type="submit">Save</button>
          <button type="button" onClick={() => setEditedPlayer(null)}>Cancel</button>
        </form>
      )}
      <table>
        <thead>
          <tr>
            <th>Username</th>
            <th>Total Games</th>
            <th>Wins</th>
            <th>Losses</th>
            <th>Draws</th>
            <th>Average Moves</th>
            <th>Total Moves</th>
            <th>X Wins</th>
            <th>O Wins</th>
            <th>Win Rate</th>
            <th>Loss Rate</th>
            <th>Draw Rate</th>
            <th>Edit</th>
          </tr>
        </thead>
        <tbody>
          {players.map((player) => (
            <tr key={player._id}>
              <td>{player.username}</td>
              <td>{player.totalGames}</td>
              <td>{player.wins}</td>
              <td>{player.losses}</td>
              <td>{player.draws}</td>
              <td>{player.averageMovesPerGame}</td>
              <td>{player.totalMoves}</td>
              <td>{player.xWins}</td>
              <td>{player.oWins}</td>
              <td>{player.winRate.toFixed(2)}%</td>
              <td>{player.lossRate.toFixed(2)}%</td>
              <td>
                <button onClick={() => setEditedPlayer(player)}>Edit</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Teams;