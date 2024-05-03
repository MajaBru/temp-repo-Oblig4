const MissionCard = require('../models/missioncard_schema');


const getAllMissionCards = async (req, res) => {
    try {
      const missioncards = await MissionCard.find();
  
      return res.status(200).json({
        count: missioncards.length,
        data: missioncards,
      });
    } catch (error) {
      res.status(500).send({ message:error.message});
    }
  };

  const getOneMissionCard = async (req, res) => {
    try {
      const { id } = req.params;
      const missioncard = await MissionCard.findById(id);
  
      return res.status(200).json({
        data: missioncard,
      });
    } catch (error) {
      res.status(500).send({message: error.message});
    }
  };

const createMissionCard = async (req, res) => {
    const newMissionCard = new MissionCard({
      card_id: req.body.card_id,
      card_type: req.body.card_type,
      card_name: req.body.card_name,
      card_description: req.body.card_description,
    });
    try {
      const missioncard = await newMissionCard.save();
      return res.status(201).json({
        data: missioncard,
      })
    } catch (error) {
      res.status(400).send({message: error.message});
    }
};

const updateMissionCard = async (req, res) => {
    try {
        const updatedMissionCard = await MissionCard.updateOne(
            { _id: req.params.id },
            {
                $set: {
                    card_id: req.body.card_id,
                    card_type: req.body.card_type,
                    card_name: req.body.card_name,
                    card_description: req.body.card_description,
                    card_icon: req.body.card_icon,
                }
            }
        );
        return res.status(200).json({
            message: `Card updated`,
            data: updatedMissionCard,
        });
    } catch (error) {
        res.status(400).send({ message: error.message });
    }
};

const deleteMissionCard = async (req, res) => {
    try {
        const deletedMissionCard = await MissionCard.deleteOne({ card_id: req.params.id });
        return res.status(200).json({
            message: `Card deleted`,
            data: deletedMissionCard,
        });
    } catch (error) {
        res.status(400).send({ message: error.message });
    }
};


module.exports = {
    getAllMissionCards,
    getOneMissionCard,
    createMissionCard,
    updateMissionCard,
    deleteMissionCard,
};