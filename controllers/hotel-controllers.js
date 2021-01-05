const mysql = require('../database/mysql');

const queryCallback = (err, data, res) => {
  if (err) {
    res.status(500).json(err);
  } else if (data.length == 0) {
    res.status(404).json({ message: 'Aucun résultat pour cette requête' });
  } else {
    res.status(200).json(data);
  }
};

const home = (req, res) => {
  mysql.query('SELECT * FROM hostels', (err, data) =>
    queryCallback(err, data, res)
  );
};

const details = (req, res) => {
  mysql.query(
    'SELECT * FROM hostels WHERE id=?',
    [req.params.id],
    (err, data) => queryCallback(err, data, res)
  );
};

module.exports = {
  home,
  details,
};
