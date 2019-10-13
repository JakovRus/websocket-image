const socket = require('socket.io');
const fs = require('fs');
const getFileSize = require('./file-size');

function attachListeners(socket) {
  socket.on('result', function (result) {
    console.log(result);
  });
}

function sendFile(socket) {
  const path = __dirname + '/../public/images/iguana.jpg';
  const size = getFileSize(path);
  const delimiter = '_&&&&&_';

  fs.readFile(path, function(err, data){
    socket.emit('image', `${size}${delimiter}${data.toString("base64")}`);
  });
}

function setup(server) {
  const io = socket.listen(server);

  io.on('connection', (socket) => {
    attachListeners(socket);
    sendFile(socket);
  });
}

module.exports = setup;