import React from "react";
import "./AssessmentCard.css";

const AssessmentCard = ({ cardId, cardName, cardCategory, cardDescription, cardDetails, cardIcon }) => {
    return (
        <div className="assessment-card-container">
            <div className="assessment-card--inner">
                <div className="assessment-card--frontside card-assessment">
{/*                     <div className="flip-indicator">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
                        <path d="M128 40c0-22.1 17.9-40 40-40s40 17.9 40 40V188.2c8.5-7.6 19.7-12.2 32-12.2c20.6 0 38.2 13 45 31.2c8.8-9.3 21.2-15.2 35-15.2c25.3 0 46 19.5 47.9 44.3c8.5-7.7 19.8-12.3 32.1-12.3c26.5 0 48 21.5 48 48v48 16 48c0 70.7-57.3 128-128 128l-16 0H240l-.1 0h-5.2c-5 0-9.9-.3-14.7-1c-55.3-5.6-106.2-34-140-79L8 336c-13.3-17.7-9.7-42.7 8-56s42.7-9.7 56 8l56 74.7V40zM240 304c0-8.8-7.2-16-16-16s-16 7.2-16 16v96c0 8.8 7.2 16 16 16s16-7.2 16-16V304zm48-16c-8.8 0-16 7.2-16 16v96c0 8.8 7.2 16 16 16s16-7.2 16-16V304c0-8.8-7.2-16-16-16zm80 16c0-8.8-7.2-16-16-16s-16 7.2-16 16v96c0 8.8 7.2 16 16 16s16-7.2 16-16V304z"/>
                        </svg>
                        <span>Hide card</span>
                    </div> */}
{/*                     <div className="star-icon">

                    </div> */}

                    <div className="title-and-icon-wrap">
                    <h2 className="card-title-assessment" id="category">{cardCategory}</h2>
                        <div className="Card-icon-wrapper">
                            <img
                                src={`http://localhost:3001/${cardIcon}`}
                                alt={"card icon"}
                            ></img>
                        </div>

                    </div>
                    <div id="card-content">
                    <p id="cardname">{cardName}</p>
                    <p id="carddescription">{cardDescription}</p>
                    <p id="details">{cardDetails}</p>
                    </div>
                    <p id="cardID">{cardId}</p>
                </div>
                <div className="assessment-card--backside card-assessment">
                    <div className="assessment-card-backside--inner">
                        <h2 className="card-title-assessment">{cardCategory}</h2>
                        <img id="logo-backside" src={cardIcon} alt="Card Icon" />
                    </div>
                    {/* 
                     
                    <div className="flip-indicator">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
                            
                        </svg>
                        <span>Reveal card</span>
                    </div>*/}
                </div>
            </div>
        </div>
    );
};

export default AssessmentCard;
