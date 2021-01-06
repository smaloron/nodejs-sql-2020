const mysql = require('../database/mysql');
const queryCallback = require('../database/query-callback');

const home = (req, res) => {
  mysql.query(
    'SELECT * FROM view_rooms WHERE hotel_id=?',
    [req.params.hotelId],
    res
  );
};

const details = (req, res) => {
  mysql.query('SELECT * FROM view_rooms WHERE id=?', [req.params.roomId], res);
};

const deleteOne = (req, res) => {
  mysql.query(
    //
    'DELETE FROM rooms WHERE id= ?',
    [req.params.id],
    res
  );
};

const insertOne = (req, res) => {
  mysql.query(
    // sql
    'INSERT INTO rooms SET ?',
    // données postées
    req.body,
    // fonction de callback
    res
  );
};

const updateOne = (req, res) => {
  mysql.query(
    // sql
    'UPDATE rooms SET ? WHERE id=?',
    // données
    [req.body, req.body.id],
    // fonction de callback
    res
  );
};

module.exports = {
  home,
  details,
  deleteOne,
  insertOne,
  updateOne,
};
