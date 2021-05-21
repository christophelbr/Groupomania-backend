const express = require('express');
const commentCtrl = require('../controllers/comments.controller')
const auth = require('../middleware/auth')

const commentsRoute = express.Router();

commentsRoute.post('/post/:postId/', auth, commentCtrl.createComment);


module.exports = commentsRoute;