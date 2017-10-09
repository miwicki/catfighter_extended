'use strict';
var fightData = [];
var characterMenu = document.getElementById('roster');

localStorage.setItem('fightData', JSON.stringify(fightData));

characterMenu.addEventListener('click', characterHandler);

function characterHandler(event){
  if (fightData.length < 2) {
    fightData.push(event.target.alt);
  } else {
    localStorage.setItem('fightData', JSON.stringify(fightData));
    window.location.href = 'fight.html';
  }
}
