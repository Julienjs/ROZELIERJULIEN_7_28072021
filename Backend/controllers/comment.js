
const fs = require('fs');
const { Post, User, Comment, Likes, LikesComments } = require('../models/index');

//création d'un commentaire
exports.createComment = (req, res) => {
    let imageUrl = null;
    if (req.file) {
        imageUrl = `${req.protocol}://${req.get('host')}/images/${req.file.filename}`;
    }
    const comment = new Comment({
        userId: req.token.userId,
        postId: req.params.postId,
        comment: req.body.comment,
        imageUrl: imageUrl,
    });

    comment.save()
        .then((comment) => res.status(201).json(comment))
        .catch(error => res.status(400).json({ error: error }));
};

// supprimer un commentaire
module.exports.deleteComment = (req, res, next) => {
    Comment.destroy({
        where: {
            id: req.params.id
        }
    })
        .then(() => res.status(200).json({ message: 'Commentaire supprimé' }))
        .catch(error => res.status(400).json({ error: error() }));
};

//modifier un commentaire
module.exports.modifyComment = (req, res, next) => {
    let imageUrl = null;
    if (req.file) {
        imageUrl = `${req.protocol}://${req.get('host')}/images/${req.file.filename}`;
    }
    Comment.update(
        {
            comment: req.body.comment,
            imageUrl: imageUrl
        },
        {
            where: { id: req.params.id }
        }
    )
        .then(() => res.status(200).json({ message: 'Commentaire modifiée' }))
        .catch(error => res.status(400).json({ error: error() }));
};

exports.getAllComments = (req, res, next) => {
    Comment.findAll({
        where: { postId: req.params.id },
    })
        .then(comment => res.status(200).json(comment))
        .catch(error => res.status(400).json({ error: error }));
};




