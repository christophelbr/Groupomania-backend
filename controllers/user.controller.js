// Iportation des modules
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const db = require('../models');
const User = require('../models/user.model.js');
const token = require("../middleware/token");
const fs = require('fs');

// Constantes
const EMAIL_REGEX = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const PASSWORD_REGEX = /^(?=.*\d).{7,20}$/;

// Création d'un nouvel utilisateur
exports.register = async (req, res) => {
    // Params
    const email = req.body.email;
    const username = req.body.username;
    const password = req.body.password;
    const bio = req.body.bio;

    if (!email || !username || !password) {
        return res.status(400).json({ 'error': 'champs manquants' });
    }
    if (username.length >= 14 || username.length <= 3) {
        return res.status(400).json({ error: "Votre nom d'utilisateur doit comporter entre 4 et 14 caractères" });
    }
    if (!EMAIL_REGEX.test(email)) {
        return res.status(400).json({ error: "Email invalide" });
    }
    if (!PASSWORD_REGEX.test(password)) {
        return res.status(400).json({ error: "Votre mot de passe doit comporter au minimum 8 caractères, 1 chiffre " });
    }
    const user = await db.User.findOne({
        where: { email: req.body.email },
    });

    if (user !== null) {
        if (user.username === req.body.username) {
            return res.status(400).json({ error: "ce nom d'utilisateur est déjà utilisé" });
        }
        if (user.email === req.body.email) {
            return res.status(400).json({ error: "cet email est déjà utilisé" });
        }
    } else {
        const hash = await bcrypt.hash(req.body.password, 10);
        const newUser = await db.User.create({
            email: req.body.email,
            username: req.body.username,
            password: hash,
            isAdmin: false,
        });

        const tokenObject = token.issueJWT(newUser);
        res.status(201).send({
            user: newUser,
            token: tokenObject.token,
            expires: tokenObject.expiresIn,
            message: `Votre compte est bien créé ${newUser.username} !`,
        });
    }
};

// Connexion d'un utilisateur
exports.login = async (req, res) => {

    const user = await db.User.findOne({
        where: { email: req.body.email },
    }); // on vérifie que l'adresse mail figure bien dan la bdd
    if (user) {
        const hash = await bcrypt.compare(req.body.password, user.password); // on compare les mots de passes
        if (!hash) {
            return res.status(401).send({ error: "Mot de passe incorrect !" });
        } else {
            const tokenObject = token.issueJWT(user);
            res.status(200).send({
                // on renvoie le user et le token
                user: user,
                token: tokenObject.token,
                sub: tokenObject.sub,
                expires: tokenObject.expiresIn,
                message: "Bonjour " + user.username + " !",
            });
        }
    } else {
        return res.status(403).send({ error: "Email inconnu" });
    }
}

// Récupération d'un profil 
exports.getProfile = async (req, res) => {
    const userId = token.getUserId(req);

    const user = await db.User.findOne({
        attributes: ['id', 'email', 'username', 'photo', 'bio'],
        where: { id: userId }
    });
    if (user) {
        res.status(200).send(user);
    } else {
        res.status(500).send({ error: "Erreur serveur" });
    }
}

//Modification d'un compte 
exports.updateProfile = async (req, res) => {

        const userId = token.getUserId(req);
        console.log(req, res);
        let newPhoto;
        const user = await db.User.findOne({ where: { id: userId } }); // on trouve le user

        if (userId === user.id) {
            // Modification de la photo
            if (req.file && user.photo) {
                newPhoto = `${req.protocol}://${req.get("host")}/upload/${req.file.filename}`;
                const filename = user.photo.split("/upload")[1];
                fs.unlink(`upload/${filename}`, (err) => {
                    // s'il y a déjà une photo on la supprime
                    if (err) console.log(err);
                    else {
                        console.log(`Deleted file: upload/${filename}`);
                    }
                });
            } else if (req.file) {
                newPhoto = `${req.protocol}://${req.get("host")}/upload/${req.file.filename}`;
            }
            if (newPhoto) {
                user.photo = newPhoto;
            }

            // Modification de la descritpion
            if (req.body.bio) {
                user.bio = req.body.bio;
            }

            // Sauvegarde des changements dans la bdd
            const newUser = await user.save({ fields: ["bio", "photo"] });
            res.status(200).json({
                user: newUser,
                message: "Votre profil a bien été modifié",
            });
        } else {
            res.status(400).json({ message: "Erreur serveur" });
        }
};

// Suppression d'un compte
exports.deleteProfile = async (req, res) => {
    const userId = token.getUserId(req);

    const user = await db.User.findOne({
        where: { id: userId },
    });
    if (user) {
        db.User.destroy({ where: { id: userId } }); // on supprime le compte
        res.status(200).json({ "message": "utilisateur supprimé" });
    } else {
        res.status(400).json({ error: "Erreur serveur" })
    }
};