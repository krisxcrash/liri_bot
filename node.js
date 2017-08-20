// use ${searchTerm} instead of + searchTerm + in query URL. This is ES6


var input = process.argv;
var userInput = process.argv[2];

var omdb = require("request");
var Spotify = require('node-spotify-api');
// var twitter = ;

var selection = "";

for (var i = 3; i < input.length; i++) {
	var selection = input[i];
	if (i > 3 && i < input.length) {
		selection = selection + "+" + input[i];
	}
	else {
		selection += input[i];
	}
}

// my-tweets
// spotify-this-song
// movie-this
// do-what-it-says

if (userInput === "my-tweets") {
	//run twitter API


}
else if (userInput === "spotify-this-song") {

	//run spotify API
	//if userInput = null, default to "The Sign" by Ace of Base.

	/*
	Artist(s)
	The song's name
	A preview link of the song from Spotify
	The album that the song is from
	*/

		// var song = selection.split(' ').join('+');

	var spotify = new Spotify({
		id: '8439f575fb0d4ceb9ea04e42b15fa86a',
		secret: '8252f28123e1467aa6ffeee966629cff'
	  });

		spotify
		.request('https://api.spotify.com/v1/tracks/' + selection)
		.then(function(data) {
		console.log(data); 
		})
		.catch(function(err) {
		console.error('Error occurred: ' + err); 
		});

}
else if (userInput === "movie-this") {
	//run OMDB API
	//if userInput = null, default to "Mr. Nobody"

	// if (selection === null) {
	// 	var movie = "mr+nobody";
	// }
	// else {
		// var movie = selection.split(' ').join('+');
	// }

	omdb("http://www.omdbapi.com/?t=" + selection + "&y=&plot=short&apikey=40e9cece", function(error, response, body) {

		if (!error && response.statusCode === 200) {
			console.log("\nHere\'s some information about the movie you requested:")
			console.log("Title: " + JSON.parse(body).Title);
			console.log("Year: " + JSON.parse(body).Year);
			console.log("IMDB Rating: " + JSON.parse(body).imdbRating);
			console.log("Rotten Tomatoes: " + JSON.parse(body).Ratings[1].Value);
			console.log("Country: " + JSON.parse(body).Country);
			console.log("Language: " + JSON.parse(body).Language);
			console.log("Plot: " + JSON.parse(body).Plot);
			console.log("Actors: " + JSON.parse(body).Actors);
		};
	});
}
else if (userInput === "do-what-it-says") {
	// run spotify-this-song for "I Want it That Way," as follows the text in random.txt
};




//OMDB AJAX Call

	// var movie = process.argv;
		
	// var queryURL = "http://www.omdbapi.com/?t=" + movie + "&y=&plot=short&apikey=40e9cece";
	
	// $.ajax({
	// 	url: queryURL,
	// 	method: "GET"
	// }).done(function(response) {
	// 	console.log(response.stringify());
	// });