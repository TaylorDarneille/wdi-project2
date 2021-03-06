var express = require('express');
var request = require("request");
var cheerio = require("cheerio");
var async = require("async");
var router = express.Router();
var db = require("../models")


//Helper function.
function logSites(locations) {
	var newSite = {};
	console.log("locations.length = "+locations.length);
	for(var i = 2; i < locations.length; i++){
		// console.log("i = "+i);
	  	newSite.name = locations[i].children[0].data;
	  	// console.log("name: "+newSite.name);
	  	var nameArr = newSite.name.split(' ');
	  	newSite.abbreviation = nameArr[nameArr.length-1].trim().substr(1).slice(0, -1);
	  	// console.log("abbreviation: "+ newSite.abbreviation);
	  	newSite.url = "http://www.doc.wa.gov/corrections/incarceration/"+locations[i].attribs.href;
	  	// console.log("url: "+newSite.url);
	  	db.site.findOrCreate({
	  		where: { name: newSite.name },
	  		defaults: {
	  			abbreviation: newSite.abbreviation,
	  			url: newSite.url
	  		}
	  	}).spread(function(newSite, wasCreated){ 
	  		if(wasCreated) {
	  			console.log("Created entry for "+newSite.abbreviation)
	  		} else {
	  			console.log(newSite.abbreviation+" already exists in DB.");
	  		}
	  });//end of spread
  	}
}

//Populate sites table if needed
db.site.findAll().then(function(sites){
	if(sites && sites.length<1){
		db.site.findOrCreate({
			where: {name: "All Sites"},
			defaults: {
			abbreviation: "ALL Sites",
			url: "http://www.doc.wa.gov/"
			}
		}).spread(function(newSite, wasCreated){
			request("http://www.doc.wa.gov/corrections/incarceration/default.htm", function (error, response, data) {
		  		var $ = cheerio.load(data);
		  		var locations = $("a[href*='prisons']");
		 		logSites(locations);
			});
		}); //end of spread
	} //end of conditional
});


router.get('/', function(req, res) {
	db.site.findAll().then(function(sites){
		res.render('sites/list.ejs', {sites: sites});
	});
});


module.exports = router;