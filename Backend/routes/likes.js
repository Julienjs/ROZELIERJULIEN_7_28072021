const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");

const likeCtrl = require("../controllers/Likes");



router.post("/", auth, likeCtrl.addlike);



// router.delete("/:id", auth, likeCtrl.unLike);



module.exports = router;