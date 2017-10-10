'use strict';
var fightData = [];
// var playerOneSec = document.getElementById('playerOneSec');
// var playerTwoSec = document.getElementById('playerTwoSec');
var playerOneAtt = document.getElementById('pOneAtt');
var allCats = [];
var playerOne = [];
var playerTwo = [];
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
  allCats.push(this);
}

//all cats being instanced
new Fighter('Cute-Cat', 'images/kitty1.jpg');
new Fighter('Grumpy-Cat', 'images/GrumpyCat.jpg');
new Fighter('Spookie','images/spookie.jpg');
new Fighter('Nova','images/nova.jpg');
for (var i in allCats){
  if (fightData[0] === allCats[i].name){
    playerOne = allCats[i];
  }
  if (fightData[1] === allCats[i].name){
    playerTwo = allCats[i];
  }
}
//random function that takes in min and max


//function dedicated to the heal
function heal() {
  var randomHeal = Math.floor(Math.random() * (12 - 2) + 3);
  return randomHeal;
};

//function dedicated to the attack
function attackOne() {
  var randomAttack = Math.floor(Math.random() * (20 - 0 + 1) + 0);
  return randomAttack;
};

//listener to listen for which move to call
//Event handler for attack and heal for each player based on button click
playerOneAtt.addEventListener('click', pOneAttHandler);
// playerTwoSec.addEventListener('click', fightHandler);

function pOneAttHandler(event) {
  if(event.target.alt = 'pOneAtt'){
    playerTwo.health -= attackOne();
  }
  console.log('Player one health: ' + playerOne.health);
  console.log('Player two health: ' + playerTwo.health);
}
// if(event.target.alt = 'pOneDef'){
//   playerOne.health += heal();
// }
// if(event.target.alt = 'pTwoAtt'){
//   playerOne.health -= attackOne();
// }
// if(event.target.alt = 'pTwoDef'){
//   playerTwo.health += heal();
// }


//function to to win/lose screen
//function to hide other player's buttons
//once victor has won, enter in username and redirect that information to leaderboard
//figure out how to use sort
