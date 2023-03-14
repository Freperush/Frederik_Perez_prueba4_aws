const mongoose = require('mongoose');

const OfferSchema = new mongoose.Schema({
    jobName: { 
        type: String,
        required: [ true, "JobName is required"]
        },
    earn: {
        type: Number,
        required: [
            true,
            "earn is required"
        ]
    },
    languages: {
        type: [String],
        required: [true, 'languages are required']
    },
});

const Offer = mongoose.model('Offer', OfferSchema);
module.exports = Offer;