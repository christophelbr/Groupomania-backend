const db = require('../models');
const token = require('../middleware/token')

// Constantes
const TITLE_LIMIT = 2;
const CONTENT_LIMIT = 4;

exports.createPost = async (req, res) => {

    // Params
    const title = req.body.title;
    const content = req.body.content;

    const userId = token.getUserId(req);

    if (!title || !content) {
        return res.status(400).json({ 'error': 'Champs manquants' });
    }

    if (title.length <= TITLE_LIMIT || content.length <= 4) {
        return res.status(400).json({ 'error': 'Paramètres invalides' });
    }

    const userFound = await db.User.findOne({
        where: { id: userId}
    });

/*     const username = userFound.username;
    const photo = userFound.photo; */


    if (userFound) {
        if (req.file) {
            attachment = `${req.protocol}://${req.get("host")}/upload/${req.file.filename}`;
          } else {
            attachment = null;
          }
        const username = userFound.username;
        const photo = userFound.photo;
        const newPost = await db.Post.create({
            username: username,
            photo: photo,
            title: title,
            content: content,
            attachment: attachment,
            UserId: userId,
            likes: 0,
        });
        res.status(200).json({
            post: newPost,
            mesageRetour: 'Votre post a bien été publié'
        });
    } else {
        return res.status(404).json({ 'error': 'Utilisateur introuvable' });
    }

}

exports.getAllPosts = async (req, res) => {
    const fields = req.query.fields;
    const limit = parseInt(req.query.limit);
    const offset = parseInt(req.query.offset);
    const order = req.query.order;

    const userId = token.getUserId(req);


    const userFound = await db.User.findOne({
        where: { id: userId }
    });
    console.log(userId);

    if (userFound) {
        console.log('toto');

        const posts = await db.Post.findAll({
            order: [(order != null) ? order.split(':') : ['createdAt', 'DESC']],
            attributes: (fields !== '*' && fields != null) ? fields.split(',') : null,
            limit: (!isNaN(limit)) ? limit : null,
            offset: (!isNaN(offset)) ? offset : null,
            include: [{
                model: db.User,
                attributes: ['username']
            }]
        })

        if (posts) {
            res.status(200).send(posts);
        } else {
            res.status(404).json({ "error": "aucun post trouvé" })
        }
    } else {
        res.status(500).json({ "error": "erreur serveur" });
    }
}