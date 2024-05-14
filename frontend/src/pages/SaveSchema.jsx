// SaveSchema.jsx

import React from "react";
import { useLocation } from "react-router-dom";

const SaveSchema = () => {
  // Retrieve the created cards data from location state
  const location = useLocation();
  const { createdCards } = location.state || {};

  return (
    <div>
      <h1>You’ve created an assessment schema!</h1>
      <div className="create-note">
        <h2>Give it a title:</h2>
        <label className="create-note-content-wrapper">
          <input type="text" id="title" placeholder="Title" name="title" />
        </label>
      </div>
      {/* Render the created cards */}
      <div className="CardsContainer">
        <div className="AssessmentCardContainer">
          {createdCards &&
            createdCards.map((cards, categoryIndex) => (
              <div key={categoryIndex}>
                {cards.map((card, cardIndex) => (
                  <AssessmentCard
                    className="card"
                    key={cardIndex}
                    cardId={card.card_id}
                    cardName={card.card_name}
                    cardCategory={card.card_category}
                    cardDescription={card.card_description}
                    cardDetails={card.card_details}
                    cardIcon={card.card_icon}
                  />
                ))}
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default SaveSchema;
