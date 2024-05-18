import React from "react";
import "./MissionCard.css";

const MissionCard = ({
  cardId,
  cardName,
  cardIcon,
  cardDescription,
  onClick,
}) => {
  const handleClick = () => {
    onClick({ id: cardId, title: cardName }); // Pass the card information to the parent component
  };

  return (
    <div className="mission-card-container" onClick={handleClick}>
      <div className="card-container--inner">
        <div className="mission-card--frontside card">
          <div className="card-content">
            <h2 className="card-title">MISSION</h2>
            <div className="name-icon-container">
              <p id="cardname">{cardName}</p>
              <div className="Card-icon-wrapper">
                <img
                  src={`http://localhost:3001/${cardIcon}`}
                  alt={"card icon"}
                ></img>
              </div>
            </div>
            <p id="your-mission">Your mission is</p>
            <p id="mission-description">{cardDescription}</p>
            <p id="cardID">{cardId}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MissionCard;
