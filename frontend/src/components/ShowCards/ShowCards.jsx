import React, { useState, useEffect } from "react";
import { fetchMissionCards, fetchAssessmentCards, 
    deleteMissionCard, deleteAssessmentCard } from "../../api/axiosService";
import "./ShowCards.css";
import { Link } from "react-router-dom";


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

            <Link className="Create-card-link" to={'/new'}><button className="Default-button">Create new card</button></Link>
            
            {!toggleDisplay && (
                <div className="button-wrapper">
                    <Link to={'/manage/cards/icons'}>
                        <button className="Default-button">Update card category icon</button>
                    </Link>
                </div>
            )}
            <ul className="Cards-list">
                {toggleDisplay ? (
                    missionCards.map((card, index) => (
                        <li className="Card-style" key={index}>
                            <span>{card.card_id}</span>
                            <span>{card.card_type}</span>
                            <span>{card.card_name}</span>
                            <span>{card.card_description}</span>
                            <div className="Card-icon-wrapper">
                               <img src={`http://localhost:3001/${card.card_icon}`} alt={'card icon'} /> 
                            </div>
                            

                            <div className="Buttons-wrapper">
                                <Link to={`/manage/cards/edit/${card._id}`}> {/* link to edit */}
                                    <button className="Default-button">Edit</button>
                                </Link>
                                
                                <button onClick={() => handleDeleteMission(card.card_id)} className="Default-button">Delete</button>
                            </div>
                        </li>
                    ))
                ) : (
                    
                    assessmentCards.map((card, index) => (
                        
                        <li className="Card-style" key={index}>
                            <span>{card.card_id}</span>
                            <span>{card.card_type}</span>
                            <span>{card.card_category}</span>
                            <span>{card.card_name}</span>
                            <span>{card.card_description}</span>
                            <span>{card.card_details}</span>
                            <div className="Card-icon-wrapper">
                               <img src={`http://localhost:3001/${card.card_icon}`} alt={'card icon'} /> 
                            </div>
                            <div className="Buttons-wrapper">
                                <Link to={`/manage/cards/edit/${card._id}`}>
                                    <button className="Default-button">Edit</button>
                                </Link>
                                <button onClick={() => handleDeleteAssessment(card.card_id)} className="Default-button" >Delete</button>
                            </div>
                            
                        </li>
                        
                    ))
                )}
            </ul>
        </div>
    );
};

export default ShowCards;
