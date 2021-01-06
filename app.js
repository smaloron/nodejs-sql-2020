// import du module express
const express = require('express');

// import du module fileSystem (fs)
const fs = require('fs');

// import du module morgan pour logger l'activité
const morgan = require('morgan');

// Import du module body-parser pour récupérer les données postées
const bodyParser = require('body-parser');

// Import de json web token
const jwt = require('jsonwebtoken');

const mysql = require('./database/mysql');

// clef secrète pour JWT
const jwtSecret = 'chuuut faut pas le dire';

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

app.get('/jwt', (req, res) => {
  // Définition des données
  const user = { name: 'Joe', pass: '123', role: 'admin' };
  // Création d'un token
  const token = jwt.sign(user, jwtSecret, { expiresIn: '20m' });

  res.status(200).json({ token: token });
});

app.post('/login', async (req, res) => {
  try {
    // Connexion à la base de données
    const cn = await mysql.db;
    // envoi de la requête pour vérifier les infos de l'utilisateur
    const response = await cn.query(
      'SELECT * FROM users WHERE login=? AND pwd=SHA1(?)',
      [req.body.login, req.body.pwd]
    );
    // Attention les données sont dans un tableau de tableau contenant un objet
    const data = response[0][0];
    // Si aucune données alors la clef 0 du résultat est un tableau vide
    const isFound = response[0].length > 0;

    // Utilisateur trouvé
    if (isFound) {
      // Il faut créer un objet car JWT n'aime pas celui généré par la requête
      const user = {
        login: data.login,
        username: data.username,
        id: data.id,
      };
      // Création du token à partir de l'objet user
      token = jwt.sign(user, jwtSecret);
      // Envoi de la réponse au format jso en transmettant le user et le token
      res.status(200).json({ user: user, token: token });
    } else {
      // user est vide la requête n'a retourné aucun résultat
      res.status(401).json({ error: 'utilisateur non trouvé' });
    }
  } catch (err) {
    // Erreur interne du serveur
    res.status(500).json({ error: err });
  }
});

// Middleware pour la gestion des autorisations
const extractToken = req => {
  let token = null;

  if (typeof req.headers.authorization == 'string') {
    const parts = req.headers.authorization.split(' ');
    if (parts.length == 2) {
      token = parts[1];
    }
  }

  return token;
};
app.use(async (req, res, next) => {
  const token = extractToken(req);
  try {
    const decoded = await jwt.verify(token, jwtSecret);
    req.user = decoded;
    req.token = token;
    next();
  } catch (err) {
    res.status(403).json({ error: err });
  }
});

// Gestion des routes
app.use('/main', mainRoutes);
app.use('/hotel', hotelRoutes);
app.use('/room', roomRoutes);

app.get('/secure', async (req, res) => {
  res.status(200).json({ user: req.user, token: req.token });
});

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
