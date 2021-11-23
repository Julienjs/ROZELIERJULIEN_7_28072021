const express = require('express');
const app = express();
const postRoutes = require('./routes/post');
const userRoutes = require('./routes/user');
const userComment = require('./routes/comment');
const likeRoutes = require('./routes/likes');
const path = require('path');
const helmet = require('helmet');

require('dotenv').config({ path: './.env' });
const { load } = require('./models/index');

load();

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});
app.use(express.json());
app.use('/images', express.static(path.join(__dirname, 'images')));
app.use('/api/post', postRoutes);
app.use('/api/auth', userRoutes);
app.use('/api/comment', userComment);
app.use('/api/like', likeRoutes);


app.use(helmet());


module.exports = app;
// exporter la constante app avec export pour que l'on puisse y accéder aux autres fichiers de notre projet