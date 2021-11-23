const express = require('express');
const router = express.Router();
const commentCtrl = require('../controllers/comment');
const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config');

//créer un objet
router.post('/:postId', auth, multer, commentCtrl.createComment);
router.get('/:id', commentCtrl.getAllComments);
router.delete('/:id', commentCtrl.deleteComment);
router.put('/:id', multer, commentCtrl.modifyComment);

module.exports = router;