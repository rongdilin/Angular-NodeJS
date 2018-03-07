var express = require('express');

var app = express();

//set directory name
app.use(express.static('asset'));


app.get('/', function(req, res){
    res.send('Hello all, welcome to my home page!');
});

app.get('/profile', function(req, res){
    res.sendFile(__dirname + '/page.html');
});

app.get('/getdata/:uid/:username', function(req, res){
    console.log(req.params);
    //query string
    console.log(req.query);
});

app.use(function(req, res){
    res.redirect('/');
})



app.listen(1200, function(){
    console.log('Server n=running  @ localhost:1200');
});

/*
    MongoDB:
        show dbs
        use database_name //to create a db
        db.createCollection('collection_name'); // like users
        
        db.users.insert(            //to insert json object into db
            {"id": 1,
            "username": Rongdi,
            "phone": 123123
            }
        );                      

        db.users.find()     //return all the elements in db
        .pretty()           //to make it formatted

        db.users.find({"user_id“: “2"});                       //return all the matching record
                "user_id": {$in : [1,2]}                      // multiple specified value, 1 and 2
                $or:[{"user_id: 2"}, {"username: Rongdi"}] // user_id or username
                "user_id": {$gte: 2}                           //greater than and equal, $lt: less than

        db.users.find({"user_id": 1}, {"username":1}).pretty()// to limit the condition, to retrive the matching data
        
        db.users.update({
            "user_id": 2
        }, {
            $set: {
                "location": "location 2 - updated!"
                "country": "US"
            },
            {"multi": true}
        }}); //to update the specific condition, use like find function
            //to create the new property of collection 
            //if you not set user_id, it will find the very first matching one
            //multi: If set to true, updates multiple documents that meet the query criteria. If set to false, updates one document. 
            The default value is false. 
            //$set ==> $unset() it can remove specific property

        db.users.remove({"user_id": 4}); //remove documents from the collection
*/  