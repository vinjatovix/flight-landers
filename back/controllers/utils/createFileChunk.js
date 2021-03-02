'use strict';

const FileType = require('file-type');
const readChunk = require('read-chunk');

async function createFileChunk(file) {
  const tmpFile = file.tempFilePath;
  const buffer = readChunk.sync(tmpFile, 0, 4100);
  const fileBuffer = await FileType.fromBuffer(buffer);
  return fileBuffer;
}

module.exports = { createFileChunk };
