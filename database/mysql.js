const mysql = require('mysql2/promise');

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'sql_2020',
});

const query = async (sql, params, res) => {
  try {
    const cn = await mysql;
    const response = await cn.query(sql, params);
    const data = response[0];
    res.status(200).json(data);
  } catch (err) {
    res.status(500, { error: err });
  }
};

module.exports = {
  query,
};
