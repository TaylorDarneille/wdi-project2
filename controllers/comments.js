var express = require('express');
var router = express.Router();
var db = require('../models');

router.post('/', function(req,res){
	// TODO
	// db.comment.create(req.body).then(function(createdComment){
	// 	res.redirect('/articles/'+createdComment.articleId);
	// });
});

module.exports = router;