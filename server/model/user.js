var mongoose = require('mongoose');
 
var userSchema = mongoose.Schema({
    "username": {
        type: String,
        required: true
    },
    "password": {
        type: String,
        required: true
    },
    "email": String,
    "location": String,
    "phone": Number
});

var User = module.exports = mongoose.model("userInfo", userSchema);
