const home = (req, res) => {
  res.status(200).end("Les chambres de l'hôtel " + req.params.hotelId);
};

const details = (req, res) => {
  res
    .status(200)
    .end(
      'détail de la chambre ' +
        req.params.roomId +
        " de l'hôtel " +
        req.params.hotelId
    );
};

module.exports = {
  home,
  details,
};
