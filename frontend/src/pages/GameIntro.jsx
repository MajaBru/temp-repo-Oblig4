import React, { useState, useRef } from "react";
import { Link } from "react-router-dom";
import Button from "../components/button/button.jsx";
import "../components/header/Header.css";

const GameIntro = () => {
  const [showModal, setShowModal] = useState(false);
  const modalRef = useRef(null);

  const handleShowRules = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  // Handle clicking outside the modal to close it
  const handleClickOutside = (event) => {
    if (modalRef.current && !modalRef.current.contains(event.target)) {
      handleCloseModal();
    }
  };

  return (
    <div className="Gamepage">
      <div className={`GamePageContainer ${showModal ? "blurry" : ""}`}>
        <h1>Game</h1>
        <Button variant="rules" onClick={handleShowRules}>
          Show rules
        </Button>
        <div className="solo-team">
          <Link to="/GameSolo">
            <Button variant="solo">Play solo</Button>
          </Link>
          <Link to="/GameTeam">
            <Button variant="team">Play in team</Button>
          </Link>
        </div>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="modal">
          <div className="modal-content" ref={modalRef}>
            <h2>Game Rules</h2>
            <p>Here are the rules of the game...</p>
            <Button variant="close" onClick={handleCloseModal}>
              Close
            </Button>{" "}
          </div>
        </div>
      )}
    </div>
  );
};

export default GameIntro;
