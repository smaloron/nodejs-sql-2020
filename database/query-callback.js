const queryCallback = (err, data, res) => {
  if (err) {
    res.status(500).json(err);
  } else if (data.length == 0) {
    res.status(404).json({ message: 'Aucun résultat pour cette requête' });
  } else {
    res.status(200).json(data);
  }
};

module.exports = queryCallback;
