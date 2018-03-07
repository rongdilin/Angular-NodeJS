function fn1(){
    var promise = new Promise(function(resolve, reject){
        setTimeout(function(){
            resolve('fn1() resolve');
        }, 2000);
    });
    return promise;
}

function fn2(fun1_res){
    var promise = new Promise(function(resolve, reject){
        setTimeout(function(){
            resolve('fn2() resolve');
        }, 2000);
    });
    return promise;
}

async function fn(){
    var fn1_res = await fn1();
    var fn2_res = await fn2(fn1_res);
    console.log({
        fn1_res, fn2_res
    });
}

fn();
// fun1().then(function(data){
//     fn2(data);
// });