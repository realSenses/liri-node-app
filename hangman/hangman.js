var Word = require("./Word.js");
var Game = require("./Game.js");
var inquirer = require('inquirer');
var clear = require('clear');
var liri = require('../liri.js');
var fs = require("fs");

var myGame = '';

var newGame = function newGame(){
  clear();

  fs.readFile("hangman/words.txt", "utf8", function(err, data) {
    if (err) return err;
    
    var split = data.split("\n");

    myGame = new Game(split[Math.floor(Math.random()*split.length)]);

    console.log("Guess an electronic artist, Good Luck!\n");
    myGame.word.display();
    console.log('\n');
    guessLetter();

    });
}

function guessLetter(){
  inquirer.prompt([
    {
      type: "text",
      message: "Guess a Letter:",
      name: "guess",
      validate: function(value) {
        var range = /[a-zA-Z]+/;
        if (value.length > 1) {
          return "Too many characters.";
        }
        else if (value.match(range)) {
          return true;
        }
        else {
          return "You know, that's not a valid letter.";
        }
      }
    }
  ]).then(function(inquirerResponse) {
    var guess = inquirerResponse.guess.toUpperCase();

    myGame.guess(guess) ? endGameMenu() : guessLetter();

  });
}

function endGameMenu(){

  inquirer.prompt([
      {
      type: "list",
      message: "Options:",
      choices: [
        "New Game",
        "Main Menu"
        ],
      name: "option"
    }]
  ).then(function(inquirerResponse) {
      console.log(inquirerResponse.option);
      switch (inquirerResponse.option) {
      case 'New Game':
        newGame();
        break;
      case 'Main Menu':
        clear();
        liri.mainMenu();
        break;
      default:
        console.log("Unhandled Case!");
    }

    });
}

module.exports = newGame;
