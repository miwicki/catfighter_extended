'use strict';

//Over 9000 variables
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
var audio = document.getElementById('theme');
var playerOneAnimations = document.getElementById('playerOneAnimations');
var playerTwoAnimations = document.getElementById('playerTwoAnimations');
var playerOneContext = playerOneAnimations.getContext('2d');
var playerTwoContext = playerTwoAnimations.getContext('2d');
var myHealSpriteSheet = document.getElementById('healSprite');
var myScratchSpriteSheet = document.getElementById('scratchSprite');
var interval;
var arrayOfFunctions = [
  pOneTurn,
  pTwoTurn
];
var playerOneBool = false;

//Making the game over screen invisible, sprite sheets invisible, disabling image smoothing
endScreen.style.visibility = 'hidden';
myScratchSpriteSheet.style.visibility = 'hidden';
myHealSpriteSheet.style.visibility = 'hidden';
playerOneContext.imageSmoothingEnabled = false;
playerTwoContext.imageSmoothingEnabled = false;

//Starting on player one's turn
arrayOfFunctions[Math.floor(Math.random() * arrayOfFunctions.length)]();
battleSound();

//Loading fight data from local storage
fightData = JSON.parse(localStorage.getItem('fightData'));

//Loading loal storage
if (fightData === null || fightData.length < 2) {
  alert('You have arrived here in error.  Return to character select screen!');
  window.location.href = 'index.html';
}

if (localStorage.getItem('leaderboard') !== null) {
  leaderboard = JSON.parse(localStorage.getItem('leaderboard'));
} else {
  new User('WIL','9999');
  new User('KAT','700');
  new User('JJK','100');
  new User('MAT', '2000');
  new User('AAA', '42');
  new User('BBB', '7');
}

//Character, User, and Sprite constructor functions
function Fighter(name, filepath, minAtt, maxAtt, minDef, maxDef) {
  this.name = name;
  this.filepath = filepath;
  this.minAtt = minAtt;
  this.maxAtt = maxAtt;
  this.minDef = minDef;
  this.maxDef = maxDef;
  this.health = 100;
  allCats.push(this);
}

function Sprite(model){
  this.image = model.image;
  this.frames = model.frames;
  this.ticksPerFrame = model.ticksPerFrame;
  this.width = this.image.width;
  this.height = this.image.height;
  this.frameH = this.height / model.frames;
  this.frameIndex = 0;
  this.tickCount = 0;
}
Sprite.prototype.update = function(x, y){
  this.tickCount += 1;
  if(this.tickCount > this.ticksPerFrame){
    this.tickCount = 0;
    if(this.frameIndex < this.frames - 1){
      this.frames += 1;
    }
  }
  if(playerOneBool === true){
    playerOneContext.drawImage(
      this.image,
      0,
      this.frameIndex * this.frameH,
      this.width,
      this.frameH,
      x,
      y,
      this.width,
      this.frameH
    );
  }else{
    playerTwoContext.drawImage(
      this.image,
      0,
      this.frameIndex * this.frameH,
      this.width,
      this.frameH,
      x,
      y,
      this.width,
      this.frameH
    );
  }
};

function User(username, score) {
  this.username = username;
  this.score = score;
  leaderboard.push(this);
}

//Functions and variables for the actual animations
var healthAnimation = new Sprite({
  image: myHealSpriteSheet,
  frames: 5,
  ticksPerFrame: 10
});

var clawAnimation = new Sprite({
  image: myScratchSpriteSheet,
  frames: 4,
  ticksPerFrame: 10
});

//Drawing the scratch animation
function clawRender(){
  if(playerOneBool === true){
    if(clawAnimation.frameIndex === clawAnimation.frames){
      playerOneContext.clearRect(0, 0, 32, 160);
      clawAnimation.frameIndex = 0;
      clearInterval(interval);
    }else{
      playerOneContext.clearRect(0, 0, 32, 160);
      clawAnimation.update(0,0);
      clawAnimation.frameIndex++;
    }
  }else{
    if(clawAnimation.frameIndex === clawAnimation.frames){
      playerTwoContext.clearRect(0, 0, 32, 160);
      clawAnimation.frameIndex = 0;
      clearInterval(interval);
    }else{
      playerTwoContext.clearRect(0, 0, 32, 160);
      clawAnimation.update(0,0);
      clawAnimation.frameIndex++;
    }
  }
}

//Drawing the heal animation
function healRender (){
  if(playerOneBool === true){
    if(healthAnimation.frameIndex === healthAnimation.frames){
      playerOneContext.clearRect(0, 0, 32, 160);
      healthAnimation.frameIndex = 0;
      clearInterval(interval);
    }else{
      playerTwoContext.clearRect(0, 0, 32, 160);
      healthAnimation.update(0, 0);
      healthAnimation.frameIndex++;
    }
  }else{
    if(healthAnimation.frameIndex === healthAnimation.frames){
      playerTwoContext.clearRect(0, 0, 32, 160);
      healthAnimation.frameIndex = 0;
      clearInterval(interval);
    }else{
      playerOneContext.clearRect(0, 0, 32, 160);
      healthAnimation.update(0, 0);
      healthAnimation.frameIndex++;
    }
  }
}

//All characters being instanced
new Fighter('Cute-Cat', 'images/kitty1.jpg', 10, 50, 8, 20);
new Fighter('Grumpy-Cat', 'images/grumpy.jpg', 20, 50, 3, 12);
new Fighter('Espresso','images/wizard.jpg', 40, 50, 1, 7);
new Fighter('Nova','images/nova.jpg', 10, 70, 1, 15);
new Fighter('Gary', 'images/gary.jpg', 30, 60, 4, 12);
new Fighter('Charlotte', 'images/charlotte.jpg', 30, 60, 4, 12);
new Fighter('Demi', 'images/demi.jpg', 5, 100, 2, 15);

