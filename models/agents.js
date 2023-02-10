const { Pool } = require('pg');

const pool = new Pool({
  host: 'localhost',
  port: 5432,
  user: 'postgres',
  password: 'software@alliance',
  database: 'staffing_company'
});

const addCustomId = async (id, customId) => {
  const query = `UPDATE agents SET custom_id = $2 WHERE id = $1`;
  const values = [id, customId];
  await pool.query(query, values);
};

module.exports = {
  addCustomId
};
