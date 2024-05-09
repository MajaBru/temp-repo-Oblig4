import React from "react";
import { Link } from "react-router-dom";
import Button from "../components/button/button.jsx";
import MissionCard from "../components/MissionCard/MissionCard";
import AssessmentCard from "../components/AssessmentCard/AssessmentCard";
import "../assets/styles/MakeAssessmentSchema.css";

const MakeAssessmentSchema = () => {
  return (
    <div className="GamePage">
      <h1>Make Assessment Scheme</h1>
      <div className="CardsContainer">
        <div className="MissionCardContainer">
          <MissionCard />
          <MissionCard />
          <MissionCard />
        </div>
        <div className="AssessmentCardContainer">
          {/* <AssessmentCard category="the assessor" /> */}
          <AssessmentCard />
          <AssessmentCard />
          <AssessmentCard />
          <AssessmentCard />
          <AssessmentCard />
          <AssessmentCard />
        </div>
      </div>
      <div className="GameButtons">
        <Button variant="game-rules">Replace the card</Button>
        <Button variant="game-rules">Randomize</Button>
        <Button variant="game-rules">Opt out</Button>
        <Button variant="game-rules">End turn</Button>
        <Link to="/teacherexplore">
          <Button variant="end">End game</Button>
        </Link>
      </div>
    </div>
  );
};

export default MakeAssessmentSchema;
