import React, { useState } from "react";
import "./AddPlayer.css";
import Button from "../button/button.jsx";

const AddPlayer = ({ onAddEmail }) => {
  const [searchEmail, setSearchEmail] = useState(""); // State to store the search email
  const [matchingEmail, setMatchingEmail] = useState(""); // State to store the matching email
  const [addedPlayers, setAddedPlayers] = useState([]); // State to store added players

  const handleSearch = (event) => {
    event.preventDefault();
    // Dummy email (replace this with your actual search logic)
    const dummyEmail = "test@example.com";
    if (searchEmail === dummyEmail) {
      setMatchingEmail(dummyEmail);
    } else {
      setMatchingEmail("");
    }
  };

  const handleAdd = () => {
    if (matchingEmail) {
      console.log("Adding email:", matchingEmail);
      onAddEmail(matchingEmail); // Call the onAddEmail function with the matching email
      setAddedPlayers([...addedPlayers, matchingEmail]); // Add matching email to addedPlayers state
      console.log("Updated addedPlayers:", addedPlayers);
      setSearchEmail(""); // Reset searchEmail state
      setMatchingEmail(""); // Reset matchingEmail state
    }
  };

  const removeEmailFromList = (index) => {
    const updatedPlayers = [...addedPlayers];
    updatedPlayers.splice(index, 1);
    setAddedPlayers(updatedPlayers);
  };

  return (
    <div className="AddPlayer">
      <h1>Add a team player</h1>
      <form id="searchForm" onSubmit={handleSearch}>
        <input
          type="email"
          id="email"
          name="email"
          placeholder="Enter email"
          required
          value={searchEmail} // Bind input value to searchEmail state
          onChange={(e) => setSearchEmail(e.target.value)} // Update searchEmail state on change
        />
        <Button variant="search" type="submit">
          Search
        </Button>
      </form>

      {matchingEmail && (
        <div>
          {matchingEmail}
          {/* Display "Add" button */}
          <Button variant="add" onClick={handleAdd}>
            Add
          </Button>
        </div>
      )}

      {/* Display added players */}

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
  );
};

export default AddPlayer;
