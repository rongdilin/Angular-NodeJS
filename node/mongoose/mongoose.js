var express = require('express');

var mongoose = require('mongoose');

var app = express();

mongoose.connect('mongodb://localhost/marlabs');
var db = mongoose.connection;

db.on('error', function(){
    console.log('error connection to DB');
});

db.on('open', function(){
    console.log("connection successfully");
});

var articleSchema = mongoose.Schema({
    "article_id": Number,
    "title": {
        type: String,
        required: true
    },
    "description": {
        type: String,
        required: [true, 'Description cannot be blank']//overwrite the error message
    },
    "active": Boolean
});

var Article = mongoose.model('articles', articleSchema);//('collection_name', schema);

var article_1 = new Article({
    "article_id": 1,
    "title": "Test Title",
    "description": "this is the description",
    "active": true
});

article_1.save(function(err){
    if(!err){
        console.log('article save successfully');
    } else{
        console.log(err.errors['description'].message);//give you all the validation error
    }
});
Article.find({}, function(err, docs){
    console.log(docs);
});

app.listen(3000, function(){
    console.log("Server running@localhost:3000");
});