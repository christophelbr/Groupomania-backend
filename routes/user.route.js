// Imports de modules
const express = require('express');
const userCtrl = require('../controllers/user.controller');
const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config');

const userRoute = express.Router();

userRoute.post('/register', userCtrl.register);
userRoute.post('/login', userCtrl.login);
userRoute.get('/profile/:id', auth, userCtrl.getProfile);
userRoute.put('/profile/:id', auth, multer, userCtrl.updateProfile);
userRoute.delete('/profile/:id', auth, userCtrl.deleteProfile);

module.exports = userRoute;