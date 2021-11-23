const User = require('./User');
const Post = require('./Post');
const Comment = require('./Comment');
// const Like = require('./Like')
const Likes = require('./Likes')
const LikesComments = require('./LikesComments')

// La FOREIGN KEY contrainte est utilisée pour empêcher les actions qui détruiraient les liens entre les tables.
const load = async () => {
    await Post.belongsTo(User, {  //post appartiens à un utilisateur 
        foreignKey: "userId",
        onDelete: "cascade"
    });

    await User.hasMany(Post, {  //utilisateur à plusieurs post 
        foreignKey: "userId",
        onDelete: "cascade"
    });

    await Comment.belongsTo(User, {
        foreignKey: "userId",
        onDelete: 'cascade'

    });
    await Post.hasMany(Comment, {
        foreignKey: "postId",
        onDelete: 'cascade'

    });

    await Post.hasMany(Likes, {
        onDelete: 'cascade'

    });

    await User.hasMany(Likes, {
        onDelete: 'cascade'

    });





    await User.sync();
    await Comment.sync();
    await Post.sync();
    await Likes.sync();

}
// Like,
module.exports = { User, Post, Comment, Likes, LikesComments, load };