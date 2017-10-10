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
var endScreen = document.getElementById('endScreen');
var userForm = document.getElementById('userForm');
endScreen.style.visibility = 'hidden';

pOneTurn();
//Trying to get turns to work
function pOneTurn(){
  document.getElementById('pOneAtt').style.visibility = 'visible';
  document.getElementById('pOneDef').style.visibility = 'visible';
  document.getElementById('pTwoAtt').style.visibility = 'hidden';
  document.getElementById('pTwoDef').style.visibility = 'hidden';
}

function pTwoTurn(){
  document.getElementById('pOneAtt').style.visibility = 'hidden';
  document.getElementById('pOneDef').style.visibility = 'hidden';
  document.getElementById('pTwoAtt').style.visibility = 'visible';
  document.getElementById('pTwoDef').style.visibility = 'visible';
}
fightData = JSON.parse(localStorage.getItem('fightData'));

//load localStorage
if (fightData === null || fightData.length < 2) {
  alert('You have arrived here in error.  Return to character select screen!');
  window.location.href = 'index.html';
}

if (localStorage.getItem('leaderboard') !== null) {
  console.log('Data found');
  leaderboard = JSON.parse(localStorage.getItem('leaderboard'));
}

//Character construction function
function Fighter(name, filepath) {
  this.name = name;
  this.filepath = filepath;
  this.health = 100;
  allCats.push(this);
}

//User constructor function
function User(username, score) {
  this.username = username;
  this.score = score;
  leaderboard.push(this);
}

new User('Will','9999');
new User('Kat','700');

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
  var randomAttack = Math.floor(Math.random() * (50 - 20 + 1) + 20);
  score = score + randomAttack;
  return randomAttack;
};

function leaderboardHandler (event) {
  event.preventDefault();
  var user = event.target.submitUser.value;
  new User(user);
  localStorage.setItem('leaderboard', JSON.stringify(leaderboard));
  window.location.href = 'leaderboard.html';
}

function addUser() {
  endScreen.style.visibility = 'visible';
}

//listener to listen for which move to call
//Event handler for attack and heal for each player based on button click
//Listener for username submit
playerOneAtt.addEventListener('click', pOneAttHandler);
playerOneDef.addEventListener('click', pOneDefHandler);
playerTwoAtt.addEventListener('click', pTwoAttHandler);
playerTwoDef.addEventListener('click', pTwoDefHandler);
userForm.addEventListener('submit', leaderboardHandler);
// playerTwoSec.addEventListener('click', fightHandler);

function pOneAttHandler() {
  var pOneAttack = attackOne();
  playerTwo.health -= pOneAttack;
  score = score + pOneAttack;
  console.log('Player one health: ' + playerOne.health);
  console.log('Player two health: ' + playerTwo.health);
  if (playerTwo.health <= 0) {
    console.log('Below Zero Triggered');
    addUser();
  } else {
    pTwoTurn();
  }
}
function pOneDefHandler() {
  var pOneDefence = heal();
  playerOne.health += pOneDefence;
  score = score - pOneDefence;
  console.log('Player one health: ' + playerOne.health);
  console.log('Player two health: ' + playerTwo.health);
  pTwoTurn();
}
function pTwoAttHandler() {
  var pTwoAttack = attackOne();
  playerOne.health -= pTwoAttack;
  score = score + pTwoAttack;
  console.log('Player one health: ' + playerOne.health);
  console.log('Player two health: ' + playerTwo.health);
  if (playerOne.health <= 0) {
    console.log('Below Zero Triggered');
    addUser();
  } else {
    pOneTurn();
  }
}
function pTwoDefHandler() {
  var pTwoDefence = heal();
  playerTwo.health += pTwoDefence;
  score = score - pTwoDefence;
  console.log('Player one health: ' + playerOne.health);
  console.log('Player two health: ' + playerTwo.health);
  pOneTurn();
}

//Function grabbing user data and pushing to leaderboard array
//function to to win/lose screen
//function to hide other player's buttons
//once victor has won, enter in username and redirect that information to leaderboard
//figure out how to use sort
