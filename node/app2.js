var fs = require('fs');//file system

// fs.readFile('app.js', 'utf-8', function(err,data){
//     if(err){
//         console.log('Error reading file.');
//     } else{
//         console.log(data);
//     }
// });

// fs.wtiteFile('temp.txt','This is a test context', 'utf-8', function(err){
//     if(err){
//         console.log('error writing data to file.');
//     } else{
//         console.log('Data written to file.');
//     }
// });

//add some text
// fs.open('temp.txt', 'a+', function(err, filepoint){
//     fs.write(filepoint, 'New content for file', 'utf-8',function(err){
//         if(err){
//             console.log('Data write complete!!');
//         }
//     });
// })





//-----------------------------------------------------
// var read_stream = fs.createReadStream('temp.txt');

// read_stream.setEncoding('UTF8');

// var write_stream = fs.createWriteStream('temp2.txt');

// var pipe_var = read_stream.pipe(write_stream);

// pipe_var.on('close', function(){
//     console.log('Write complete!!');
// });

fs.unlink('temp.txt', function(){
    console.log('File removed!');
});
// read_stream.on('data', function(data){
//     console.log('Data = ' + data);
// });

// read_stream.on('err', function(){
//     console.log('error happened!');
// });

// read_stream.on('end', function(){   
//     console.log('File read conplete!');
// });