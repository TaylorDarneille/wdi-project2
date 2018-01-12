var express = require('express');
var async = require('async');
var router = express.Router();
var db = require('../models');
var isLoggedIn = require('../middleware/isLoggedIn.js');

router.get('/new', isLoggedIn, function(req, res){
	db.site.findAll().then(function(sites){
		console.log(req.user.dataValues.id, "&&&&&");
		res.render('posts/new.ejs', {sites: sites, user: req.user});
	}).catch(function(error){
		res.status(400).send('File Not Found: 404');
	});
});

router.get('/', function(req, res){
	db.post.findAll({
		include: [db.topic]
	}).then(function(posts){
		var searchedSite=1;
		var searchedTopic=1;
		var filteredPosts = []

		if(req.query.siteId) {
			searchedSite = parseInt(req.query.siteId);
			searchedTopic = parseInt(req.query.topicId);
		}
		var filteredPosts = [];
		posts.forEach(function(post){
			var topicIds=[];
			post.topics.forEach(function(topic){
				topicIds.push(topic.id);
			});
			if((post.siteId==searchedSite || searchedSite==1) && 
				(topicIds.includes(searchedTopic) || searchedTopic==1)){
				console.log(post, "asjdlfalsdkfjalskdjfasdflkj");///this is never firing
				filteredPosts.push(post);
			}
		});

		db.site.findAll().then(function(sites){
			db.topic.findAll().then(function(topics){
				res.render('posts/all.ejs', {
					posts: filteredPosts, 
					sites: sites,
					topics: topics});
			});
		});
	});
});

router.post('/', function(req, res){
	db.post.create(req.body).then(function(createdPost){

		db.user.findById(createdPost.authorId).then(function(user){
			createdPost.addUser(user)});

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

router.get('/track', function(req, res){
	var postId = req.query.postId;
	var userId = req.query.userId;
	db.user.findOne({
		where: {id: userId}
	}).then(function(user){
		db.post.findOne({
			where: {id: postId}
		}).then(function(post){
			user.addPost(post);
			res.redirect('/posts/'+postId);
		});
	});
});

router.get('/:id', function(req, res){
	var isTrackingAlready = false;
	//console.log('USER ID:', req.user.id);
	db.post.find({
		where: {id: req.params.id},
		include: [db.site, db.topic, db.comment, db.user]
	}).then(function(post){
		db.user.findOne({
			where: {id: post.authorId}
		}).then(function(user){
			db.comment.findAll({
				where: {postId: post.id},
				include: [db.user]
			}).then(function(comments){
				if(req.user) {
					var userIds = post.users.map(function(u){
						return u.id;
					});
					isTrackingAlready = userIds.indexOf(req.user.id) !== -1;
				}
				res.render('posts/single.ejs', {post: post, author: user, comments: comments, isTracking: isTrackingAlready});
			});
		});
	});
});

module.exports = router;