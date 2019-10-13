const express = require('express');
const app = express();
const http = require('http').createServer(app);
const io = require('socket.io')(http);
const fs = require('fs');

app.get('/', function(req, res){
  res.sendFile(__dirname + '/public/index.html');
});

app.use(express.static('public'));

io.on('connection', function(socket){
  fs.readFile(__dirname + '/public/images/iguana.jpg', function(err, data){
    socket.emit('imageConversionByServer', data.toString("base64"));
  });
});

http.listen(3000, function(){
  console.log('listening on *:3000');
});