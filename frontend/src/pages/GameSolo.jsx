import React, { useState } from "react";

const GameSolo = () => {
  const [addedPlayers, setAddedPlayers] = useState([]);

  // Function to add an email to the list
  const addEmailToList = (email) => {
    setAddedPlayers([...addedPlayers, email]);
  };

  return (
    <div>
      <h1>Pick a missionCard</h1>
    </div>
  );
};

export default GameSolo;
