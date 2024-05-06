import React from "react";
import Button from "../components/button/button.jsx";

const GameSolo = () => {
  return (
    <div className="GamePage">
      <div className="game-rules">
        <h1>Game</h1>
        <p>Rules</p>
      </div>

      <div className="solo-team">
        <Button variant="solo">Play solo</Button>
        <Button variant="team">Play in team</Button>
      </div>
    </div>
  );
};

export default GameSolo;
