import React, { useState } from "react";
import { AxiosInstance, createAssessmentCard, createMissionCard} from "../../api/axiosService";
import "./Create_card.css";
import { useNavigate } from "react-router-dom";

const CreateCard = () => {
    const navigate = useNavigate();
    const [cardData, setCardData] = useState({
        card_id: "",    
        card_type: "", 
        card_category: "",
        card_name: "",
        card_description: "",
        card_details: "",
        card_icon: ""
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setCardData({ ...cardData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
    
        if (cardData.card_type === "Mission") {
            try {
                await createMissionCard(cardData);
                console.log("Successfully created mission card");
                
                navigate("/manage/cards");
            } catch (error) {
                console.error("Error creating mission card", error);
            }
        } else if (cardData.card_type === "Assessment") {
            try {
                await createAssessmentCard(cardData);
                console.log("Successfully created assessment card");
                navigate("/manage/cards");
            } catch (error) {
                console.error("Error creating assessment card", error);
            }
        }
    };
        

    return (
        <div>
            <h1>Create a new card</h1>
            <form className="Create-card-form" onSubmit={handleSubmit}>
                <label>Card type</label>
                <select name="card_type" id="card_type" onChange={handleChange} value={cardData.card_type}>
                    <option value="">Select a type</option>
                    <option value="Mission">Mission</option>
                    <option value="Assessment">Assessment</option>
                </select>

                <label>Card ID</label>
                <input type="text" name="card_id" id="card_id" value={cardData.card_id} onChange={handleChange} />

                <label>Card name</label>
                <input type="text" name="card_name" id="card_name" value={cardData.card_name} onChange={handleChange} />

                {cardData.card_type === "Assessment" && (
                    <>
                    
                    <label>Card category</label>

                    <select name="card_category" id="card_category" onChange={handleChange} value={cardData.card_category}>
                        <option value="">Select a category</option>
                        <option value="Who is assessed">Who is assessed</option>
                        <option value="The assessor">The assessor</option>
                        <option value="Assessment artefact">Assessment artefact</option>
                        <option value="Assessment format">Assessment format</option>
                        <option value="Context">Context</option>
                        <option value="Assessment timing">Assessment timing</option>
                    </select>
                    </>
                )}

                <label>Card description</label>
                <textarea maxLength="200" type="text" name="card_description" id="card_description"
                value={cardData.card_description} onChange={handleChange} />

                {cardData.card_type === "Assessment" && (
                    <>
                        <label>Card details</label>
                        <textarea maxLength="200" type="text" name="card_details" id="card_details" 
                        value={cardData.card_details} onChange={handleChange} />
                    </>
                )}

                <button type="submit" className="Default-button">Create card</button>
            </form>
        </div>
    );
}

export default CreateCard;
