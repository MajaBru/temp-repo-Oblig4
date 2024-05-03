/* backend oblig2 maja */

const mongoose = require('mongoose');

const assessmentcardSchema = new mongoose.Schema({
    card_id: {
        type: Number,
        required: true
    },
    card_type: {
        type: String, enum: ['Assessment'],
        required: true
    },
    card_category: {
        type: String, 
        enum: ['Who is assessed', 'The assessor', 'Assessment artefact', 'Assessment format', 'Context', 'Assessment timing'],
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
    card_details: {
        type: String,
        required: true
    },
    card_icon: {
        type: String,
        default: "uploads\\default.svg" // path should be the same as the other cards. 
        //I guess I also could have used an external svg url here
        // double slashes are used to escape the backslash
    }
});

module.exports = mongoose.model("AssessmentCard", assessmentcardSchema, "assessment-cards");