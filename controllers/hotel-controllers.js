const home = (req, res) => {
  res.status(200).end('Liste des hôtels');
};

const details = (req, res) => {
  res.status(200).end("détail de l'hôtel " + req.params.id);
};

module.exports = {
  home,
  details,
};
