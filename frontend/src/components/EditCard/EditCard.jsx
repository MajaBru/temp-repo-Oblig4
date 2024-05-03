import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { AxiosInstance, updateMissionCard, updateAssessmentCard, 
    updateMissionCardIcon, updateAssessmentCardIcon} from '../../api/axiosService';
import './EditCard.css'; 

const EditCard = () => {
    const { id } = useParams();
    
    const [card, setCard] = useState({});
    const [updatedCard, setUpdatedCard] = useState({
        card_id: '',
        card_type: '',
        card_category: '',
        card_name: '',
        card_description: '',
        card_details: '',
    });
    const [cardIcon, setCardIcon] = useState(null);

    useEffect(() => {
        const getCard = async () => { 
            try {
                const response = await AxiosInstance.get(`http://localhost:3001/cards/${id}`);
                setUpdatedCard(response.data.data);
                setCard(response.data.data);
            } catch (error) {
                console.error('Error fetching card', error);
            }
        };

        getCard();
    }, [id]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUpdatedCard({ ...updatedCard, [name]: value });
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        setCardIcon(file);
    };

    // https://medium.com/@byte.talking/multi-form-data-uploads-with-react-js-express-and-multer-b19adb3c1de2
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (card.card_type === 'Mission') {
                await updateMissionCard(id, updatedCard);
                if (cardIcon) {
                    await updateMissionCardIcon(id, cardIcon);
                }
            } else if (card.card_type === 'Assessment') {
                await updateAssessmentCard(id, updatedCard);
                if (cardIcon) {
                    await updateAssessmentCardIcon(id, cardIcon);
                }
            }

            console.log("Successfully updated");
            alert('Card updated!');
        } catch (error) {
            console.error('Error updating', error);
        }
    };

    return (
        <div>
            <h1>Edit Card</h1>
            <form className='Edit-form' onSubmit={handleSubmit}>
                
                <label htmlFor="card_id">Card ID:</label>
                <input type="text" id="card_id" name="card_id" value={updatedCard.card_id} onChange={handleChange} />
            
                {card.card_type === 'Assessment' && (
                    <div>
                        <label htmlFor="card_type">Card type:</label>
                        <input className='Read-only' readOnly type="text" id="card_type" name="card_type" value={"Assessment"} onChange={handleChange} />
                    </div>
                )}
                {card.card_type === 'Mission' && (
                    <div>
                        <label htmlFor="card_type">Card Type:</label>
                        <input  className='Read-only' readOnly type="text" id="card_type" name="card_type" value={'Mission'} onChange={handleChange} />
                    </div>
                )}
                {card.card_type === 'Assessment' && (
                    <div>
                    <label htmlFor="card_category">Card Category:</label>
                    <select name="card_category" id="card_category" onChange={handleChange} value={updatedCard.card_category}>
                        <option value="">Select a category</option>
                        <option value="Who is assessed">Who is assessed</option>
                        <option value="The assessor">The assessor</option>
                        <option value="Assessment artefact">Assessment artefact</option>
                        <option value="Assessment format">Assessment format</option>
                        <option value="Context">Context</option>
                        <option value="Assessment timing">Assessment timing</option>
                    </select>
                    </div>
                )}

                    <label htmlFor="card_name">Card Name:</label>
                    <input type="text" id="card_name" name="card_name" value={updatedCard.card_name} onChange={handleChange} />

                    <label htmlFor="card_description">Card Description:</label>
                    <textarea id="card_description" name="card_description" value={updatedCard.card_description} onChange={handleChange} />
               
                {card.card_type === 'Assessment' && (
                    <div>
                        <label htmlFor="card_details">Card Details:</label>
                        <textarea id="card_details" name="card_details" value={updatedCard.card_details} onChange={handleChange} />
                    </div>
                )}
                <div>
                    <label htmlFor="card_icon">Card Icon:</label>
                    <input type="file" id="card_icon" name="card_icon" onChange={handleFileChange}>
                    </input>
                </div>
                <button className='Default-button' type="submit">Save</button>
            </form>
            <Link to={`/manage/cards`}><button className='Default-button'>Go back</button></Link>
        </div>
    );
};

export default EditCard;
