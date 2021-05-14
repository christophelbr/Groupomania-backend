// Iportation des modules
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const db = require('../models');
const User = require('../models/user.js');
const token = require("../middleware/token");
const sequelize = require('sequelize');


exports.register = async (req, res) => {

    // Params
    const email = req.body.email;
    const username = req.body.username;
    const password = req.body.password;
    const bio = req.body.bio;

    if (!email || !username || !password) {
        return res.status(400).json({ 'error': 'champs manquants' });
    }

    const user = await db.User.findOne({
        where: { email: req.body.email },
    });
    if (user !== null) {
        if (user.username === req.body.username) {
            return res.status(400).json({ error: "ce nom d'utilisateur est déjà utilisé" });
        } else if (user.email === req.body.email) {
            return res.status(400).json({ error: "cet email est déjà utilisé" });
        }
    } else {
        const hash = await bcrypt.hash(req.body.password, 10);
        const newUser = await db.User.create({
            email: req.body.email,
            username: req.body.username,
            password: hash,
            bio: req.body.bio,
            isAdmin: false,
        });

        const tokenObject = await token.issueJWT(newUser);
        res.status(201).send({
            user: newUser,
            token: tokenObject.token,
            expires: tokenObject.expiresIn,
            message: `Votre compte est bien créé ${newUser.username} !`,
        });
    }
};

exports.login = async (req, res) => {
    
        const user = await db.User.findOne({
            where: { email: req.body.email },
        }); // on vérifie que l'adresse mail figure bien dan la bdd
        if (user === null) {
            return res.status(403).send({ error: "Email inconnu" });
        } else {
            const hash = await bcrypt.compare(req.body.password, user.password); // on compare les mots de passes
            if (!hash) {
                return res.status(401).send({ error: "Mot de passe incorrect !" });
            } else {
                const tokenObject = await token.issueJWT(user);
                res.status(200).send({
                    // on renvoie le user et le token
                    user: user,
                    token: tokenObject.token,
                    sub: tokenObject.sub,
                    expires: tokenObject.expiresIn,
                    message: "Bonjour " + user.username + " !",
                });
            }
        }
   
}




