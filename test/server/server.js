var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var app = express();
var User = require('./model/users');
var Job = require('./model/jobs');
//var router = express.Router();
//database connection
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
app.use(express.static('server'));

//middleware
app.use(bodyParser.json());

//Add Headers
app.use(function(req, res, next){
	//Website you wish to connect
	res.setHeader('Access-Control-Allow-Origin', '*');
	//Requests method you wish to allow
	res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
	//Requests header you wish to allow
	res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With, content-type');
	//Set to true if you need the website to include cookies in the requests sent to the API(e.g session)
	res.setHeader('Access-Control-Allow-Credentials', 'true');
	//pass to the next layer of middleware
	next();
});

// Set our api routes
//GET all job list
app.get('/', function(req, res){
    Job.find({}, function(err, jobs){
		if(err) console.log(err);
		res.json(jobs);
	});
});

//GET matching job list
app.post('/search', function(req, res){
    var title = req.body.title;
    var keywords = req.body.keywords;
    var location = req.body.location;

    Job.find(
        { $or:
            [
                {title: title},
                {keywords: keywords},
                {location: location}
            ]
        }, 
        function(err, jobs){
		if(err) console.log(err);
        res.json(jobs);
    });
});

//POST Job Store
app.post('/post_job', function(req, res){
    var title = req.body.title;
    var description = req.body.description;
    var keywords = req.body.keywords;
    var location = req.body.location;
    
	Job.find({}, function(err, job){
		if(err) console.log(err);
        var job = new Job({
            title: title,
            description: description,
            keywords: keywords,
            location: location,
        });

        job.save(function(err){
            if(err) {
                console.log(err);
            } else{
                res.json('jobPosted');
            }
		});
    });
});

//POST: User Login 
app.post('/login', function(req, res){
    var username = req.body.username;
    var password = req.body.password;
    User.findOne({username: username, password: password}, function(err, user){
        if(err) console.log(err);

		if(user){
            res.json({"user": user, "flag": true});
		} else{
			res.json("Invalid Login");
		}
		//res.json();
    });
});

//POST User SIGN UP
app.post('/register', function(req, res){
    var username = req.body.username;
    var password = req.body.password;
    var email = req.body.email;
    var location = req.body.location;
    var phone = req.body.phone;
    var user_type = req.body.user_type;
    
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
                user_type: user_type
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


app.listen(3000, function(){
    console.log("Server connection @localhost:3000");
});
