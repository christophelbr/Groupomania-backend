// Imports de modules
const express = require('express');
const userCtrl = require('../controllers/user.controller')

const userRoute = express.Router();

userRoute.post('/register', userCtrl.register);
userRoute.post('/login', userCtrl.login);

module.exports = userRoute;