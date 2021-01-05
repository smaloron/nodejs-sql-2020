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

const deleteOneById = (req, res) => {
  mysql.query('DELETE FROM hostels WHERE id=?', [req.params.id], (err, data) =>
    queryCallback(err, data, res)
  );
};

const insertOne = (req, res) => {
  mysql.query(
    // sql
    'INSERT INTO hostels SET ?',
    // données postées
    req.body,
    // fonction de callback
    (err, data) => queryCallback(err, data, res)
  );
};

const updateOne = (req, res) => {
  mysql.query(
    // sql
    'UPDATE hostels SET ? WHERE id=?',
    // données
    [req.body, req.body.id],
    // fonction de callback
    (err, data) => queryCallback(err, data, res)
  );
};

module.exports = {
  home,
  details,
  deleteOneById,
  insertOne,
  updateOne,
};
