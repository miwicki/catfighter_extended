'use strict';

//Variables in use
var fightData = [];
var characterMenu = document.getElementById('roster');
var message = document.getElementById('user-prompt');
var audio = document.getElementById('theme');

//Setting local storage
localStorage.setItem('fightData', JSON.stringify(fightData));

//Event handler for audio toggle
document.getElementById('mute').addEventListener('click', function (e)
{
  e = e || window.event;
  audio.muted = !audio.muted;
  e.preventDefault();
}, false);

//Event handler for character selection
function characterHandler(event){
  if (event.target.id === 'roster' || event.target.id === 'character-menu' || event.target.id === 'list' || event.target.id === 'secret-menu' || event.target.id === 'secret-list') {
    return alert('Please click on a character.');
  }
  if (fightData.length < 1) {
    fightData.push(event.target.alt);
    console.log(event.target.alt);
    message.textContent = 'PLAYER 2 SELECT YOUR CHARACTER';
  } else {
    fightData.push(event.target.alt);
    localStorage.setItem('fightData', JSON.stringify(fightData));
    window.location.href = 'fight.html';
  }
}

//Event listener for character selection
characterMenu.addEventListener('click', characterHandler);
