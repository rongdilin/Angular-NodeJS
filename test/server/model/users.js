var mongoose = require('mongoose');
/*
    create db schema

    Username
    Password
    Email
    Location
    Phone number
    User type
    Company
    Job seeker

*/

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
    "phone": Number,
    "user_type": {
        type: Boolean,
        require: true
    }
});

//var User = mongoose.model('demo', userSchema);

var User = module.exports = mongoose.model("demo", userSchema);
//store some examples for use in future
// var user_1 = new User({
//     "username": "Rongdi",
//     "password": "123",
//     "email": "adadda@gmail.com",
//     "location": "NY",
//     "phone": 123123,
//     "user_type": true
// });
// var user_2 = new User({
//     "username": "Arun",
//     "password": "123",
//     "email": "adadda@gmail.com",
//     "location": "CA",
//     "phone": 456456,
//     "user_type": false
// });

// user_1.save(function(err){
//     if(!err){
//         console.log('User 1 save successfully');
//     } else{
//         console.log(err.errors['description'].message);//give you all the validation error
//     }
// });

// user_2.save(function(err){
//     if(!err){
//         console.log('User 2 save successfully');
//     } else{
//         console.log(err.errors['description'].message);//give you all the validation error
//     }
// });