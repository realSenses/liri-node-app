require("dotenv").config();


var logo = require("./logo.js");
var request = require("request");
var Spotify = require("node-spotify-api");
var Twitter = require("twitter");
var fs = require('fs');
var keys = require('./keys.js');
var imageToAscii = require("image-to-ascii"); //TODO use this for movie posters, was removed pending a fix to how it looked
var inquirer = require('inquirer');
var stripAnsi = require('strip-ansi');
var clear = require('clear');
var hangman = require("./hangman/hangman.js");
var weather = require('weather-js');

var spotify = new Spotify(keys.spotify);
var client = new Twitter(keys.twitter);

clear();

console.log(logo());

var mainMenu = function(){
currentDate();
inquirer.prompt([
    {
      type: "list",
      message: "Program:",
      choices: [
        "\x1b[38;5;197mEDM Hangman\x1b[0m",
        "\x1b[38;5;39mTwitter\x1b[0m",
        "\x1b[38;5;46mSpotify\x1b[0m",
        "\x1b[38;5;196mMovies\x1b[0m",
        "\x1b[38;5;208mRead File\x1b[0m",
        "\x1b[38;5;220mWeather\x1b[0m"
        ],
      name: "choice",
      filter: function (str){
        return stripAnsi(str);
      }
    },
    {
      name: 'response',
      message: 'How many tweets? (1-20)',
      when: function(answers){
        return answers.choice === 'Twitter';
      }
    },
     {
      name: 'response',
      message: 'Song Name:',
      when: function(answers){
        return answers.choice === 'Spotify';
      }
    }, {
      name: 'response',
      message: 'Movie Title:',
      when: function(answers){
        return answers.choice === 'Movies';
      }
    }, {
      name: 'response',
      message: 'City:',
      when: function(answers){
        return answers.choice === 'Weather';
      }
    },
    ])

  .then(function(inquirerResponse) {
    var choice = inquirerResponse.choice;
    var response = inquirerResponse.response;
    switchToResponse(choice, response);
  });
}


module.exports.mainMenu = mainMenu;


mainMenu();

function switchToResponse(choice, response) {
  switch (choice) {
    case 'EDM Hangman':
      hangman();
      break;
    case 'Twitter':
      clear();
      twitter(response);
      break;
    case 'Spotify':
      clear();
      spotifyThis(response);
      break;
    case 'Movies':
      clear();
      movieThis(response)
      break;
    case 'Read File':
      clear();
      readFile();
      break;
    case 'Weather':
      clear();
      weatherThis(response);
      break;
    default:
      console.log("Unhandled Case!");
  }
} //switchToResponse



function twitter(num) {
  
  console.log("\x1b[38;5;214m" + "Displaying tweets from: " + "\x1b[0m" + "\x1b[38;5;76m"+ "realSenses" +"\x1b[0m");

  var params = { screen_name: 'realSenses', count: num };

  client.get('statuses/user_timeline', params, function(error, tweets, response) {

    if (!error) {
      //var data = []; //empty array to hold data
      for (var i = 0; i < tweets.length; i++) {
        colorText(236, tweets[i].created_at);
        console.log(tweets[i].text);
        console.log("\n========================================")
      }

    }
    mainMenu();
  });

} //twitter




function readFile() {
  //console.log("reading file 'random.txt'");
  fs.readFile("random.txt", "utf8", function(error, data) {

    if (error) {
      return console.log(error);
    }

    var array = data.split(",");
    switchToResponse(array[0], array[1])

  });
};//readFile


var song = function(artist, song, album, preview) {
  this.artist = artist;
  this.song = song;
  this.album = album;
  this.preview = preview;  
}

