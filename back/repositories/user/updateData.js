'use strict';
const db = require('../../infraestructure/database');

async function updateData(arr) {
  const pool = await db.getPool();
  const query = 'UPDATE Usuarios SET Usr_nombre = ?, Usr_bio = ? WHERE Usr_ID = ?';
  const [result] = await pool.execute(query, arr);

  return result;
}
module.exports = { updateData };
