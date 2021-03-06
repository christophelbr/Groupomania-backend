const express = require('express');
const commentCtrl = require('../controllers/comments.controller')
const auth = require('../middleware/auth')

const commentsRoute = express.Router();

commentsRoute.post('/post/:postId/', auth, commentCtrl.createComment);
commentsRoute.get('/post/:postId/', auth, commentCtrl.getComments);
commentsRoute.delete('/post/comment/:id', auth, commentCtrl.deleteComments);



module.exports = commentsRoute;