const AssessmentCard = require("../models/assessmentCard_schema");

const getAllAssessCards = async (req, res) => {
    try {
      const assessmentcards = await AssessmentCard.find();

      return res.status(200).json({
        count: assessmentcards.length,
        data: assessmentcards,
      });
    } catch (error) {
      res.status(400).send({ message: error.message });
    }
  };

const getOneAssessCard = async (req, res) => {
    try {
      const { id } = req.params;
      const card = await AssessmentCard.findById(id);
  
      return res.status(200).json({
        data: card,
      });
    } catch (error) {
      res.status(500).send({message: error.message});
    }
  };

const createNewAssessCard = async (req, res) => {
  
    let newAssessmentCard = new AssessmentCard({
      card_id: req.body.card_id,
      card_type: req.body.card_type,
      card_category: req.body.card_category,
      card_name: req.body.card_name,
      card_description: req.body.card_description,
      card_details: req.body.card_details,
    });
    try {
      const assessmentcard = await newAssessmentCard.save();
      return res.status(201).json({
        data: assessmentcard,
      })
    } catch (error) {
      res.status(400).send({message: error.message});
    }
};


//update a specific card with id

const updateOneAssessCard = async (req, res) => {
    try {
      const updatedcard = await AssessmentCard.updateOne(
        { _id: req.params.id },
        {
          $set: {
            card_id: req.body.card_id,
            card_type: req.body.card_type,
            card_category: req.body.card_category,
            card_name: req.body.card_name,
            card_description: req.body.card_description,
            card_details: req.body.card_details,
          }
        }
      );
      return res.status(200).json({
        message: `Card updated`,
        data: updatedcard,
    });
} catch (error) {
    res.status(400).send({ message: error.message });
}
};

// delete a specific card with id
const deleteOneAssessCard = async (req, res) => {
    try {
        const deletedcard = await AssessmentCard.deleteOne({ card_id: req.params.id });
        return res.status(200).json({
            message: `Card deleted`,
            data: deletedcard,
        });
    } catch (error) {
        res.status(400).send({ message: error.message });
    }
};


// get all assessmentcard categories
const getCategories = async (req, res) => {
    try {
        const allcategories = await AssessmentCard.distinct("card_category");
        return res.status(200).json({
            data: allcategories,
        });
    } catch (error) {
        res.status(400).send({ message: error.message });
    }
};
module.exports = { 
    getAllAssessCards,
    getOneAssessCard, 
    createNewAssessCard, 
    updateOneAssessCard,
    deleteOneAssessCard,
    getCategories,
    }