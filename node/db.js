var express = require('express');
var mongodb = require('mongodb');
var bodyParser = require('body-parser');

var mongoose = mongodb.MongoClient;

var app = express();

var mongo_obj = '';
app.use(express.static('page'));//we can directly use the file in page file

app.use(bodyParser.json());//if we don't use it, it won't have req.body and req.params


/*
This block for DB connection
*/
var conn_str = 'mongodb://localhost:27017/';
mongoose.connect(conn_str, function(err, client){
    if(!err){
        mongo_obj = client;
        app.listen(2000,function(){
            console.log("Server running @ localhost: 2000");
        })
        console.log("connect DB!");
    }
});



/*
This block is for route between db and service
*/
app.get('/', function(req, res){
    //When an error occurs or transfer is complete, the method calls the optional callback 
    //function. This method uses res.sendFile() to transfer the file.
    res.sendFile(__dirname + '/main.html');
    //__dirname: root/absolute path
})

app.get('/getUsers', function(req, res){
    var db = mongo_obj.db('marlabs');
    db.collection('users').find({}).toArray(function(err, docs){ // if no .toArray(), it would return Cursor Object
        res.send(docs);
    });
})

app.post('/createUsers', function(req, res){
    var db = mongo_obj.db('marlabs');
    db.collection('users').insert(req.body, function(err){
        if(!err){
            res.send({'flag': 'success'});
        }
    })
})

