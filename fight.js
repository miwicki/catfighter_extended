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
var fighterOne = document.getElementById('PlayerOne');
var fighterTwo = document.getElementById('PlayerTwo');
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
} else {
  new User('WIL','9999');
  new User('KAT','700');
  new User('JJK','100');
  new User('MAT', '2000');
  new User('AAA', '42');
  new User('BBB', '7');
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

fighterOne.src = playerOne.filepath;
fighterTwo.src = playerTwo.filepath;
document.getElementById('playerOneName').innerHTML = playerOne.name;
document.getElementById('playerTwoName').innerHTML = playerTwo.name;
document.getElementById('playerOneHP').innerHTML = playerOne.health;
document.getElementById('playerTwoHP').innerHTML = playerTwo.health;

function leaderboardHandler (event) {
  event.preventDefault();
  var user = event.target.submitUser.value;
  new User(user, score);
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
  var randomAttack = 0;
  randomAttack = Math.floor(Math.random() * (50 - 20 + 1) + 20);
  score = score + randomAttack;
  console.log(randomAttack);
  playerTwo.health = playerTwo.health - randomAttack;
  document.getElementById('playerTwoHP').innerHTML = playerTwo.health;
  if (playerTwo.health <= 0) {
    console.log('Below Zero Triggered');
    addUser();
  } else {
    pTwoTurn();
  }
}
function pOneDefHandler() {
  var randomHeal = 0;
  randomHeal = Math.floor(Math.random() * (12 - 2) + 3);
  playerOne.health = playerOne.health + randomHeal;
  document.getElementById('playerOneHP').innerHTML = playerOne.health;
  pTwoTurn();
}
function pTwoAttHandler() {
  var randomAttack = 0;
  randomAttack = Math.floor(Math.random() * (50 - 20 + 1) + 20);
  score = score + randomAttack;
  console.log(randomAttack);
  playerOne.health = playerOne.health - randomAttack;
  document.getElementById('playerOneHP').innerHTML = playerOne.health;
  if (playerOne.health <= 0) {
    addUser();
  } else {
    pOneTurn();
  }
}
function pTwoDefHandler() {
  var randomHeal = 0;
  randomHeal = Math.floor(Math.random() * (12 - 2) + 3);
  score = score - randomHeal;
  playerTwo.health = playerTwo.health + randomHeal;
  document.getElementById('playerTwoHP').innerHTML = playerTwo.health;
  pOneTurn();
}

//Function grabbing user data and pushing to leaderboard array
//function to to win/lose screen
//function to hide other player's buttons
//once victor has won, enter in username and redirect that information to leaderboard
//figure out how to use sort
