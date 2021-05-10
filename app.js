// Importation des modules
const express = require('express'); // ajout du routeur express
const helmet = require('helmet');
const bodyParser = require('body-parser'); //ajout de body-parser au projet : permet extraction d'objet JSON


// Importation des routes

// Application express
const app = express();


// Correction des erreurs de CORS
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  next();
});

// Protection de l'application avec helmet
app.use(helmet());

// Routes

module.exports = app;