import React, { useState } from "react";
import { Link } from "react-router-dom";
import Button from "../components/button/button.jsx";
import MissionCard from "../components/MissionCard/MissionCard";
import "../assets/styles/ChooseMissionCard.css";

const ChooseMissionCard = () => {
  const [selectedCards, setSelectedCards] = useState([]);

  const handleCardClick = (card) => {
    if (selectedCards.length < 3) {
      setSelectedCards([...selectedCards, card]);
    }
  };

  const renderMissionCards = () => {
    const missionCardData = [
      { id: 1, title: "Mission Card 1" },
      { id: 2, title: "Mission Card 2" },
      { id: 3, title: "Mission Card 3" },
      { id: 4, title: "Mission Card 4" },
      { id: 5, title: "Mission Card 5" },
      { id: 6, title: "Mission Card 6" },
    ];

    return missionCardData.map((card) => (
      <div key={card.id} className="MissionCardContainerItem">
        <MissionCard
          title={card.title}
          onClick={() => handleCardClick(card)}
          isSelected={selectedCards.some((c) => c.id === card.id)}
        />
      </div>
    ));
  };

  return (
    <div className="ChooseMissionCard">
      <h1>Choose Mission Cards</h1>
      <Link to="/makeassessmentschema">
        <Button variant="ready">Ready</Button>
      </Link>
      <div className="Placeholders">
        {[1, 2, 3].map((index) => (
          <div key={index} className="Placeholder">
            {selectedCards.length >= index && (
              <MissionCard title={selectedCards[index - 1].title} />
            )}
          </div>
        ))}
      </div>
      <div className="MissionCardContainer">
        <div className="MissionCardContainerRow">{renderMissionCards()}</div>
      </div>
    </div>
  );
};

export default ChooseMissionCard;
