var app = require('express')();
var http = require('http').createServer(app);
var io = require('socket.io')(http);
var fs = require('fs');

app.get('/', function(req, res){
  res.sendFile(__dirname + '/public/index.html');
});

io.on('connection', function(socket){
  fs.readFile(__dirname + '/public/images/iguana.jpg', function(err, data){
    socket.emit('imageConversionByServer', "data:image/png;base64,"+ data.toString("base64"));
  });
});

http.listen(3000, function(){
  console.log('listening on *:3000');
});