import React from "react";
import './cards_showcase.css';
import MissionCard from '../../assets/img/mission-card-back.png';
import WhoIsAssessed from '../../assets/img/who-is-assessed-back.png';
import TheAssessor from '../../assets/img/the-assessor-back.png';
import AssessmentArtefact from '../../assets/img/assessment-artefact.png';
import AssessmentTiming from '../../assets/img/timing.png';
import AssessmentContext from '../../assets/img/context.png';
import Format from '../../assets/img/format.png';
const Showcase = () => {
    return (
        <div>

            <div className="Showcase">
                <div className="missioncard-showcase">
                    <div>                    
                    <h2>The mission card</h2>
                    <p>The mission card describes the educators mission for the assessment</p>
                    </div>

                    <img src={MissionCard} alt="mission card" />
                </div>
    
                <div className="assessmentcards-showcase">
                    <div>
                  <h2>The Assessment cards</h2>
                    <p>Assessment cards describe in what way the students should be assessed</p>
                    </div>

                    <img src={WhoIsAssessed} alt="assessment card" />
                    <img src={TheAssessor} alt="assessment card" />
                    <img src={AssessmentArtefact} alt="assessment card" />
                    <img src={AssessmentContext} alt="assessment card" />
                    <img src={AssessmentTiming} alt="assessment card" />
                    <img src={Format} alt="assessment card" />
                </div>
            </div>
        </div>
    );
}; 

export default Showcase;