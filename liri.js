// Include the appropriate npm packages (Don't forget to run "npm install __________" in this folder first!)

//=============================TWITTER API from inquirer===============================================
//grabs the keys from keys.js
var Twitter = require('twitter');
var twitterFile = require('./keys.js');
var keys = new Twitter(twitterFile.twitterKeys);

var params = {
    screen_name: 'VisDPT',
    count: 20,
    trim_user: 1,
    contributer_details: true
};

function twitterFeed() {
    keys.get('statuses/user_timeline', params, function(error, tweets) {
        if (!error) {
            var results = tweets.data
            console.log(tweets);
        } else {
            console.log(error);
        }
    });
}

//====================SPOTIFY API from INQUIRER===============================================
var SpotifyWebApi = require('spotify-web-api-node');
var spotifyApi = new SpotifyWebApi();
var spotifyArgs = process.argv;
var songName = "";


function spotifySong(){
    for (var i = 3; i < spotifyArgs.length; i++) {
        if (i > 3 && i < spotifyArgs.length) {
            songName = songName + "+" + spotifyArgs[i];
        } else {
            songName = songName + spotifyArgs[i];
        }
    }
    
    spotifyApi.searchTracks('track:' + songName)
      .then(function(data) {
        console.log("Search Results for:  " + songName + "\n")
        console.log("\n==========================================" +
            "\n" +"SONG NAME:" + data.body.tracks.items[0].name +";"+
            "\n" +"ARTIST:" + data.body.tracks.items[0].artists[0].name +";"+  
             "\n" +"LINK:" + data.body.tracks.items[0].href +";"+
             "\n" +"Album Name:" + data.body.tracks.items[0].album.name + ";"+
             "\n==========================================");
        console.log("SONG NAME:" + data.body.tracks.items[1].name +";"+
            "\n" +"ARTIST:" + data.body.tracks.items[1].artists[0].name +";"+
             "\n" +"LINK:" + data.body.tracks.items[1].href +";"+
             "\n" +"Album Name:" + data.body.tracks.items[1].album.name + ";"+
             "\n==========================================");
        console.log("SONG NAME:" + data.body.tracks.items[2].name +";"+
            "\n" +"ARTIST:" + data.body.tracks.items[2].artists[0].name +";"+ 
             "\n" +"LINK:" + data.body.tracks.items[2].href +";"+
             "\n" +"Album Name:" + data.body.tracks.items[2].album.name + ";" +
             "\n==========================================");

      }, function(err) {
        console.error(err);
      });
}

//data.body.tracks.items. 

function spotifyNoSong(){

    spotifyApi.searchTracks("artist:" + "Ace of Base")
      .then(function(data) {
        console.log("\n" +"ARTIST:" + data.body.tracks.items[1].artists[0].name +";"+
             "\n" +"SONG NAME:" + data.body.tracks.items[1].name +";"+
             "\n" +"LINK:" + data.body.tracks.items[1].external_urls.spotify +";"+
             "\n" +"Album Name:" + data.body.tracks.items[1].album.name + ";");

      },function(err) {
        console.error(err);
      });

}



//=============================REQUEST OMDB API ===============================================
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


//================================= PROCESS =========================================


// ==========TWEET COMMAND =========
if (process.argv[2] == "my-tweets") {
    console.log("twitter API");
    twitterFeed();

    // ==========SPOTIFY COMMAND =========
} else if (process.argv[2] == "spotify-this-song") {
    if (process.argv[3] == null) {
        spotifyNoSong();
    } else {
        spotifySong();
    }

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
