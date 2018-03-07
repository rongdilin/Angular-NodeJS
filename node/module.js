var username = "Rongdi";

var fn = function(){
    return "Lin";
}

var users = ['User 1', 'User 2', 'User 3'];

var arrFn = function(arr, callbackFn){
    if(arr.length == 0){
        callbackFn('Error: array Empty!');
    }else{
        for(let i = 0; i < arr.length; i++){
            callbackFn('', arr[i]);
        }
    }
};

var promiseFn = function(){
    var promise = new Promise(function(resolve, reject){
        setTimeout(function(){
            resolve( 'Hello');
        }, 3000);
    });
    return promise;
};
module.exports = {
    username, fn, arrFn, promiseFn
};

