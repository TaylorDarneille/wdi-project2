var express = require('express');
var async = require('async');
var router = express.Router();
var db = require('../models');
var isLoggedIn = require('../middleware/isLoggedIn.js');

router.get('/new', isLoggedIn, function(req, res){
	db.site.findAll().then(function(sites){
		res.render('posts/new.ejs', {sites: sites, user: req.user});
	}).catch(function(error){
		res.status(400).send('File Not Found: 404');
	});
});

router.get('/', function(req, res){
	db.post.findAll({
		include: [db.topic]
	}).then(function(posts){
		if(!req.query.siteId){
			var searchedSite = "all";
			var searchedTopic = "all";
		} else {
			var searchedSite = req.query.siteId;
			var searchedTopic = parseInt(req.query.topicId);
		}
		var filteredPosts = [];


		posts.forEach(function(post){
			var topicIds=[];
			post.topics.forEach(function(topic){
				topicIds.push(topic.id);
			});
			// console.log(topicIds.includes(searchedTopic), "//\/\/\/\/\/\/\/\/\/");///this equals what I think it will
			if((post.siteId===searchedSite || searchedSite==="all") && 
				(topicIds.includes(searchedTopic) || searchedTopic==="all")){
				// console.log(post, "asjdlfalsdkfjalskdjfasdflkj");///this is never firing
				filteredPosts.push(post);
			}
			console.log(filteredPosts, "&&&&&&&&&&&*&*&*&*&*&*&*&")//this is blank

		});

		db.site.findAll().then(function(sites){
			db.topic.findAll().then(function(topics){
				console.log("About to Render!!!!!!!!!!!!!")
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
	db.post.find({
		where: {id: req.params.id},
		include: [db.site, db.topic, db.user, db.comment]
	}).then(function(post){
		db.user.find({
			where: {id: post.userId}
		}). then(function(user){
			db.comment.findAll({
				where: {postId: post.id},
				include: [db.user]
			}).then(function(comments){
				res.render('posts/single.ejs', {post: post, author: user, user: req.user, comments: comments});
			});
		});
	});
});

module.exports = router;