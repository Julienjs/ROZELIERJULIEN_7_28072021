const fs = require('fs');
const { Post, User, Comment, Likes } = require('../models/index');
require('dotenv').config;


//création d'un poste
exports.createPost = (req, res) => {
    let imageUrl = null;
    if (req.file) {
        imageUrl = `${req.protocol}://${req.get('host')}/images/${req.file.filename}`;
    }
    const post = new Post({
        userId: req.token.userId,
        message: req.body.message,
        imageUrlPost: imageUrl,
        video: req.body.video
    });

    post.save()
        .then((post) => res.status(201).json(post))
        .catch(error => res.status(400).json({ error: error }));
};


//tout les post
module.exports.getAllPost = (req, res, next) => {
    Post.findAll({
        include: [User,
            {
                model: Comment,
            },
            {
                model: Likes,
            }
        ],
        order: [
            ["createdAt", "DESC"],
            [
                Comment, "createdAt"
                , "DESC"]
        ]
    })
        .then(posts => res.status(200).json({ message: 'Toutes les publications', posts }))
        .catch(error => res.status(400).json({ error: error }));
};

// supprimer un post 
module.exports.deletePost = (req, res, next) => {

    Post.findOne({
        where: {
            id: req.params.id,

        }
    })

        .then(post => {
            if (post.userId || req.body.isAdmin === true) {
                Post.destroy({
                    where: {
                        id: req.params.id,
                    }
                })
                    .then(() => res.status(200).json({ message: 'Publication supprimé' }))
                    .catch(error => res.status(400).json({ error: error() }));
            } else {
                res.status(403).json({ message: `Vous n'avez pas les droits pour supprimer ce post ` });
            }
        })
        .catch(error => res.status(400).json({ error: error }));
};

//récuperer un post par son id
exports.findOnePost = (req, res) => {
    Post.findAll({
        where: {
            id: req.params.id
        }
    })
        .then(post => res.status(200).json(post))
        .catch(error => res.status(400).json({ error: error }));
};

//modifier un post
module.exports.modifyPost = (req, res, next) => {

    Post.update(
        {
            message: req.body.message,
        },
        {
            where: { id: req.params.id }
        }
    )
        .then(() => res.status(200).json({ message: 'Publication modifiée' }))
        .catch(error => res.status(400).json({ error: error() }));
};

module.exports.modifyImagePost = (req, res, next) => {
    let imageUrl = null;
    if (req.file) {
        imageUrl = `${req.protocol}://${req.get('host')}/images/${req.file.filename}`;
    }
    Post.update(
        {
            imageUrlPost: imageUrl
        },
        {
            where: { id: req.params.id }
        }
    )
        .then(() => res.status(200).json({ message: 'Publication modifiée' }))
        .catch(error => res.status(400).json({ error: error() }));
};




