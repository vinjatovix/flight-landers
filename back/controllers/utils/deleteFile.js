'use strict';

const fs = require('fs').promises;

async function deleteFile(path) {
  try {
    await fs.unlink(path);
    return true;
  } catch (error) {
    return false;
  }
}
module.exports = { deleteFile };
