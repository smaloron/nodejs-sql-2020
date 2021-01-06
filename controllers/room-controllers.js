const mysql = require('../database/mysql');
const queryCallback = require('../database/query-callback');

const home = (req, res) => {
  mysql.query(
    'SELECT * FROM view_rooms WHERE hotel_id=?',
    [req.params.hotelId],
    (err, data) => queryCallback(err, data, res)
  );
};

const details = (req, res) => {
  mysql.query(
    'SELECT * FROM view_rooms WHERE id=?',
    [req.params.roomId],
    (err, data) => queryCallback(err, data, res)
  );
};

const deleteOne = (req, res) => {
  mysql.query(
    //
    'DELETE FROM rooms WHERE id= ?',
    [req.params.id],
    (err, data) => queryCallback(err, data, res)
  );
};

const insertOne = (req, res) => {
  mysql.query(
    // sql
    'INSERT INTO rooms SET ?',
    // données postées
    req.body,
    // fonction de callback
    (err, data) => queryCallback(err, data, res)
  );
};

const updateOne = (req, res) => {
  mysql.query(
    // sql
    'UPDATE rooms SET ? WHERE id=?',
    // données
    [req.body, req.body.id],
    // fonction de callback
    (err, data) => queryCallback(err, data, res)
  );
};

module.exports = {
  home,
  details,
  deleteOne,
  insertOne,
  updateOne,
};
