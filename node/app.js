var module_res = require('module'),
os = require('os'),
request = require('request'),
EventEmitter = require('events').EventEmitter;

function getData(counter){
    var e = new EventEmitter();
    var cntr = 0;
    setTimeout(function(){
        e.emit('process_started');
        var interval_var = setInterval(function(){
            e.emit('data_processed', {msg:'Data set ' + cntr + ' completed!'});
            cntr++;
            if(counter == cntr){
                clearInterval(interval_var);
                e.emit('process_complete');
            }
        }, 1000);
    }, 3000);
    return e;
};

var res = getData(5);

res.on('process_started', function(){
    console.log("data starts processing!!!");
});

res.on('data_processed', function(data){
    console.log(data.msg);
});
res.on('process_complete', function(){
    console.log("process complete!");
});
// request('http://www.google.com',function(err, res, body){
//     console.log(body);
// });


// module_res.arrFn(['User 1', 'User 2'], function(err, data){
//     if(err){
//         console.log(err);
//         return;
//     }
//     console.log(data);
// });

// module_res.promiseFn().then(function(data){
//     console.log(data);

// },
// function(err){
//     console.log(err);
// });