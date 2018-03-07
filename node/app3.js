var http = require('http');

http.createServer(function(req, res){
    if(req.url == '/home'){
        
    } else if(req.url == '/profile' ){ 
        res.end('Hello everyone!!!');
    } else{
        res.end('Invalid page req!');
    }
    
}).listen(1200);

console.log('Server running @ localhost:1200')