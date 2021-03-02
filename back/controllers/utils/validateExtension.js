'use strict';

function validateExtension(tipo, validExtensions) {
  if (!tipo || tipo.length === 0 || !validExtensions.includes(tipo.ext)) {
    return false;
  }
  return true;
}
module.exports = { validateExtension };
