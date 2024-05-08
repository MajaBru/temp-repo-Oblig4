// AddPlayer.jsx
import React, { useState } from "react";
import "./AddPlayer.css";
import Button from "../button/button.jsx";

const AddPlayer = ({ onAddEmail }) => {
  const [searchEmail, setSearchEmail] = useState(""); // State to store the search email
  const [matchingEmail, setMatchingEmail] = useState(""); // State to store the matching email

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
      onAddEmail(matchingEmail); // Call the onAddEmail function with the matching email
      setMatchingEmail(""); // Reset matchingEmail state
    }
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
    </div>
  );
};

export default AddPlayer;
