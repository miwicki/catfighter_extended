'use strict';
var fightData = [];
var playerOneAtt = document.getElementById('pOneAtt');
var playerOneDef = document.getElementById('pOneDef');
var playerTwoAtt = document.getElementById('pTwoAtt');
var playerTwoDef = document.getElementById('pTwoDef');
var allCats = [];
var playerOne = [];
var playerTwo = [];
var leaderboard = [];
var score = 1000;
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

//User constructor function
function User(username) {
  this.username = username;
  leaderboard.push(this);
}

//all cats being instanced
new Fighter('Cute-Cat', 'images/kitty1.jpg');
new Fighter('Grumpy-Cat', 'images/GrumpyCat.jpg');
new Fighter('Spookie','images/spookie.jpg');
new Fighter('Nova','images/nova.jpg');
new Fighter('Gary', 'images/gary.jpg');
new Fighter('Charlotte', 'images/charlotte.jpg');
new Fighter('Demi', 'images/demi.png');
for (var i in allCats){
  if (fightData[0] === allCats[i].name){
    playerOne = allCats[i];
  }
  if (fightData[1] === allCats[i].name){
    playerTwo = allCats[i];
  }
}
//function dedicated to the heal
function heal() {
  var randomHeal = Math.floor(Math.random() * (12 - 2) + 3);
  return randomHeal;
};

//function dedicated to the attack
function attackOne() {
  var randomAttack = Math.floor(Math.random() * (20 - 0 + 1) + 0);
  score = score + randomAttack;
  return randomAttack;
};

//listener to listen for which move to call
//Event handler for attack and heal for each player based on button click
playerOneAtt.addEventListener('click', pOneAttHandler);
playerOneDef.addEventListener('click', pOneDefHandler);
playerTwoAtt.addEventListener('click', pTwoAttHandler);
playerTwoDef.addEventListener('click', pTwoDefHandler);
// playerTwoSec.addEventListener('click', fightHandler);

function pOneAttHandler() {
  var pOneAttack = attackOne();
  playerTwo.health -= pOneAttack;
  score = score + pOneAttack;
  console.log('Player one health: ' + playerOne.health);
  console.log('Player two health: ' + playerTwo.health);
}
function pOneDefHandler() {
  var pOneDefence = heal();
  playerOne.health += pOneDefence;
  score = score - pOneDefence;
  console.log('Player one health: ' + playerOne.health);
  console.log('Player two health: ' + playerTwo.health);
}
function pTwoAttHandler() {
  var pTwoAttack = attackOne();
  playerOne.health -= pTwoAttack;
  score = score + pTwoAttack;
  console.log('Player one health: ' + playerOne.health);
  console.log('Player two health: ' + playerTwo.health);
}
function pTwoDefHandler() {
  var pTwoDefence = heal();
  playerTwo.health += pTwoDefence;
  score = score - pOneDefence;
  console.log('Player one health: ' + playerOne.health);
  console.log('Player two health: ' + playerTwo.health);
}


//function to to win/lose screen
//function to hide other player's buttons
//once victor has won, enter in username and redirect that information to leaderboard
//figure out how to use sort
