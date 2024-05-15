import React, { useState } from "react";
import { Link } from "react-router-dom";
import Button from "../components/button/button.jsx";
import MissionCard from "../components/MissionCard/MissionCard"; // Assuming you have a MissionCard component
import "../assets/styles/ChooseMissionCard.css";

const ChooseMissionCard = () => {
  const [selectedCards, setSelectedCards] = useState([]);

  const handleCardClick = (card) => {
    console.log("Card clicked:", card);
    if (!selectedCards.some((c) => c.id === card.id)) {
      if (selectedCards.length < 3) {
        setSelectedCards([...selectedCards, card]);
      }
    } else {
      // If card is already selected, remove it
      const updatedCards = selectedCards.filter((c) => c.id !== card.id);
      setSelectedCards(updatedCards);
    }
  };

  const handlePlaceholderClick = (index) => {
    console.log("Placeholder clicked:", index);
    // Remove the card at the specified index from selectedCards
    const updatedCards = [...selectedCards];
    updatedCards.splice(index, 1);
    setSelectedCards(updatedCards);
  };

  return (
    <div className="ChooseMissionCard">
      <h1>Choose Mission Cards</h1>
      <Link to="/makeassessmentschema">
        <Button variant="ready">Ready</Button>
      </Link>
      <div className="Placeholders">
        {[0, 1, 2].map((index) => (
          <div
            key={index}
            className="Placeholder"
            onClick={() => handlePlaceholderClick(index)}
          >
            {selectedCards[index] && <h3>{selectedCards[index].title}</h3>}
          </div>
        ))}
      </div>
      <div className="MissionCardContainer">
        <div className="MissionCardContainerRow">
          {[1, 2, 3, 4, 5, 6].map((cardId) => (
            <div key={cardId} className="MissionCardContainerItem">
              <MissionCard
                title={`Mission Card ${cardId}`}
                onClick={() =>
                  handleCardClick({
                    id: cardId,
                    title: `Mission Card ${cardId}`,
                  })
                }
                isSelected={selectedCards.some((c) => c.id === cardId)}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ChooseMissionCard;
