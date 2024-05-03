import React from "react";
import './welcome_card.css';
import { Link } from 'react-router-dom';
const WelcomeCard = () => {
    return (
        <div className="Welcome-card">
            <h1>Welcome to the The SUPER Assessor</h1>
            <p>SUPER Assessor, a game designed for educators, is the result of a research project undertaken by the Department of Design in Trondheim. 
                Its primary objective is to aid educators in the development of unique assessment methods. 
                These methods are intended to create innovative ways to evaluate and grade students.
                Dive in to start generating ideas!</p>
            <button className="Default-button"> <Link className="Link-style" to={'./login'} >Log in here</Link> </button>
        </div>
    );
}; 

export default WelcomeCard;