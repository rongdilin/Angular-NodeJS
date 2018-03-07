var mongoose = require('mongoose');

var postsSchema = mongoose.Schema({
    "title": {
        type: String,
        required: true
    },
    "description": String,
    "comment": [{
                "user": String, 
                "message": String
            }],
    "like": Number,
    "likeBy": String
});


var Post = module.exports = mongoose.model("postInfo", postsSchema);