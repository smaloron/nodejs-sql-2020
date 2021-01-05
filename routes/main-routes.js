const express = require('express');

// Import de la connexion à MySQL
const mysql = require('../database/mysql');

// Extraction du router depuis Express
const router = express.Router();

// middleware pour ce groupe de routes
router.use((req, res, next) => {
  console.log('main');
  next();
});

// Définition des routes
router.get('/', (req, res) => {
  // Exécution d'une requête
  mysql.query('SELECT * FROM films', (err, data) => {
    if (err) {
      res.status(500).json({ message: err });
    } else {
      res.status(200).json(data);
    }
  });
});

router.get('/film/:id([0-9]+)', (req, res) => {
  mysql.query(
    'SELECT * FROM films WHERE id=?',
    [req.params.id],
    (err, data) => {
      res.status(200).json(data);
    }
  );
});

router.get('/matiere/new/:name', (req, res) => {
  const matiere = { matiere: req.params.name };
  mysql.query('INSERT INTO matieres SET ?', matiere, (err, data) => {
    res.status(200).json(data);
  });
});

router.post('/person', (req, res) => {
  mysql.query('INSERT INTO personnes SET ?', req.body, (err, data) => {
    res.status(200).json(data);
  });
});

router.get('/test', (req, res) => {
  res.status(200).end('test');
});

// Exportation des routes
module.exports = router;
