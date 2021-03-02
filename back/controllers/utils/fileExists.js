'use strict';

const fs = require('fs').promises;

async function fileExists(path) {
  try {
    await fs.access(path);
    return true;
  } catch (error) {
    return false;
  }
}

module.exports = { fileExists };
