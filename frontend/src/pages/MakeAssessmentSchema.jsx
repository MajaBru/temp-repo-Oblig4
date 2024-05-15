import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import Button from "../components/button/button.jsx";
import MissionCard from "../components/MissionCard/MissionCard";
import AssessmentCard from "../components/AssessmentCard/AssessmentCard";
import Loader from "../components/loader";
import "../assets/styles/MakeAssessmentSchema.css";
import {
  fetchMissionCards,
  fetchCardByCategory,
  getCategories,
} from "../api/axiosService";

const MakeAssessmentSchema = () => {
  const [categories, setCategories] = useState([]);
  const [missionCards, setMissionCards] = useState([]);
  const [assessmentCards, setAssessmentCards] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [gameEnded, setGameEnded] = useState(false);
  const modalRef = useRef(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        // mission cards
        const missionCardsData = await fetchMissionCards();
        setMissionCards(missionCardsData);

        // get categories
        const categoriesArray = await getCategories();
        setCategories(categoriesArray.reverse());
        console.log(categories);

        // setting assessment cards by category (one card per category)
        const assessmentSchema = [];
        for (const category of categoriesArray) {
          const cardData = await fetchCardByCategory(category);
          assessmentSchema.push(cardData);
        }

        setAssessmentCards(assessmentSchema);
        console.log(assessmentSchema);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data", error);
      }
    };
    fetchData();
  }, []);

  const handleEndGame = () => {
    setShowModal(true);
  };

  const handleYes = () => {
    // Handle actions when user chooses 'Yes' to end the game
    setGameEnded(true);
    setShowModal(false);
  };

  const handleNo = () => {
    // Handle actions when user chooses 'No' to continue the game
    setShowModal(false);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        handleNo(); // Close modal if clicked outside
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <>
      {showModal && (
        <div className="modal">
          <div className="modal-content" ref={modalRef}>
            <h2>Sure you want to end the game?</h2>
            <div className="modal-buttons">
              <Link to="/SaveSchema">
                <Button variant="end" onClick={handleYes}>
                  End game
                </Button>
              </Link>
              <Button variant="play" onClick={handleNo}>
                Keep playing
              </Button>
            </div>
          </div>
        </div>
      )}

      {loading ? (
        <Loader />
      ) : (
        <div
          className={`GamePage ${showModal ? "blur" : ""}`}
          id="GamePageBlur"
        >
          <div className="GameButtons">
            <Button variant="game-rules">Replace the card</Button>
            <Button variant="game-rules">Randomize</Button>
            <Button variant="game-rules">Opt out</Button>
            <Button variant="game-rules" onClick={handleEndGame}>
              End turn
            </Button>
            <Link onClick={handleEndGame}>
              <Button variant="end">End game</Button>
            </Link>
          </div>
          <h1>Make Assessment Scheme</h1>
          <div className="CardsContainer">
            <div className="AssessmentCardContainer">
              {assessmentCards.map((cards, categoryIndex) => (
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
          <div className="MissionCardContainer">
            {/* {missionCards.map((card, index) => (
              <MissionCard
                className="card"
                key={index}
                cardId={card.card_id}
                cardName={card.card_name}
                cardDescription={card.card_description}
                cardIcon={card.card_icon}
              />
            ))} */}
            <MissionCard className="card" />
            <MissionCard className="card" />
            <MissionCard className="card" />
          </div>
        </div>
      )}
    </>
  );
};

export default MakeAssessmentSchema;
