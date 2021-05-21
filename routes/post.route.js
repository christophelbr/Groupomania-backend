const express = require('express');
const postCtrl = require('../controllers/post.controller')
const auth = require('../middleware/auth')

const postRoute = express.Router();

postRoute.post('/post', auth, postCtrl.createPost);
postRoute.get('/post', auth, postCtrl.getAllPosts);


module.exports = postRoute;