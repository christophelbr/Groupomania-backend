const express = require('express');
const postCtrl = require('../controllers/post.controller')
const auth = require('../middleware/auth')
const multer = require('../middleware/multer-config');


const postRoute = express.Router();

postRoute.post('/post', auth, multer, postCtrl.createPost);
postRoute.get('/post', auth, postCtrl.getAllPosts);


module.exports = postRoute;