//Assigning characters to players
for (var i in allCats){
  if (fightData[0] === allCats[i].name){
    playerOne = allCats[i];
  }
  if (fightData[1] === allCats[i].name){
    playerTwo = allCats[i];
  }
}

//Loading character images, appending names and HP
fighterOne.src = playerOne.filepath;
fighterTwo.src = playerTwo.filepath;
document.getElementById('playerOneName').innerHTML = playerOne.name;
document.getElementById('playerTwoName').innerHTML = playerTwo.name;
document.getElementById('playerOneHP').setAttribute('value', playerOne.health);
document.getElementById('playerTwoHP').setAttribute('value', playerTwo.health);

//Functions to handle turns
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

//Function to make game over screen visible
function gameOver () {
  document.getElementById('gameOver').play();
  endScreen.style.visibility = 'visible';
}

//Functions to handle sound effects
function attackSound () {
  document.getElementById('attack').play();
}

function healSound () {
  document.getElementById('heal').play();
}

function massiveDamage () {
  document.getElementById('massiveDamage').play();
}

function lightHit () {
  document.getElementById('lightHit').play();
}

function battleSound () {
  document.getElementById('battle').play();
}

//Event Handlers for character attacks, heals, and HP display updates

function pOneAttHandler() {
  var randomAttack = 0;
  playerOneBool = false;
  randomAttack = Math.floor(Math.random() * (playerOne.maxAtt - playerOne.minAtt + 1) + playerOne.minAtt);
  score = score + randomAttack;
  playerTwo.health = playerTwo.health - randomAttack;
  document.getElementById('playerTwoHP').setAttribute('value', playerTwo.health);
  attackSound();
  if (randomAttack == playerOne.maxAtt || randomAttack == (playerOne.maxAtt - 1)) {
    massiveDamage();
  }
  if (randomAttack == playerOne.minAtt || randomAttack == (playerOne.minAtt + 1)) {
    lightHit();
  }
  if (playerTwo.health <= 0) {
    pOneAtt.style.visibility = 'hidden';
    pOneDef.style.visibility = 'hidden';
    pTwoAtt.style.visibility = 'hidden';
    pTwoDef.style.visibility = 'hidden';
    interval = setInterval(clawRender, 250);
    document.getElementById('congratulations').innerHTML = 'Player One wins!';
    gameOver();
  } else {
    interval = setInterval(clawRender, 250);
    pTwoTurn();
  }
}

function pOneDefHandler() {
  var randomHeal = 0;
  randomHeal = Math.floor(Math.random() * (playerOne.maxDef - playerOne.minDef + 1) + playerOne.minDef);
  playerOne.health = playerOne.health + randomHeal;
  document.getElementById('playerOneHP').setAttribute('value', playerOne.health);
  healSound();
  playerOneBool = true;
  interval = setInterval(healRender, 200);
  pTwoTurn();
}

function pTwoAttHandler() {
  var randomAttack = 0;
  playerOneBool = true;
  randomAttack = Math.floor(Math.random() * (playerTwo.maxAtt - playerTwo.minAtt + 1) + playerTwo.minAtt);
  score = score + randomAttack;
  playerOne.health = playerOne.health - randomAttack;
  document.getElementById('playerOneHP').setAttribute('value', playerOne.health);
  attackSound();
  if (randomAttack == playerTwo.maxAtt || randomAttack == (playerTwo.maxAtt - 1)) {
    massiveDamage();
  }
  if (randomAttack == playerTwo.minAtt || randomAttack == (playerTwo.minAtt + 1)) {
    lightHit();
  }
  if (playerOne.health <= 0) {
    pOneAtt.style.visibility = 'hidden';
    pOneDef.style.visibility = 'hidden';
    pTwoAtt.style.visibility = 'hidden';
    pTwoDef.style.visibility = 'hidden';
    interval = setInterval(clawRender, 250);
    document.getElementById('congratulations').innerHTML = 'Player Two wins!';
    gameOver();
  } else {
    interval = setInterval(clawRender, 250);
    pOneTurn();
  }
}

function pTwoDefHandler() {
  var randomHeal = 0;
  randomHeal = Math.floor(Math.random() * (playerTwo.maxDef - playerTwo.minDef + 1) + playerTwo.minDef);
  score = score - randomHeal;
  playerTwo.health = playerTwo.health + randomHeal;
  document.getElementById('playerTwoHP').setAttribute('value', playerTwo.health);
  healSound();
  playerOneBool = false;
  interval = setInterval(healRender, 200);
  pOneTurn();
}

//Event handler for audio toggle
document.getElementById('mute').addEventListener('click', function (e)
{
  e = e || window.event;
  audio.muted = !audio.muted;
  e.preventDefault();
}, false);

//Event Handler for leaderboard data and moving to leaderboard.html
function leaderboardHandler (event) {
  event.preventDefault();
  var user = event.target.submitUser.value.toUpperCase();
  new User(user, score);
  localStorage.setItem('leaderboard', JSON.stringify(leaderboard));
  window.location.href = 'leaderboard.html';
}

//Event Listeners for attacks and username submit
playerOneAtt.addEventListener('click', pOneAttHandler);
playerOneDef.addEventListener('click', pOneDefHandler);
playerTwoAtt.addEventListener('click', pTwoAttHandler);
playerTwoDef.addEventListener('click', pTwoDefHandler);
userForm.addEventListener('submit', leaderboardHandler);
