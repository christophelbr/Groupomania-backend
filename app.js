// Importation des modules
const express = require('express'); 
const helmet = require('helmet');
const mysql = require('mysql');
const bodyParser = require('body-parser');

// Importation des routes
const userRoute = require('./routes/user.route.js');

// connexion à la base de données
const con = mysql.createConnection ({
  host: "127.0.0.1",
  port: 8889,
  user: 'root',
  password: 'Azertyuiop,123',
});

con.connect ((err) => {
  if (err) {
    console.log ('Erreur de connexion à Db');
    return;
  }
  console.log ('Connexion bdd établie !');
});

con.end ((err) => {
  // La connexion se termine normalement
  // Garantit que toutes les requêtes restantes sont exécutées
  // Envoie ensuite un paquet
});

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

// Body Parser configuration
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


// Protection de l'application avec helmet
app.use(helmet());

// Routes
app.use('/api/auth', userRoute);

module.exports = app;