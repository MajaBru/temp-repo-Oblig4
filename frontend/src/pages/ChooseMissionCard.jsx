import React, { useState } from "react";
import MissionCard from "../components/MissionCard/MissionCard"; // Import your MissionCard component
import "../assets/styles/ChooseMissionCard.css"; // You can define styles for this page

const ChooseMissionCard = () => {
  const [selectedCards, setSelectedCards] = useState([]);

  const handleCardClick = (card) => {
    if (selectedCards.length < 3) {
      setSelectedCards([...selectedCards, card]);
    }
  };

  const renderMissionCards = () => {
    // Dummy mission card data, replace with actual data
    const missionCardData = [
      { id: 1, title: "Mission Card 1" },
      { id: 2, title: "Mission Card 2" },
      { id: 3, title: "Mission Card 3" },
      { id: 4, title: "Mission Card 4" },
      { id: 5, title: "Mission Card 5" },
      { id: 6, title: "Mission Card 6" },
    ];

    const rows = [];
    for (let i = 0; i < missionCardData.length; i += 2) {
      rows.push(
        <div className="MissionCardRow" key={i}>
          {missionCardData.slice(i, i + 2).map((card) => (
            <MissionCard
              key={card.id}
              title={card.title}
              onClick={() => handleCardClick(card)}
              isSelected={selectedCards.some((c) => c.id === card.id)}
            />
          ))}
        </div>
      );
    }
    return rows;
  };

  return (
    <div className="ChooseMissionCard">
      <h1>Choose Mission Cards</h1>
      <div className="MissionCardContainer">{renderMissionCards()}</div>
      <div className="Placeholders">
        {[1, 2, 3].map((index) => (
          <div key={index} className="Placeholder">
            {selectedCards.length >= index && (
              <MissionCard title={selectedCards[index - 1].title} />
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ChooseMissionCard;
