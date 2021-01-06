// import du module express
const express = require('express');

// import du module fileSystem (fs)
const fs = require('fs');

// import du module morgan pour logger l'activité
const morgan = require('morgan');

// Import du module body-parser pour récupérer les données postées
const bodyParser = require('body-parser');

// Import des routes
const mainRoutes = require('./routes/main-routes');
const hotelRoutes = require('./routes/hotel-routes');
const roomRoutes = require('./routes/room-routes');

// Création de l'application
const app = express();

// Création d'un stream d'écriture
const loggerStream = fs.createWriteStream('access.log', { flags: 'a' });

// Middlewares qui s'appliqueront à toutes les routes
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(morgan('combined', { stream: loggerStream }));

// Gestion des routes
app.use('/main', mainRoutes);
app.use('/hotel', hotelRoutes);
app.use('/room', roomRoutes);

// Gestion des erreurs
app.use(async (err, req, res, next) => {
  const message = new Date().toLocaleDateString() + ' ' + err + '\n';
  await fs.promises.writeFile('error.log', message, { flag: 'a' });
  console.log(message);
  next();
});

app.use((err, req, res, next) => {
  res.status(500).end("oups désolé j'ai planté");
});

// Lancement de l'application
app.listen(3000, () => console.log('app started'));
