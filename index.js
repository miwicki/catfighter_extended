'use strict';
var fightData = [];
var characterMenu = document.getElementById('roster');
var message = document.getElementById('user-prompt');

localStorage.setItem('fightData', JSON.stringify(fightData));

characterMenu.addEventListener('click', characterHandler);

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
