// Imports de modules
const express = require('express');
const userCtrl = require('../controllers/user.controller')
const auth = require('../middleware/auth')

const userRoute = express.Router();

userRoute.post('/register', userCtrl.register);
userRoute.post('/login', userCtrl.login);
userRoute.get('/profile/:id', auth, userCtrl.getProfile);
userRoute.put('/profile/:id', auth, userCtrl.updateProfile);

module.exports = userRoute;