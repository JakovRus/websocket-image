function getResult(response) {
  const delimiter = '_&&&&&_';
  const parts = response.split(delimiter);

  return {
    size: parts[0],
    base64: parts[1],
  };
}

function sendResult(socket, serverSize, clientSize) {
  const result = {
    serverSize,
    clientSize,
  };

  socket.emit('result', result);
}

function setSrc(base64) {
  const src = `data:image/png;base64,${base64}`;
  document.querySelector("#img").setAttribute("src", src);
}

(function onImage() {
  const socket = io();

  socket.on('image', function(data) {
    const result = getResult(data);
    setSrc(result.base64);

    sendResult(socket, parseInt(result.size), b64toBlob(result.base64).size);
  })
})();