const mongoose = require('mongoose');

const trackitem = mongoose.Schema({
    task: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        required: true
    }
});

module.exports = mongoose.model('trackeritem', trackitem, 'trackitem');
