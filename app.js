// Importation des modules
const express = require('express'); 
const helmet = require('helmet');
const mysql = require('mysql');
const path = require('path'); // Gestion du système de fichiers
const bodyParser = require('body-parser');

// Importation des routes
const userRoute = require('./routes/user.route.js');
const postRoute = require('./routes/post.route.js');
const likeRoute = require('./routes/like.route.js');
const commentsRoute = require('./routes/comments.route');

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

// Définition du chemin pour enregistremnet des photos sur le backend
app.use('/upload', express.static(path.join(__dirname, 'upload')));


// Protection de l'application avec helmet
app.use(helmet());

// Routes
app.use('/api/auth', userRoute);
app.use('/api/wall', postRoute);
app.use('/api/wall', likeRoute);
app.use('/api/wall', commentsRoute);


module.exports = app;