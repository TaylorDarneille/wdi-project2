var express = require('express');
var router = express.Router();
var db = require('../models');

db.topic.findOrCreate({
		where: {name: "All Topics"}
}).spread(function(newTopic, wasCreated){
	if(wasCreated) {
		console.log("Created 'all topics' entry.")
	} else {
		console.log(" 'All Topics' already exists in DB.");
	}
});

router.get('/', function(req, res){
	db.topic.findAll().then(function(topics){
		res.render('topics/all.ejs', {topics: topics});
	});
});

module.exports = router;