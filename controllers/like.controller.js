const db = require('../models');
const token = require('../middleware/token')

// Constantes

// Ajout d'un like
exports.likePost = async (req, res) => {
    const userId = token.getUserId(req);
    const postId = parseInt(req.params.postId);

    const postToLike = await db.Post.findOne({ where: { id: postId } });
    const userFound = await db.User.findOne({ where: { id: userId } });
    const alreadyLike = await db.Like.findOne({ where: { userId: userId, postId: postId } });
    const username = userFound.username;

    if (postToLike && userFound && !alreadyLike) {
        postToLike.update({
            likes: postToLike.likes + 1
        })
        const newLike = await db.Like.create({
            PostId: postId,
            UserId: userId,
            userUsername: username
        })
        res.status(200).json({ 'message': 'J\'aime !' });

    } else if (postToLike && userFound && alreadyLike) {
        postToLike.update({
            likes: postToLike.likes - 1
        })
        db.Like.destroy({ where: { PostId: postId, UserId: userId, userUsername: username } }); // on supprime le like
        res.status(200).json({ "message": "je n\'aime plus" });
    } else {
        res.status(400).json({ error: "Erreur serveur" })
    }

}