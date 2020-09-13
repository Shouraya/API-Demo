var express = require("express");
var app = express();
var request = require('request');
// var url = "http://www.omdbapi.com/?s=" + query + "&apikey=thewdb"

app.get("/", function(req,res){
    res.render("search.ejs");
});

app.get("/results", function(req,res){
	var query = req.query.search
	var url = "http://www.omdbapi.com/?s=" + query + "&apikey=thewdb"
	request(url, function(error, response, body){
		if(!error && response.statusCode == 200){
			var data = JSON.parse(body);
			// res.send(results.Search[0]);
			res.render("results.ejs", {data : data});
		}
	})
});

var port = process.env.PORT || 3000;
app.listen(port, function(){
	console.log("Server for Weather App Started!");
});