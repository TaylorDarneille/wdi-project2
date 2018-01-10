var express = require('express');
var async = require('async');
var router = express.Router();
var db = require('../models');

router.get('/', function(req, res){
	db.post.findAll().then(function(posts){
		res.render('posts/all.ejs', {posts: posts});
	}).catch(function(error){
		res.status(400).send('File Not Found: 404');
	});
});

router.get('/new', function(req, res){
	db.site.findAll().then(function(sites){
		res.render('posts/new.ejs', {sites: sites});
	}).catch(function(error){
		res.status(400).send('File Not Found: 404');
	});
});

router.get('/sites/:id', function(req, res){
	db.post.findAll().then(function(posts){
		var filteredPosts = [];
		posts.forEach(function(post){
			if(post.siteId==req.params.id){
				filteredPosts.push(post);
			}
		});
		res.render('posts/all.ejs', {posts: filteredPosts});
	});
});

router.post('/', function(req, res){
	db.post.create(req.body).then(function(createdPost){
		if(!req.body.topics){
			console.log("no topics added")
			res.redirect('/posts/'+createdPost.id);
		}
		else {

			//load an array with each topic
			var topics = req.body.topics.split(',');
			//remove any whitespace elements form the array
			topics = topics.filter(function(topic){ return /\S/.test(topic); })
			//trim any extra whitespace from remaining elements and change to lowercase
			topics.forEach(function(item, index, arr){
				arr[index] = item.trim().toLowerCase();
			});

			//add topics to topics table
			async.forEach(topics, function(t, callback){
				db.topic.findOrCreate({
					where: {name: t}
				})//end of findOrCreate
				.spread(function(top, wasCreated){
					// console.log(createdPost);
					if(top){
						createdPost.addTopic(top);
					}
					//this lets async know that this function
					//is done so it can move on
					callback(null); 
				})//end of spread
			},
			//Third argument of async.forEach()
			//runs when ALL the calls have been resolved
			function(){
				res.redirect('/posts/'+createdPost.id);
			});//end of async.forEach
		}//end of else

	}) //end of .then
	.catch(function(err){
		console.log("err: ", err);
		res.send("err: ", err);
	});//end of catch
}); //end of route

router.get('/:id', function(req, res){
	// TODO: find and display specific post
	res.render('posts/single.ejs', {id: req.params.id});
});

module.exports = router;