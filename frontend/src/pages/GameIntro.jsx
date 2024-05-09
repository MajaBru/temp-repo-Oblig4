import React from "react";
import { Link } from "react-router-dom";
import Button from "../components/button/button.jsx";
import "../components/header/Header.css";

const GameIntro = () => {
  return (
    <div className="GamePage">
      <h1>Game</h1>
      <Button variant="rules">Show rules</Button>
      <div className="solo-team">
        <Link to="/GameSolo">
          <Button variant="solo">Play solo</Button>
        </Link>
        <Link to="/GameTeam">
          <Button variant="team">Play in team</Button>
        </Link>
      </div>
    </div>
  );
};

export default GameIntro;
