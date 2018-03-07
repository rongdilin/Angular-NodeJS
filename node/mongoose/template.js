var engine = require('consolidate');

var express = require('express');

var app = express();

var socketio = require('socket.io');

app.engine('html', engine.nunjucks);//setup view engine(view in server side)
app.set('view engine', 'html'); // set your view file type
console.log(__dirname);
app.set('views', __dirname + '/views'); // where you view file is gonna be
app.get('/', function(req, res){
    var username = "Marlabs";
    var company = ['Google', 'FB', 'LinkedIn'];
    res.render('home', {'username': username, 'companies': company});
});

var server = app.listen(3000, function(){
    console.log('Server running @localhost:3000');
});

var io = socketio.listen(server); //we need to build the connection between client and server

io.sockets.on('connection', function(socket){
    socket.on('msg_to_server', function(data){
        io.sockets.emit('msg_to_client', data);//you can give any event name
        //io.sockets.emit() this will get all sockets all data from user client
    });
});

