const fs = require('fs');

function getFileSize(path) {
  const stat = fs.statSync(path);
  return stat.size;
}

module.exports = getFileSize;