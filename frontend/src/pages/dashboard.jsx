import React, { useState, useEffect } from 'react';
import { fetchMissionCards,fetchAssessmentCards, fetchUsers} from '../api/axiosService';

import Statistics from '../components/Statistics/Statistics';

const Dashboard = () => {
    
    const [numMissionCards, setnumMissionCards] = useState(0);
    const [numAssessmentCards, setnumAssessmentCards] = useState(0);
    const [numUsers, setnumUsers] = useState(0);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const missionCards = await fetchMissionCards();
                const assessmentCards = await fetchAssessmentCards();
                const users = await fetchUsers();

                setnumMissionCards(missionCards.length);
                setnumAssessmentCards(assessmentCards.length);
                setnumUsers(users.length);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();

    }, []);

    return (
        <div>
            <Statistics 
                numAssessment={numAssessmentCards} 
                numMission={numMissionCards} 
                numUsers={numUsers}
            />
        </div>
    );
};

export default Dashboard;