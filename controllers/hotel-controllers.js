const mysql = require('../database/mysql');

const home = (req, res) => {
  mysql.query('SELECT * FROM view_hostels', res);
};

const details = (req, res) => {
  mysql.query('SELECT * FROM view_hostels WHERE id=?', [req.params.id], res);
};

const deleteOneById = (req, res) => {
  mysql.query('DELETE FROM hostels WHERE id=?', [req.params.id], res);
};

const insertOne = (req, res) => {
  mysql.query(
    // sql
    'INSERT INTO hostels SET ?',
    // données postées
    req.body,
    res
  );
};

const updateOne = (req, res) => {
  mysql.query(
    // sql
    'UPDATE hostels SET ? WHERE id=?',
    // données
    [req.body, req.body.id],
    res
  );
};

module.exports = {
  home,
  details,
  deleteOneById,
  insertOne,
  updateOne,
};
