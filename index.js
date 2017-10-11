'use strict';

//Variables in use
var fightData = [];
var characterMenu = document.getElementById('roster');
var message = document.getElementById('user-prompt');

//Setting local storage
localStorage.setItem('fightData', JSON.stringify(fightData));

//Event handler for character selection
function characterHandler(event){
  if (fightData.length < 1) {
    fightData.push(event.target.alt);
    message.textContent = 'PLAYER 2 SELECT YOUR CHARACTER';
  } else {
    fightData.push(event.target.alt);
    localStorage.setItem('fightData', JSON.stringify(fightData));
    window.location.href = 'fight.html';
  }
}

//Event listener for character selection
characterMenu.addEventListener('click', characterHandler);
