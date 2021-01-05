const mysql = require('../database/mysql');
const queryCallback = require('../database/query-callback');

const home = (req, res) => {
  mysql.query('SELECT * FROM view_hostels', (err, data) =>
    queryCallback(err, data, res)
  );
};

const details = (req, res) => {
  mysql.query(
    'SELECT * FROM view_hostels WHERE id=?',
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
