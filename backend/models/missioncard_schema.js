/* maja oblig2 */
const mongoose = require('mongoose');

const missioncardSchema = new mongoose.Schema({
    card_id: {
        type: Number,
        required: true
    },
    card_type: {
        type: String, enum: ['Mission'],
        required: true
    },
    card_name: {
        type: String,
        required: true
    },
    card_description: {
        type: String,
        required: true
    },
    card_icon: {
        type: String,
        default: "uploads\\default.svg"
    }
});

module.exports = mongoose.model("MissionCard", missioncardSchema, "mission-cards");
