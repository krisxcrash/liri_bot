// use ${searchTerm} instead of + searchTerm + in query URL. This is ES6


var input = process.argv;
var userInput = process.argv[2];

var fs = require("fs");
var omdb = require("request");
var Spotify = require('node-spotify-api');
var Twitter = require('twitter');

var selection = "";

for (var i = 3; i < input.length; i++) {
	var selection = input[i];
	// if (i > 3 && i < input.length) {
	// 	selection = selection + "+" + input[i];
	// }
	// else {
	// 	selection += input[i];
	// }
}

// my-tweets
// spotify-this-song
// movie-this
// do-what-it-says

if (userInput === "my-tweets") {
	//run twitter API

		// var client = new Twitter({
		// 	consumer_key: process.env.TWITTER_CONSUMER_KEY,
		// 	consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
		// 	access_token_key: process.env.TWITTER_ACCESS_TOKEN_KEY,
		// 	access_token_secret: process.env.TWITTER_ACCESS_TOKEN_SECRET
		//   });

		// 	const getBearerToken = require('get-twitter-bearer-token')
			
		//    const twitter_consumer_key = 'wg3UG2HSoKl7zpYiEme5VpfDB'
		//    const twitter_consumer_secret = 'NdeSChBtt6JmqwdPiDUPr26QofSYzVYLbqRP8IgDTkwOb7XIyz'

	var client = new Twitter({
		consumer_key: 'wg3UG2HSoKl7zpYiEme5VpfDB',
		consumer_secret: 'NdeSChBtt6JmqwdPiDUPr26QofSYzVYLbqRP8IgDTkwOb7XIyz',
		access_token_key: '	898354256247373825-zgeSJsaAHIEhRpzS8KojqiPYAvebpgn',
		access_token_secret: 'dXz083H2dfig5Nwe2ZEvVW4K0acsx4hbcKA7PS9XUbX85'
	});
	
   var params = {screen_name: 'krisloveschad'};
   client.get('statuses/user_timeline', params, function(error, tweets, response) {
		if (!error) {
			console.log(tweets);
		} else {
			throw error
	 }
   });

}
else if (userInput === "spotify-this-song") {

	//run spotify API
	//if userInput = null, default to "The Sign" by Ace of Base.

	if (input[3] === null) {
		
		var spotify = new Spotify({
			id: '8439f575fb0d4ceb9ea04e42b15fa86a',
			secret: '8252f28123e1467aa6ffeee966629cff'
		  });
	
			spotify
			.request('https://api.spotify.com/v1/tracks/3DYVWvPh3kGwPasp7yjahc')
			.then(function(data) {
			console.log(data); 
			})
			.catch(function(err) {
			console.error('Error occurred: ' + err); 
			});
		//
	}
	else {

	/*
	Artist(s)
	The song's name
	A preview link of the song from Spotify
	The album that the song is from
	*/

		// bearer BQDJnt_gJug6lfUjG67T5ynHhadZRAiIkj_88TjpkComyl4ct0fL2Lo94Wxe01T-RZ0mtfpT5ZVGgUoCSaCc7jgcTVcBigAKizrKIHi8MFUIF7lm2eqGv8szVQaPxYPv0K-p5_-mXlzJglA

	var spotify = new Spotify({
		id: '8439f575fb0d4ceb9ea04e42b15fa86a',
		secret: '8252f28123e1467aa6ffeee966629cff'
	  });

		spotify
		.request('https://api.spotify.com/v1/https://api.spotify.com/v1/search?q=' + selection + '&type=track')
		.then(function(data) {
		console.log(data); 
		})
		.catch(function(err) {
		console.error('Error occurred: ' + err); 
		});

	}
}
else if (userInput === "movie-this") {
	//run OMDB API
	//if userInput = null, default to "Mr. Nobody"

	if (input[3] === null) {
		selection = "mr+nobody";
	}
	else {
		selection = selection;
	}

	omdb("http://www.omdbapi.com/?t=" + selection + "&y=&plot=short&apikey=40e9cece", function(error, response, data) {

		if (!error && response.statusCode === 200) {
			console.log("\nHere\'s some information about the movie you requested:")
			console.log("Title: " + JSON.parse(data).Title);
			console.log("Year: " + JSON.parse(data).Year);
			console.log("IMDB Rating: " + JSON.parse(data).imdbRating);
			console.log("Rotten Tomatoes: " + JSON.parse(data).Ratings[1].Value);
			console.log("Country: " + JSON.parse(data).Country);
			console.log("Language: " + JSON.parse(data).Language);
			console.log("Plot: " + JSON.parse(data).Plot);
			console.log("Actors: " + JSON.parse(data).Actors);
		};
	});

	write();
}
else if (userInput === "do-what-it-says") {
	// run spotify-this-song for "I Want it That Way," as follows the text in random.txt
};

//function to append user input to log.txt

function write() {

	userInputWrite = "";
	
	for (var i = 3; i < input.length; i++) {
		var userInputWrite = input[i];
	};

	fs.appendFile("log.txt", "\nUser Request: " + userInputWrite, function(err) {
		if (err) {
			return console.log(err);
		  }
		});
	};
