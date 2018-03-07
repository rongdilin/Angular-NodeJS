var mongoose = require('mongoose');

var jobsSchema = mongoose.Schema({
    "title": {
        type: String,
        required: true
    },
    "description": {
        type: String
    },
    "keywords": String,
    "location": String
});


var Job = module.exports = mongoose.model("demo2", jobsSchema);