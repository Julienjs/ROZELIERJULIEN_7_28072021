const { User, Post } = require('../models/index');
const bcrypt = require('bcrypt');
const nodemailer = require('nodemailer');
const crypto = require('crypto');
const { Op } = require('sequelize');

require('dotenv').config({ path: './.env' });


//tout les utilisateurs
module.exports.getAllUsers = (req, res, next) => {
    User.findAll({
        attributes: ["id", "email", "username", "imageUrlUser", "description", "createdAt", "isAdmin"],
        include: { model: Post },
    })
        .then(users => res.status(200).json({ message: 'utilisateurs disponible', users }));
};

//récupération d'un utilisateur par l'id
module.exports.IdUser = (req, res, next) => {
    User.findOne({
        include: { model: Post },
        where: {
            id: req.params.id
        }
    })
        .then(userId => res.status(200).json({ message: 'id récupéré', userId }));
};

//supprimer un utilisateur 
module.exports.deleteUser = (req, res, next) => {
    if (req.params.id || (req.token.user.isAdmin === true)) {
        console.log(req.body.isAdmin);
        User.destroy({
            where: {
                id: req.params.id
            }
        })
            .then(() => res.status(200).json({ message: 'Compte supprimé' }))
            .catch(error => res.status(400).json({ error: error() }));

    } else {
        res.status(403).json({ message: `Vous n'avez pas les droits pour supprimer ce compte ` });
    }



};

//modifié un profil
module.exports.modifyProfil = (req, res, next) => {
    User.update(
        {
            description: req.body.description,
        },
        {
            where: { id: req.params.id }
        }
    ).then(() => res.status(200).json({ message: 'La description à bien été modifiée' }))
        .catch(err =>
            res.status(500).json({ err })
        );
};


module.exports.changePassword = async (req, res) => {

    const { newPassword, password } = req.body;
    const user = await User.findOne({ where: { id: req.params.id } })
    bcrypt.compare(password, user.password)
        .then(valid => {
            if (!valid) { res.status(401).json({ error: 'Mot de passe incorrect!' }); }
            bcrypt.hash(newPassword, 10)
                .then((hash) => {
                    User.update(
                        { password: hash },
                        {
                            where: { id: req.params.id }
                        }
                    )
                        .then(() => res.status(200).json({
                            message: 'Mot de passe modifié',
                        }))
                        .catch(err =>
                            res.status(700).json({ err })
                        );
                })

        })
}

module.exports.updateImg = (req, res, next) => {
    let imageUrl = null;
    if (req.file) {
        imageUrl = `${req.protocol}://${req.get('host')}/images/${req.file.filename}`;
    }
    User.update(
        {
            imageUrlUser: imageUrl
        },
        {
            where: { id: req.params.id }
        }
    ).then(() => res.status(200).json({ message: 'La photo de profil est bien modifiée' }))
        .catch(err =>
            res.status(500).json({ err })
        );

};

module.exports.forgotPassword = (req, res, next) => {
    User.findOne({
        where: {
            email: req.body.email,
        },
    }).then((user) => {
        console.log(user.username);
        if (user === null) {
            console.error('email invalide');
            res.status(403).send('email invalide')
        } else {
            const token = crypto.randomBytes(20).toString('hex');
            process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0"
            user.update({
                id: req.params.id,
                resetPasswordToken: token,
                resetPasswordExpires: Date.now() + 360000,
            });

            const transporter = nodemailer.createTransport({
                service: 'gmail',
                auth: {
                    user: `${process.env.EMAIL_ADDRESS}`,
                    pass: `${process.env.EMAIL_PASSWORD}`,
                }
            });
            const mailOptions = {
                from: `mysqldemo@gmail.com`,
                to: `${user.email}`,
                subject: `Lien pour réanitialiser le mot de passe Groupomania`,
                text:
                    `Bonjour ${user.username},\n\n` +
                    `Cliquer sur le lien pour réanitialiser votre mot de passe\n\n` +
                    ` http://localhost:3000/resetPassword/${user.id}/${token}\n\n` +
                    `Cordialement Groupomania`
            };
            transporter.sendMail(mailOptions, (err, response) => {
                if (err) {
                    console.error('Il y a une erreur:', err);
                } else {
                    console.error('Voici la reponse:', response);
                    res.status(200).json('Email envoyé, veuillez vérifier votre boite mail');
                }
            })
        }

    })
        .catch(err =>
            res.status(500).json({ error: 'Email inconnue' })
        );

}



module.exports.resetPassword = (req, res, next) => {
    // console.log(req.query.resetPasswordToken + ' ' + 'TOKEN');
    User.findOne({
        where: {
            id: req.params.id,
            resetPasswordToken: req.query.resetPasswordToken,
            resetPasswordExpires: {
                [Op.gt]: Date.now(),
            },
        },
    }).then(user => {
        if (user === null) {
            console.log('Le lien de rénitialisation du mot de passe est invalide ou expiré ');
            res.json('Le lien de rénitialisation du mot de passe est invalide ou expiré');
        } else {
            res.status(200).send({
                username: user.username,
                message: 'Le lien de rénitialisation est valide'
            });
        }
    })
        .catch(err =>
            res.status(500).send(console.log(err))

        );
}

module.exports.changePasswordViaEmail = (req, res, next) => {
    User.findOne({ where: { username: req.body.username } })
        .then(user => {
            if (user !== null) {
                bcrypt.hash(req.body.password, 10)
                    .then((hash) => {
                        User.update({
                            password: hash,
                        },
                            {
                                where: { id: req.params.id }
                            }
                        )
                    }).then(() => {
                        res.status(200).json({ message: 'Mot de passe modifié avec succès' });
                    }).catch(err =>
                        res.status(700).json({ err })
                    );
            }
            else {
                res.status(404).json('erreur lors du changement du mot de passe')
            }
        }).catch(err =>
            res.status(500).send(console.log(err))
        );
}


