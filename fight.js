'use strict';
var fightData = [];
var fighter = document.getElementByClassName('fighter');
fightData = JSON.parse(localStorage.getItem('fightData'));

//load localStorage
if (fightData === null || fightData.length < 2) {
  alert('You have arrived here in error.  Return to character select screen!');
  window.location.href = 'index.html';
}

//Character construction function
function Fighter(name, filepath) {
  this.name = name;
  this.filepath = filepath;
  this.health = 100;
}

//all cats being instanced
new Fighter('Cute-Cat', 'images/kitty1.jpg');
new Fighter('Grumpy-Cat', 'images/GrumpyCat.jpg');
new Fighter('Spookie','images/spookie.jpg');
new Fighter('Nova','images/nova.jpg');

//random function that takes in min and max


//function dedicated to the heal


//function dedicated to the attack


//listener to listen for which move to call
//Event handler for attack and heal for each player based on button click 
fighter.addEventListener('click', fightHandler);

function fightHandler(event) {
  if(event.target.id = 'pOneAtt'){
    playerTwo[0].health -= attackOne();
  }
  if(event.target.id = 'pOneDef'){
    playerOne[0].health += heal();
  }
  if(event.target.id = 'pTwoAtt'){
    playerOne[0].health -= attackOne();
  }
  if(event.target.id = 'pTwoDef'){
    playerTwo[0].health += heal();
  }
}

//function to to win/lose screen
//function to hide other player's buttons
//once victor has won, enter in username and redirect that information to leaderboard
//figure out how to use sort
