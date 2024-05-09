import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Button from "../components/button/button.jsx";
import MissionCard from "../components/MissionCard/MissionCard";
import AssessmentCard from "../components/AssessmentCard/AssessmentCard";
import Loader from "../components/loader";
import "../assets/styles/MakeAssessmentSchema.css";
import { fetchMissionCards, fetchCardByCategory, getCategories } from "../api/axiosService";

const MakeAssessmentSchema = () => {
  const [categories, setCategories] = useState([]);
  const [missionCards, setMissionCards] = useState([]);
  const [assessmentCards, setAssessmentCards] = useState([]);
  const [loading, setLoading] = useState(true);

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

  return (
    loading ? <Loader/> :
    <div className="GamePage">


      <div className="GameButtons">
        <Button variant="game-rules">Replace the card</Button>
        <Button variant="game-rules">Randomize</Button>
        <Button variant="game-rules">Opt out</Button>
        <Button variant="game-rules">End turn</Button>
        <Link to="/teacherexplore">
          <Button variant="end">End game</Button>
        </Link>
      </div>
      <h1>Make Assessment Scheme</h1>
      <div className="CardsContainer">
        <div className="AssessmentCardContainer">
      {assessmentCards.map((cards, categoryIndex) => (
        <div key={categoryIndex}>
          
        {cards.map((card, cardIndex) => (
          <AssessmentCard className="card"
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
{/*           {missionCards.map((card, index) => (
            <MissionCard  className="card"
              key={index}
              cardId={card.card_id}
              cardName={card.card_name}
              cardDescription={card.card_description}
              cardIcon={card.card_icon}
            />
          ))} */}
          <MissionCard className="card"/>
          <MissionCard  className="card"/>
          <MissionCard  className="card"/>
        </div>
    </div>
  );
};

export default MakeAssessmentSchema;
