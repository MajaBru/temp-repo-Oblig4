const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();
const cors = require('cors');
const PORT = process.env.PORT || 5000;
const DBconnection = require('./connection');
const cookieParser = require('cookie-parser');


const app = express();
DBconnection();

app.use(express.json());
app.use(cookieParser());

//import modules from /routes folder
const MissionCard = require('./models/missioncard_schema');
const AssessmentCard = require('./models/assessmentCard_schema');

const missionCardsRoute = require('./routes/missionCardRoute');
const assessmentCardsRoute = require('./routes/assessmentCardsRoute');
const authRoute = require('./routes/authRoute');


//cors https://www.npmjs.com/package/cors
app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true
}));

// here we define endpoints
app.use('/missioncards', missionCardsRoute);
app.use('/assessmentcards', assessmentCardsRoute);
app.use('/api/user', authRoute);
app.use("/uploads", express.static("uploads"));


// search route
const { handleSearch } = require('./search.js');

app.get('/search', async (req, res) => {
    try {
        const results = await handleSearch(req);
        res.json(results);
        
    } catch (err) {
        console.error('Error searching cards:', err);
        res.status(500).json({ message: 'Internal server error' });
    }
});

// get all cards
app.get('/cards', async (req, res) => {
    try {
        const assessmentCards = await AssessmentCard.find();
        const missionCards = await MissionCard.find();
        const allCards = [...assessmentCards, ...missionCards];

        res.json({ data: allCards });
    } catch (error) {
        console.error('Error', error);
        res.status(500).json({ error });
    }
});

app.get('/cards/:id', async (req, res) => {
    const { id } = req.params;

    try {
        let card;
        card = await AssessmentCard.findById(id);

        if (!card) {
            card = await MissionCard.findById(id);
        }
        if (card) {
            res.json({ data: card });
        } else {
            
            res.status(404).json({ error: 'Card not found' });
        }
    } catch (error) {
        console.error('Error fetching card', error);
        res.status(500).json({ error });
    }
});


app.get('/', (req, res) => {
    res.send('Hello World!')
  });

app.listen(PORT, () => {
console.log(`Server is running on port ${PORT}`)
})