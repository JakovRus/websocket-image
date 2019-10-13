const express = require('express');
const app = express();
const http = require('http').createServer(app);
const io = require('socket.io')(http);
const fs = require('fs');
const getFileSize = require('./src/file-size');

app.get('/', function(req, res){
  res.sendFile(__dirname + '/public/index.html');
});

app.use(express.static('public'));

io.on('connection', function(socket){
  const path = __dirname + '/public/images/iguana.jpg';
  const size = getFileSize(path);

  fs.readFile(path, function(err, data){
    socket.emit('image', `${size}_&&&&&_${data.toString("base64")}`);
  });

  socket.on('result', function (result) {
    console.log(result);
  });
});

http.listen(3000, function(){
  console.log('listening on *:3000');
});