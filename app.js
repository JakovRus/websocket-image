const express = require('express');
const app = express();
const http = require('http').Server(app);
const setup = require('./src/websocket');

app.get('/', function(req, res){
  res.sendFile(__dirname + '/public/index.html');
});

setup(http);

app.use(express.static('public'));

http.listen(3000);