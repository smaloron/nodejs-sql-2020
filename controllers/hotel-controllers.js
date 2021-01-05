const mysql = require('../database/mysql');

const home = (req, res) => {
  mysql.query('SELECT * FROM hostels', (err, data) => {
    if (err) {
      res.status(500).json(err);
    } else {
      res.status(200).json(data);
    }
  });
};

const details = (req, res) => {
  mysql.query(
    'SELECT * FROM hostels WHERE id=?',
    [req.params.id],
    (err, data) => {
      if (err) {
        res.status(500).json(err);
      } else {
        res.status(200).json(data);
      }
    }
  );
};

module.exports = {
  home,
  details,
};
