//grabs the keys from keys.js
//var twitterKeyFile = require('./keys.js');
//var twitterKeyInfo = twitterKeyFile.twitterKeys;

// Include the request npm package (Don't forget to run "npm install request" in this folder first!)


//TWITTER API from Inquirer

//====================SPOTIFY API from INQUIRER

//=============================REQUEST OMDB API ===============================================

// Then run a request to the OMDB API with the movie specified
var request = require('request');
var nodeArgs = process.argv;
var movieName = "";


function omdbiRequest(){
	for (var i=2; i<nodeArgs.length; i++){
		if (i>2 && i< nodeArgs.length){
			movieName = movieName + "+" + nodeArgs[i]; 
		}
		else {
			movieName = movieName + nodeArgs[i];
		}
	}
	var queryUrl = 'http://www.omdbapi.com/?t=' + movieName +'&y=&plot=full&tomatoes=true&r=json';
	console.log(queryUrl);
	request(queryUrl, function (error, response, body) {
		// If the request is successful (i.e. if the response status code is 200)
		if (!error && response.statusCode == 200) {
			console.log(
				"\n ==========================================" +
				"\nMovie Title: "+ JSON.parse(body)["Title"]+
				"\nYear Came Out: "+ JSON.parse(body)["Year"]+
				"\nIMBDB rating: " + JSON.parse(body)["imdbRating"]+
				"\nCountry of Production: " +JSON.parse(body)["Country"]+
				"\nLanguage: " + JSON.parse(body)["Language"]+
				"\nPlot: " + JSON.parse(body)["Plot"]+
				"\nActors: " + JSON.parse(body)["Actors"]+
				"\nRotten Tomatoes Rating: " + JSON.parse(body)["tomatoRating"]+
				" Rotten Tomatoes URL: " + JSON.parse(body)["tomatoURL"]+
				"\n =========================================="
				)
		}
	});
}

omdbiRequest();
