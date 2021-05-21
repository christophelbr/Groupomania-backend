const db = require('../models');
const token = require('../middleware/token')


// Ajout d'un commentaire

exports.createComment = async (req, res) => {
    const userId = token.getUserId(req);
    const postId = parseInt(req.params.postId);

    const postToComment = await db.Post.findOne({ where: { id: postId } });
    const userFound = await db.User.findOne({ where: { id: userId } });
    const username = userFound.username;
    const comment = req.body.comment;
    console.log(comment);

    if (postToComment && userFound) {
        const newComment = await db.Comments.create({
            postId: postId,
            userId: userId,
            comment: comment,
            username: username
        });
        res.status(200).json({
            comment: newComment,
            mesageRetour: 'Votre commentaire a bien été publié'
        });
    } else {
        return res.status(404).json({ 'error': 'Utilisateur introuvable' });
    }

};