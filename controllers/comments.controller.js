const db = require('../models');
const token = require('../middleware/token');
const { post } = require('../app');


// Ajout d'un commentaire

exports.createComment = async (req, res) => {
    const userId = token.getUserId(req);
    const postId = parseInt(req.params.postId);

    const postToComment = await db.Post.findOne({ where: { id: postId } });
    const userFound = await db.User.findOne({ where: { id: userId } });
    const username = userFound.username;
    const comment = req.body.comment;

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

exports.getComments = async (req, res) => {

    const userId = token.getUserId(req);
    const postId = req.params.postId
    const userFound = await db.User.findOne({
        where: { id: userId }
    });

    if (userFound) {
        const comments = await db.Comments.findAll({            
            where: { postId: postId }
        })
            res.status(200).send(comments);
        }  else {
        res.status(500).json({ "error": "erreur serveur" });
    }

};

exports.deleteComments = async (req, res) => {

    const userId = token.getUserId(req);
    const admin = await db.User.findOne({ where: { id: userId } });
    const comment = await db.Comments.findOne({ where: { id: req.params.id } });
    if (userId === comment.dataValues.userId || admin.isAdmin === true) {
        db.Comments.destroy({ where: { id: comment.id } });
        res.status(200).json({ message: "Commentaire supprimé" });
    } else {
        res.status(400).json({ message: "Vous n'avez pas les droits requis" });
    }

};