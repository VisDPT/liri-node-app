

// Include the request npm package (Don't forget to run "npm install request" in this folder first!)


//=============================TWITTER API from inquirer===============================================
//grabs the keys from keys.js
var Twitter = require('twitter');
var twitterFile = require('./keys.js');
var keys =  new Twitter (twitterFile.twitterKeys); 


//var client =  new Twitter ({keys});
 //     consumer_key: keys.consumer_key,
 //     consumer_secret: keys.consumer_secret,
 //     access_token_key: keys.access_token_key,
 //     access_token_secret: keys.access_token_secret,
 // })


var params = {screen_name: 'VisDPT'};

function twitterFeed(){
  keys.get('statuses/user_timeline', params, function(error, tweets, response) {
    if (!error) {
       console.log(tweets);
    } else{
        console.log(error);
    }
  });
}
//twitterFeed();
//====================SPOTIFY API from INQUIRER
//var SpotifyWebApi = require('spotify-web-api-node');



//=============================REQUEST OMDB API ===============================================
// Then run a request to the OMDB API with the movie specified
var request = require('request');
var nodeArgs = process.argv;
var movieName = "";

function omdbiRequest() {
    for (var i = 3; i < nodeArgs.length; i++) {
        if (i > 3 && i < nodeArgs.length) {
            movieName = movieName + "+" + nodeArgs[i];
        } else {
            movieName = movieName + nodeArgs[i];
        }
    }
    var queryUrl = 'http://www.omdbapi.com/?t=' + movieName + '&y=&plot=full&tomatoes=true&r=json';
    console.log(queryUrl);
    request(queryUrl, function(error, response, body) {
        // If the request is successful (i.e. if the response status code is 200)
        if (!error && response.statusCode == 200) {
            console.log(
                "\n==========================================" +
                "\nMovie Title: " + JSON.parse(body)["Title"] +
                "\n" +
                "\nYear Came Out: " + JSON.parse(body)["Year"] +
                "\nIMBDB rating: " + JSON.parse(body)["imdbRating"] +
                "\nCountry of Production: " + JSON.parse(body)["Country"] +
                "\nLanguage: " + JSON.parse(body)["Language"] + "\n" +
                "\nPlot: " + JSON.parse(body)["Plot"] +
                "\nActors: " + JSON.parse(body)["Actors"] + "\n" +
                "\nRotten Tomatoes Rating: " + JSON.parse(body)["tomatoRating"] +
                "\nRotten Tomatoes URL: " + JSON.parse(body)["tomatoURL"] +
                "\n=========================================="
            )
        }
    });
}

var mrNobody = "http://www.imdb.com/title/tt0485947/";
var mrNobodyMessage = "If you haven't watched 'Mr. Nobody', then you should: " +
					   mrNobody +
					   " It's on Netflix!"




// ==========TWEET COMMAND =========
if (process.argv[2] == "my-tweets") {
    console.log("twitter API");
    twitterFeed();

    // ==========SPOTIFY COMMAND =========
} else if (process.argv[2] == "spotify-this-song") {
    console.log("spotify API");

    // ==========OMDB COMMAND =========
} else if (process.argv[2] == "movie-this") {
    if (process.argv[3] == null) {
        console.log(mrNobodyMessage);
    } else {
        omdbiRequest();
    }
    // ==========Do what it Says COMMAND =========
} else if (process.argv[2] == "do-what-it-says") {
    console.log("do what it says");
}
