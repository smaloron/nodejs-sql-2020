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
router.get('/', async (req, res) => {
  // Exécution d'une requête
  await mysql.query('SELECT * FROM films', [], res);
});

router.get('/film/:id([0-9]+)', async (req, res) => {
  await mysql.query('SELECT * FROM films WHERE id=?', [req.params.id], res);
});

router.get('/matiere/new/:name', async (req, res) => {
  const matiere = { matiere: req.params.name };
  await mysql.query('INSERT INTO matieres SET ?', matiere, res);
});

router.post('/person', async (req, res) => {
  await mysql.query('INSERT INTO personnes SET ?', req.body, res);
});

router.get('/test', (req, res) => {
  res.status(200).end('test');
});

// Exportation des routes
module.exports = router;
