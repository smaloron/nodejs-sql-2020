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

module.exports = {
  home,
  details,
  deleteOne,
};
