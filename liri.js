// Variables
var input = process.argv;
var userInput = process.argv[2];

var fs = require("fs");
var exportTKeys = require("./keys.js");
var request = require("request");
var Spotify = require('node-spotify-api');
var Twitter = require('twitter');

var params = {screen_name: 'krisloveschad'};
var selection = "";

// Pulls in user request 

for (var i = 3; i < input.length; i++) {
	
	if (i > 3 && i < input.length) {
		selection = selection + "+" + input[i];
	}
	else {
		selection += input[i];
	};
};

// Twitter API

if (userInput === "my-tweets") {

	var client = new Twitter({
		consumer_key: exportTKeys.twitterKeys.consumer_key,
		consumer_secret: exportTKeys.twitterKeys.consumer_secret,
		access_token_key: exportTKeys.twitterKeys.access_token_key,
		access_token_secret: exportTKeys.twitterKeys.access_token_secret
	});
	
   client.get('statuses/user_timeline', params, function(error, tweets, response) {
		if (!error) {

			var myTweets = "";

			for (var i = 0; i < tweets.length; i++) {
				var element = tweets[i];

				myTweets = tweets[i].text + "\n";
				console.log(myTweets);

				fs.appendFile("log.txt", "\n" + myTweets + "\n", function(err) {
					if (err) {
						return console.log(err);
					};
				});
			};
		};
   });
}

// Spotify Request - if user does not provide a selection, returns "The Sign" by Ace of Base, otherwise returns user selection data

else if (userInput === "spotify-this-song") {
	if (selection === "") {
		selection = "The Sign";

		spotify();

	} else {

		spotify();
	};
}

// OMDB API - If user does not provide a selection, default is Mr. Nobody, otherwise returns user selection

else if (userInput === "movie-this") {

	if (selection === "") {
		selection = "Mr.+Nobody";
	};

	var queryURL = "http://www.omdbapi.com/?t=" + selection + "&y=&plot=short&apikey=40e9cece"

	request(queryURL, function(error, response, data) {

		if (!error && response.statusCode === 200) {
			var omdbTitle = "Title: " + JSON.parse(data).Title;
			var omdbYear = "Year: " + JSON.parse(data).Year;
			var omdbRating = "IMDB Rating: " + JSON.parse(data).imdbRating;
			var omdbRT = "Rotten Tomatoes: " + JSON.parse(data).Ratings[1].Value;
			var omdbCountry = "Country: " + JSON.parse(data).Country;
			var omdbLang = "Language: " + JSON.parse(data).Language;
			var omdbPlot = "Plot: " + JSON.parse(data).Plot;
			var omdbActors = "Actors: " + JSON.parse(data).Actors;

			var movieThis = "\nHere\'s some information about the movie you requested:\n" + omdbTitle + "\n" + omdbYear + "\n" + omdbRating + "\n" + omdbRT  + "\n" + omdbCountry + "\n" + omdbLang + "\n" + omdbPlot + "\n" + omdbActors + "\n";

			console.log(movieThis);

			fs.appendFile("log.txt", "\n" + movieThis + "\n", function(err) {
				if (err) {
					return console.log(err);
				};
			});
		};
	});
}

// Random selection that returns "I Want it That Way" from random.txt using the Spotify API 

else if (userInput === "do-what-it-says") {
	// run spotify-this-song for "I Want it That Way," as follows the text in random.txt
	fs.readFile("random.txt", "utf8", function(error, data) {
		selection = data;

		spotify();
	});
};

// Spotify function that runs for "spotify-this-song" as well as "do-what-it-says"

function spotify() {
	var found = false; 

	var spotify = new Spotify({
		id: '8439f575fb0d4ceb9ea04e42b15fa86a',
		secret: '8252f28123e1467aa6ffeee966629cff'
	  });

	  spotify.search({ type: 'track', query: selection }, function(err, data) {
		if (err) {
		  return console.log('Error occurred: ' + err);
		}
	   
		var jData = data;
		
		for (var j = 0; j < jData.tracks.items.length; j++) {
			var testReg = new RegExp(selection, 'i');
			if ( testReg.test(jData.tracks.items[j].name) ) {
		
				var artist = "Artist: " + jData.tracks.items[j].album.artists[0].name;
				var song = "Song Name: " + jData.tracks.items[j].name;
				var album = "Album: " + jData.tracks.items[j].album.name;
				var preview = "Preview: " + jData.tracks.items[j].preview_url;

				var spotifyCombined = "\n" + artist + "\n" + song+ "\n" + album + "\n" + preview + "\n";
				
				console.log(spotifyCombined);

				fs.appendFile("log.txt", "\n" + spotifyCombined + "\n", function(err) {
					if (err) {
						return console.log(err);
					}
				});

			found = true;	
			break;
		};
	};

		if (!found) {
			console.log("We apologize but that song could not be found.")
		};
	});
};