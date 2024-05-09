const express = require('express');
const router = express.Router();
const AssessmentCard = require('../models/assessmentCard_schema.js');
const { getAllAssessCards, getOneAssessCard,
    createNewAssessCard, updateOneAssessCard,
    deleteOneAssessCard, getCategories } = require('../controller/assessment_controller.js');
const { auth, authRole } = require('./verifyToken.js');

const upload = require('../upload.js');

// Note: in order to avoid an error I had with the /upload route, I had to put these routes before the rest
//allows user to upload and update the icon of a specific card
router.put("/upload/:id", upload.single("file"), async (req, res) => {
    try {
        const updateIcon = await AssessmentCard.updateOne(
            { _id: req.params.id },
            {
                $set: {
                    // @ts-ignore
                    card_icon: req.file.path,
                }
            }
        );
        return res.status(200).json({
            message: `updated Icon for assessment card`,
            data: updateIcon,
        });
    } catch (error) {
        res.status(400).send({ message: error.message });
    }
});

// updates all card icons with custom icon thats uploaded
router.put("/upload", upload.single("file"), async (req, res) => {
    try {
        const updateAllIcons = await AssessmentCard.updateMany(
            {},
            {
                $set: {
                    // @ts-ignore
                    card_icon: req.file.path,
                }
            }
        );

        return res.status(200).json({
            message: `Updated icons for all assessment cards with custom svg icon`,
            data: updateAllIcons,
        });
    } catch (error) {
        res.status(400).send({ message: error.message });
    }
});


const { handleSearch } = require('../search.js');
// update card icon for cards in a specific category
router.put("/upload/category/:category", upload.single("file"), async (req, res) => {
    try {
        const category = req.params.category;
        const filePath = req.file.path; 

        const cards = await handleSearch({ query: { card_type: "Assessment", card_category: category } });

        for (const card of cards) {
            card.card_icon = filePath;
            await card.save();
        }

        res.json({ message: `Uploaded file for category "${category}"`, filePath });
    } catch (err) {
        console.error('Error uploading file:', err);
        res.status(500).json({ message: ' error' });
    }
});






        
router.get("/categories", getCategories);

// get all cards
router.get("/", getAllAssessCards);

// get a specific card by id
router.get("/:id", auth, authRole('Admin'), getOneAssessCard);

// create a new card
router.post("/", auth, authRole('Admin'), createNewAssessCard);

//update a specific card with id
router.put("/:id", auth, authRole('Admin'), updateOneAssessCard);

// delete a specific card with id
router.delete("/:id", auth, authRole('Admin'), deleteOneAssessCard);



module.exports = router;