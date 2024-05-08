// GameTeam.jsx
import React, { useState } from "react";
import AddPlayer from "../components/AddPlayer/AddPlayer.jsx";

const GameTeam = () => {
  const [addedPlayers, setAddedPlayers] = useState([]);

  // Function to add an email to the list
  const addEmailToList = (email) => {
    setAddedPlayers([...addedPlayers, email]);
  };

  return (
    <div className="GamePage">
      <AddPlayer onAddEmail={addEmailToList} />
      {/* Display the list of added players */}
      <div className="AddedPlayers">
        <h2>Added Players</h2>
        <ul>
          {addedPlayers.map((player, index) => (
            <li key={index}>
              {player}
              <Button variant="kick" onClick={() => removeEmailFromList(index)}>
                Kick
              </Button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default GameTeam;
