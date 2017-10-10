'use strict';
var fightData = [];
fightData = JSON.parse(localStorage.getItem('fightData'));

//load localStorage
if (fightData === null || fightData.length < 2) {
  alert('You have arrived here in error.  Return to character select screen!');
  window.location.href = 'index.html';
}

//Character construction function


//all cats being instanced


//random function that takes in min and max


//function dedicated to the heal


//function dedicated to the attack


//listener to listen for which move to call


//function to to win/lose screen
//function to hide other player's buttons
//once victor has won, enter in username and redirect that information to leaderboard
//figure out how to use sort
