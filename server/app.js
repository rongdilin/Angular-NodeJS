var express = require('express');
var cors = require('cors');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var Post = require('./model/post');
var User = require('./model/user');
var app = express();

mongoose.connect('mongodb://localhost/test');
var db = mongoose.connection;

//check db connection
db.on('error', function(){
    console.log('error connection to DB');
});

db.on('open', function(){
    console.log("MongoDB connection successfully");
});

//set server directory path
// app.use(express.static('server'));

//middleware
app.use(bodyParser.json());

//Break Same origin policy
var corsOptions = {
    origin: 'http://localhost:4200',
    optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204 
};

app.use(cors(corsOptions));



//Set our api here


//GET all post list
app.get('/getAllPost', function(req, res){
    Post.find({}, function(err, posts){
		if(err) console.log(err);
		res.json(posts);
	});
});

//find specific post and add like 
app.post('/addComment', function(req, res){
    var title = req.body.title;
    var description = req.body.description;
    var comment = req.body.comment;
    var user = comment.user;
    var message = comment.message;
    console.log(comment)

    Post.findOne({title: title, description: description}, function(err, post){
        if(err) console.log(err);

        post.update({ $set: { comment: {user: user, message: message} } }, function(err){
            if(err) {
                console.log(err);
            } else{
                res.json("addComment");
            }
        })
    })
});

//find specific post and add like 
app.post('/addLike', function(req, res){
    var title = req.body.title;
    var description = req.body.description;
    var like = req.body.like;

    Post.findOne({title: title, description: description}, function(err, post){
        if(err) console.log(err);
        post.update({ $set: { like: like } }, function(err){
            if(err) {
                console.log(err);
            } else{
                res.json("add One Like");
            }
        })
    })
});

//add a new post
app.post('/addNewPost', function(req, res){
    var title = req.body.title;
    var description = req.body.description;
    
	Post.find({}, function(err, post){
		if(err) console.log(err);
        var post = new Post({
            title: title,
            description: description,
            comment: {
                user: "", 
                message: ""
            },
            like: 0,
            likeBy: ""
        });

        post.save(function(err){
            if(err) {
                console.log(err);
            } else{
                res.json('postSaved');
            }
		});
    });
});

//POST User SIGN UP
app.post('/register', function(req, res){
    var username = req.body.username;
    var password = req.body.password;
    var email = req.body.email;
    var location = req.body.location;
    var phone = req.body.phone;
    
	User.findOne({username: username}, function(err, user){
		if(err) console.log(err);

		if(user){
			res.json('userExists');
		} else{
			var user = new User({
				username: username,
                password: password,
                email: email,
                location: location,
                phone: phone,
            });
			user.save(function(err){
				if(err) {
					console.log(err);
				} else{
					res.json('userRegistered');
				}
			});
        }
    });
});
//POST: User Login 
app.post('/login', function(req, res){
    var username = req.body.username;
    var password = req.body.password;
    User.findOne({username: username, password: password}, function(err, user){
        if(err) console.log(err);

		if(user){
            res.json(user);
		} else{
			res.json("Invalid Login");
		}
    });
});

app.listen(2000, function(){
    console.log("Server run @localhost:2000");
});