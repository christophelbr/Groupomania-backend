const express = require('express');
const likeCtrl = require('../controllers/like.controller')
const auth = require('../middleware/auth')

const likeRoute = express.Router();

likeRoute.post('/post/:postId/like', auth, likeCtrl.likePost);


module.exports = likeRoute;