function spotifyThis(name) {
  // if no song is provided
  if (name == "") {
    name = 'Ace of Base - The Sign';
    colorText(160, "You didn\'t pick a song."); 
    console.log("\x1b[38;5;214m" + "lets use: " + "\x1b[0m" + "\x1b[38;5;76m"+ name +"\x1b[0m");
  }


spotify.search({ type: 'track', query: name, limit: '10'}, function(err, data) {
  if (err) {
    return console.log('Error occurred: ' + err);
  }
 
  var songResponse = data.tracks.items;

  var songArray = []
  var titleArray = []

  for (var i = 0; i < songResponse.length; i++) {
    if (songResponse[i] != undefined) {

        var newSong = new song(
        songResponse[i].artists[0].name,
        songResponse[i].name,
        songResponse[i].album.name,
        songResponse[i].preview_url);
  
        songArray.push(newSong);

        titleArray.push(songResponse[i].name);

    }
  }

  inquirer.prompt([
    {
      type: "list",
      message: "Song:",
      choices: titleArray,
      name: "choice",
      filter: function (str){
        return stripAnsi(str);
      }
    }])
  .then(function(inquirerResponse) {

    for (var i = 0; i < songResponse.length; i++) {
      if (songArray[i].song === inquirerResponse.choice) {
     // console.log("Song: "+ songArray[i].song);
        console.log("\n========================================");
        console.log("Artists: "+songArray[i].artist);
        console.log("Album: "+songArray[i].album);
        console.log("Preview Link: "+"\x1b[38;5;4m"+ songArray[i].preview +"\x1b[0m");
        console.log("\n========================================");
        break; // only return once song
      }
    }
  mainMenu();
  });



});

} //spotifyThis

function weatherThis(name){

    weather.find({search: name, degreeType: 'F'}, function(err, result) {
        var weather = result[0];

        if(err) { console.log(err);
          mainMenu();} else {
        console.log("\n========================================");
        console.log( weather.location.name + " " + weather.current.day + " " + weather.current.date);
        console.log("Current temperature: " + weather.current.temperature);
        console.log("It feels like: " + weather.current.feelslike + "\n");
        console.log("The 3 day forecast is: \n---------------"); 
        console.log(weather.forecast[1].day + " " + weather.forecast[1].date);
        console.log("  Weather: " + weather.forecast[1].skytextday);
        console.log("  High: " + weather.forecast[1].high);
        console.log("  Low: " + weather.forecast[1].low + "\n-----------");
        console.log(weather.forecast[2].day + " " + weather.forecast[2].date);
        console.log("  Weather: " + weather.forecast[2].skytextday)
        console.log("  High: " + weather.forecast[2].high);
        console.log("  Low: " + weather.forecast[2].low + "\n-----------");
        console.log(weather.forecast[3].day + " " + weather.forecast[3].date);
        console.log("  Weather: " + weather.forecast[3].skytextday)
        console.log("  High: " + weather.forecast[3].high);
        console.log("  Low: " + weather.forecast[3].low);
        console.log("\n========================================");
    }
    mainMenu();
  }); 
    
}; //weatherThis


function movieThis(name){

  if (name == "") {
    name = 'Mr. Nobody';
    colorText(160, "You didn\'t pick a movie.");
    colorText(214, "lets use: " + name);

   // console.log("\x1b[38;5;214m" + "lets use: " + "\x1b[0m" + "\x1b[38;5;76m"+ name +"\x1b[0m");
  }

  var queryUrl = "http://www.omdbapi.com/?t=" + name + "&y=&plot=short&apikey=trilogy";

  request(queryUrl, function(error, response, body) {
    if (!error && response.statusCode === 200) {
    
      var movieResponse = JSON.parse(body);

      if (movieResponse.Response === 'False'){

        colorText(160, "Movie not found");
        mainMenu();
      } else {
        console.log("\n========================================");
        colorText(226, "Title: "+movieResponse.Title);
        
        console.log("Released: "+movieResponse.Year);
        console.log("IMDB Rating: "+movieResponse.imdbRating);

        for (var i = 0; i < movieResponse.Ratings.length; i++) {
          if (movieResponse.Ratings[i].Source === 'Rotten Tomatoes') {
            console.log("Rotten Tomatoes Rating: "+movieResponse.Ratings[i].Value);
          }
        }

        console.log(movieResponse.Country);
        console.log(movieResponse.Language);

        colorText(122, movieResponse.Plot)
        colorText(105, movieResponse.Actors)
        console.log("\n========================================\n");  
         //TODO Get image-to-ascii or some alternative working here for movie posters.
         mainMenu();

      }
    }
  });
} //movieThis


function colorText(num, text) {
  console.log("\x1b[38;5;"+num+"m" + text + "\x1b[0m");
}

function currentDate() {
  console.log('Current Date is: ' + new Date().toISOString().slice(0, 10));
}



