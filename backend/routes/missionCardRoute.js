const express = require('express');
const MissionCard = require('../models/missioncard_schema.js');
const router = express.Router();
const { getAllMissionCards, getOneMissionCard,
    createMissionCard, updateMissionCard,
    deleteMissionCard } = require('../controller/mission_controller.js');
const { auth, authRole, attachTokenToHeader } = require('./verifyToken.js');

// multer upload code
const upload = require('../upload.js');

//allows user to upload and update the icon of a specific mission card
router.put("/upload/:id", upload.single("file"), async (req, res) => {
    try {
        const updateIcon = await MissionCard.updateOne(
            { _id: req.params.id },
            {
                $set: {
                    // @ts-ignore
                    card_icon: req.file.path,
                }
            }
        );
        return res.status(200).json({
            message: `updated Icon`,
            data: updateIcon,
        });
    } catch (error) {
        res.status(400).send({ message: error.message });
    }
});

// allows user to upload and update icon of all mission cards
router.put("/upload", upload.single("file"), async (req, res) => {
    try {

        const updateAllIcons = await MissionCard.updateMany(
            {},
            {
                $set: {
                    // @ts-ignore
                    card_icon: req.file.path,
                }
            }
        );

        return res.status(200).json({
            message: `Updated icons for all mission cards`,
            data: updateAllIcons,
        });
    } catch (error) {
        res.status(400).send({ message: error.message });
    }
});

//gets all cards
router.get("/", getAllMissionCards);

//gets a specific card from cardid
//example: /api/missioncards/90
router.get("/:id", attachTokenToHeader, auth, authRole('Admin'), getOneMissionCard);

// create new mission card
router.post("/", attachTokenToHeader, auth, authRole('Admin'), createMissionCard);

//update a mission card
//example: method PUT -> /api/missioncards/90
router.put("/:id", attachTokenToHeader, auth, authRole('Admin'), updateMissionCard);


//delete a mission card
//example: method DELETE -> /api/missioncards/90
router.delete("/:id", attachTokenToHeader, auth, authRole('Admin'), deleteMissionCard);

module.exports = router;