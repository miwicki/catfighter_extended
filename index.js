'use strict';
var fightData = [];
var characterMenu = document.getElementById('roster');
if (localStorage.getItem('fightData') !== null){
  console.log('Local Storage NOT Cleared');
  localStorage.clear();
} else {
  console.log('Local Storage Cleared');
  characterMenu.addEventListener('click', characterHandler);
  function characterHandler(event){
    fightData.push(event.target.alt);
    localStorage.setItem('fightData', JSON.stringify(fightData));
  }
}
