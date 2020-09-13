var express = require("express");
var app = express();
var request = require('request');

app.get("/", function(req,res){
    res.render("search.ejs");
});

app.get("/results", function(req,res) {
    var query = req.query.search
	var url = "http://api.openweathermap.org/data/2.5/weather?q=" + query + "&appid=process.env.ID";
	request(url, function(error,response,body){
		if(!error && response.statusCode == 200){
			var data = JSON.parse(body);
			var temp = data.main.temp;
			var feel_temp = data.main.feels_like;
			var min_temp = data.main.temp_min;
			var max_temp = data.main.temp_max;
			var humidity = data.main.humidity;
			var wind = data.wind.speed;
			res.render("results.ejs", {data : query, temp :temp, feel_temp : feel_temp, min_temp : min_temp, max_temp: max_temp, humidity:humidity, wind:wind});
		}
	})
});

var port = process.env.PORT || 3000;

app.listen(port, function(){
	console.log("Server for Weather App Started!");
});