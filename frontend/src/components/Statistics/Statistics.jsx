import React from 'react';
import './Statistics.css';

const Statistics = ({ numAssessment, numMission, numUsers }) => {
  return (
    <div className='Statistics-container'>
      <h1>Platform statistics</h1>

      <div className='Statistics-card'>
        <p>Total assessment-cards: {numAssessment}</p>
      </div>

      <div className='Statistics-card'>
        <p>Total mission-cards: {numMission}</p>
      </div>

      <div className='Statistics-card'>
        <p>All cards total: {numAssessment + numMission}</p>
      </div>

      <div className='Statistics-card'>
        <p>Total number of users: {numUsers}</p>
      </div>
      

    </div>
  );
};

export default Statistics;
