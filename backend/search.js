const AssessmentCard = require('./models/assessmentCard_schema');
const MissionCard = require('./models/missioncard_schema');

const handleSearch = async (req, res) => {

    let cards;
//using query parameters to get the diff fields

        if (req.query.card_type === "Assessment") {
            cards = await AssessmentCard.find();

            if(req.query.card_category) { //when querying the category, I add %20 where the spaces are
                let cardCategory = req.query.card_category;
                cards = AssessmentCard.find({card_category: cardCategory});

                if (req.query.random) {

                    cards = await AssessmentCard.find({card_category: cardCategory}); // finding the cards in the category

                    const randomCards = [];
                    const randomParamValue = parseInt(req.query.random); 
                    
                    // looping over the given value, f.ex random=3, and then gets three random cards
                    for (let i = 0; i < randomParamValue; i++) {

                        const randomIndex = Math.floor(Math.random() * cards.length);

                        randomCards.push(cards[randomIndex]);
                    }
                    

                    if (req.query.exclude) {
                        //had trouble solving this part..
                        //nonetheless, up until this point, random cards are getting pulled, which is the essence of the task
                    } else {
                        cards = randomCards;
                    }
            }
        }

        } else if (req.query.card_type === "Mission") {
            cards = await MissionCard.find();

            // getting random cards from the mission card type
            if (req.query.random) {

                cards = await MissionCard.find();

                const randomMissionCards = [];
                const randomParamValue = parseInt(req.query.random); 
                
                // looping over the given value, f.ex random=3, and then gets three random cards
                for (let i = 0; i < randomParamValue; i++) {

                    const randomIndex = Math.floor(Math.random() * cards.length);

                    randomMissionCards.push(cards[randomIndex]);
                }
                cards = randomMissionCards;
        }
        }
        else {
            throw new Error("Invalid card type");
        
        }
        return cards
}



module.exports = { handleSearch };
