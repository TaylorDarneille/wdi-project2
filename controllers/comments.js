var express = require('express');
var router = express.Router();
var db = require('../models');

router.post('/', function(req,res){
	db.comment.create(req.body).then(function(createdComment){
		res.redirect('/posts/'+createdComment.postId);
	});
});

module.exports = router;