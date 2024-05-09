import React, { useState } from "react";
import AddPlayer from "../components/AddPlayer/AddPlayer.jsx";
import Button from "../components/button/button.jsx";
import { Link } from "react-router-dom"; // Assuming you're using react-router-dom

const GameTeam = () => {
  const [emails, setEmails] = useState([]); // State to store added emails

  const handleAddEmail = (email) => {
    setEmails([...emails, email]); // Add the new email to the list of emails
  };

  return (
    <div className="GamePage">
      <AddPlayer onAddEmail={handleAddEmail} />
      <Link to="/ChooseMissionCard">
        <Button variant="Start">Start the game</Button>
      </Link>
    </div>
  );
};

export default GameTeam;
