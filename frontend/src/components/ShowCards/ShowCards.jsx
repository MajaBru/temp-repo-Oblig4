import React, { useState, useEffect } from "react";
import { fetchMissionCards, fetchAssessmentCards, 
    deleteMissionCard, deleteAssessmentCard } from "../../api/axiosService";
import "./ShowCards.css";
import MissionCard from "../MissionCard/MissionCard";
import AssessmentCard from "../AssessmentCard/AssessmentCard";
import Button from "../button/button";
import { Link } from "react-router-dom";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";


const ShowCards = () => {
    const [missionCards, setMissionCards] = useState([]);
    const [assessmentCards, setAssessmentCards] = useState([]);
    const [toggleDisplay, setToggleDisplay] = useState(true);

    
    useEffect(() => {
        const fetchData = async () => {
            try {
                const missionCards = await fetchMissionCards();
                const assessmentCards = await fetchAssessmentCards();

                setMissionCards(missionCards);
                setAssessmentCards(assessmentCards);
            } catch (error) {
                console.error('Error fetching cards', error);
            }
        };
        fetchData();
    }, []);


    const handleMissionCards = () => {

        setToggleDisplay(true);
    };

    const handleAssessmentCards = () => {
        setToggleDisplay(false); 
    };

    const handleDeleteMission = async (cardId) => {
        const confirmDel = window.confirm("Are you sure you want to delete this card?");
        if (confirmDel) {
            try {
                await deleteMissionCard(cardId);
                window.location.reload(); //refresh
                console.log("Successfully deleted");
                
            } catch (error) {
                console.error("Error deleting mission card:", error);
            }
        }
    };

    const handleDeleteAssessment = async (cardId) => {
        const confirmDel = window.confirm("Are you sure you want to delete this card?");
        if (confirmDel) {
            try {
                await deleteAssessmentCard(cardId);
                window.location.reload();
                console.log("Successfully deletion");
            } catch (error) {
                console.error("Error deleting assessment card:", error);
            }
        }
    };

    return (
        <div>
            <h1>Cards Management</h1>

            <div className="button-togglers">
                <button className="Default-button" onClick={handleMissionCards}>Mission Cards</button>
                <button className="Default-button" onClick={handleAssessmentCards}>Assessment Cards</button>
            </div>

            <Link className="Create-card-link" to={'/new'}><Button variant="admin">Create new card</Button></Link>
            
            {!toggleDisplay && (
                <div className="update-icon-button">
                    <Link to={'/manage/cards/icons'}>
                        <Button variant="admin">Update card category icon</Button>
                    </Link>
                </div>
            )}
            <ul className="Cards-list">
                {toggleDisplay ? (
                    missionCards.map((card, index) => (
                        
                        <li key={index}>
                            
                            <MissionCard 
                            cardId={card.card_id}
                            cardName={card.card_name} 
                            cardDescription={card.card_description}
                            cardIcon={card.card_icon}
                            />

                            <div className="Buttons-wrapper">
                                <Link to={`/manage/cards/edit/${card._id}`}> {/* link to edit */}
                                <Button variant="admin"><FaEdit/> Edit</Button>
                                </Link>
                                <Button variant="admin" onClick={() => handleDeleteMission(card.card_id)} className="Default-button"><MdDelete />Delete</Button>
                            </div>

                        </li>
                        
                    ))
                ) : (
                    
                    assessmentCards.map((card, index) => (
                        
                        <li className="assessment-card-listitem" key={index}>
                            <AssessmentCard
                                cardId={card.card_id}
                                cardName={card.card_name}
                                cardCategory={card.card_category}
                                cardDescription={card.card_description}
                                cardDetails={card.card_details}
                                cardIcon={card.card_icon}
                            />
                            <div className="Buttons-wrapper-assessment">
                                <Link to={`/manage/cards/edit/${card._id}`}>
                                    <Button variant="admin"><FaEdit/> Edit</Button>
                                </Link>
                                <Button variant="admin" onClick={() => handleDeleteAssessment(card.card_id)}><MdDelete /> Delete</Button>
                            </div>
                            
                        </li>
                       
                        
                    ))
                )}
            </ul>
        </div>
    );
};

export default ShowCards;
