// Importation des modules
const express = require('express'); // ajout du routeur express
const helmet = require('helmet');
const bodyParser = require('body-parser'); //ajout de body-parser au projet : permet extraction d'objet JSON
const mysql = require('mysql');
// Vous devez d'abord créer une connexion à la base de données
// Assurez-vous de remplacer «utilisateur» et «mot de passe» par les valeurs correctes
const con = mysql.createConnection ({
  host: "127.0.0.1",
  port: 8889,
  user: 'root',
  password: 'Azertyuiop,123'
});

con.connect ((err) => {
  if (err) {
    console.log ('Erreur de connexion à Db');
    return;
  }
  console.log ('Connexion établie');
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

// Protection de l'application avec helmet
app.use(helmet());

// Routes

module.exports = app;