const { User } = require('../models/index');
const bcrypt = require('bcrypt');
// const newUser = require('../models/User');
const jwt = require('jsonwebtoken');
require('dotenv').config({ path: './.env' });

//création compte
exports.signup = (req, res) => {
    bcrypt.hash(req.body.password, 10)
        .then(hash => {
            const user = new User({
                username: req.body.username,
                email: req.body.email,
                description: req.body.description,
                password: hash,
            });
            user.save()
                .then(() => res.status(201).json({ message: 'Utilisateur créé!' }))
                .catch(error => res.status(400).json({ error }));
        })
        .catch(error => res.status(500).json({ error }));
};

exports.login = (req, res) => {
    User.findOne({
        where: { email: req.body.email }
    })
        .then(user => {
            if (!user) {
                return res.status(401).json({ error: 'Utilisateur non trouvé!' });
            }
            bcrypt.compare(req.body.password, user.password)
                .then(valid => {
                    if (!valid) {
                        return res.status(401).json({ error: 'Mot de passe incorrect!' });
                    }
                    res.status(200).json({
                        userId: user.id,
                        message: 'vous êtes connecté',
                        isAdmin: user.isAdmin,
                        token: jwt.sign(
                            { userId: user.id, isAdmin: user.isAdmin },
                            process.env.JWT_SECRET,
                            { expiresIn: '24h' }
                        )
                    });
                })
                .catch(error => res.status(500).json({ error }));
        })
        .catch(error => res.status(500).json({ error }));
};