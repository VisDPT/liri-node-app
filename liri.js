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

var nodeArgs = process.argv;
var twitterCommand = "";

function twitterFeed() {
    keys.get('statuses/user_timeline', params, function(error, tweets) {
        if (!error) {
            for (var i = 0; i < 20; i++) {
                var tweetMessage = 'Tweet: ' + '"' + tweets[i].text + '"          ' + tweets[0].created_at;
                console.log(tweetMessage);
                fs.appendFile("./log.txt", "\n" + tweetMessage);
            }
        }
    });
}
//====================SPOTIFY API from INQUIRER===============================================
var SpotifyWebApi = require('spotify-web-api-node');
var spotifyApi = new SpotifyWebApi();
var nodeArgs = process.argv;
var songName = "";

function spotifySong() {
    for (var i = 3; i < nodeArgs.length; i++) {
        if (i > 3 && i < nodeArgs.length) {
            songName = songName + "+" + nodeArgs[i];
        } else {
            songName = songName + nodeArgs[i];
        }
    }
    spotifyApi.searchTracks('track:' + songName)
        .then(function(data) {
            console.log("\n===========================================" +
                "\nSearch Results:" +
                "\n-------------------------------------------");
            var spotifyResults =
                "\n" + "SONG NAME:" + data.body.tracks.items[0].name + ";" +
                "\n" + "ARTIST:" + data.body.tracks.items[0].artists[0].name + ";" +
                "\n" + "LINK:" + data.body.tracks.items[0].href + ";" +
                "\n" + "Album Name:" + data.body.tracks.items[0].album.name + ";" +
                "\n" + "\n" +
                "SONG NAME:" + data.body.tracks.items[1].name + ";" +
                "\n" + "ARTIST:" + data.body.tracks.items[1].artists[0].name + ";" +
                "\n" + "LINK:" + data.body.tracks.items[1].href + ";" +
                "\n" + "Album Name:" + data.body.tracks.items[1].album.name + ";" +
                "\n" + "\n" +
                "SONG NAME:" + data.body.tracks.items[2].name + ";" +
                "\n" + "ARTIST:" + data.body.tracks.items[2].artists[0].name + ";" +
                "\n" + "LINK:" + data.body.tracks.items[2].href + ";" +
                "\n" + "Album Name:" + data.body.tracks.items[2].album.name + ";" +
                "\n" +
                "\n===========================================";
            console.log(spotifyResults);
            fs.appendFile("./log.txt", "\n" + spotifyResults);

        }, function(err) {
            console.error(err);
        });
}
//data.body.tracks.items. 

function spotifyNoSong() {
    spotifyApi.searchTracks("artist:" + "Ace of Base")
        .then(function(data) {
            var noSong = "\n==========================================" +
                "\n" + "ARTIST:" + data.body.tracks.items[1].artists[0].name + ";" +
                "\n" + "SONG NAME:" + data.body.tracks.items[1].name + ";" +
                "\n" + "LINK:" + data.body.tracks.items[1].external_urls.spotify + ";" +
                "\n" + "Album Name:" + data.body.tracks.items[1].album.name + ";" +
                "\n==========================================";
            console.log(noSong);
            fs.appendFile("./log.txt", "\n" + noSong);

        }, function(err) {
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

    request(queryUrl, function(error, response, body) {
        // If the request is successful (i.e. if the response status code is 200)
        if (!error && response.statusCode == 200) {
            console.log("\n===========================================" +
                "\nSearch Results:" +
                "\n-------------------------------------------");

            var movieResults = "\nMovie Title: " + JSON.parse(body)["Title"] +
                "\n" +
                "\nYear Came Out: " + JSON.parse(body)["Year"] +
                "\nIMBDB rating: " + JSON.parse(body)["imdbRating"] +
                "\nCountry of Production: " + JSON.parse(body)["Country"] +
                "\nLanguage: " + JSON.parse(body)["Language"] + "\n" +
                "\nPlot: " + JSON.parse(body)["Plot"] +
                "\nActors: " + JSON.parse(body)["Actors"] + "\n" +
                "\nRotten Tomatoes Rating: " + JSON.parse(body)["tomatoRating"] +
                "\nRotten Tomatoes URL: " + JSON.parse(body)["tomatoURL"] +
                "\n==========================================";
            console.log(movieResults);
            fs.appendFile("./log.txt", "\n" + movieResults);
        }
    });
}
var mrNobody = "http://www.imdb.com/title/tt0485947/";
var mrNobodyMessage = "\n==========================================" +
    "\nIf you haven't watched 'Mr. Nobody', then you should: " +
    "\n" + mrNobody +
    "\nIt's on Netflix!" +
    "\n==========================================";
//============================== Do What It says ==================================
var fs = require('fs');

function doWhatItSays_BBB() {
    fs.readFile("random.txt", "utf8", function(error, data) {
        var dataArr = data.split(',');
        var command = dataArr[0];
        var song = dataArr[1];
        spotifyApi.searchTracks("track:" + song)
            .then(function(data) {

                var dwis = "\n========================================" +
                    "\nARTIST:" + data.body.tracks.items[0].artists[0].name + ";" +
                    "\n" + "SONG NAME:" + data.body.tracks.items[0].name + ";" +
                    "\n" + "LINK:" + data.body.tracks.items[0].external_urls.spotify + ";" +
                    "\n" + "Album Name:" + data.body.tracks.items[0].album.name + ";" +
                    "\n========================================\n";
                console.log(dwis);
                fs.appendFile("./log.txt", "\n" + dwis);
            }, function(err) {
                console.error(err);
            });
    });
}

//================================= BONUS +++++  =========================================
function append() {
    nodeArgs = process.argv;
    var command = "";
    for (var i = 2; i < nodeArgs.length; i++) {
        if (i > 2 && i < nodeArgs.length) {
            command = command + " " + nodeArgs[i];
        } else {
            command = command + " " + nodeArgs[i];
        }
    }
    var printCommand = "\n ==================================" + "\n node " + "liri.js " + command
    fs.appendFile("./log.txt", printCommand + "\n", function(err) {
        if (err) {
            console.log(err);
            console.log("Command NOT logged");
        } else {
            console.log("Command & results logged!");
        }
    });
}
//================================= PROCESS =========================================
// ==========TWEET COMMAND =========
if (process.argv[2] == "my-tweets") {
    twitterFeed();
    append();
// ==========SPOTIFY COMMAND =========
} else if (process.argv[2] == "spotify-this-song") {
    if (process.argv[3] == null) {
        spotifyNoSong();
        append();
    } else {
        spotifySong();
        append();
    }
// ==========OMDB COMMAND =========
} else if (process.argv[2] == "movie-this") {
    if (process.argv[3] == null) {
        console.log(mrNobodyMessage);
        append();
        fs.appendFile("./log.txt", "\n" + mrNobodyMessage);
    } else {
        omdbiRequest();
        append();
    }
// ==========Do what it Says COMMAND =========
} else if (process.argv[2] == "do-what-it-says") {
    doWhatItSays_BBB();
    append();
}
