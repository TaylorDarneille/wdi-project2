var express = require('express');
var router = express.Router();
var db = require('../models');

router.get('/', function(req, res){
	db.topic.findAll().then(function(topics){
		res.render('topics/all.ejs', {topics: topics});
	});
});

module.exports = router;