'use strict';
if (localStorage.getItem('fightData') !== null){
  console.log('Data found');
  localStorage.clear();
} else {
  console.log('Data not found');
  var fightData = [];
  var characterMenu = document.getElementById('roster');
  characterMenu.addEventListener('click', characterHandler);
  function characterHandler (){
    fightData.push(event.target);
    localStorage.setItem(name, fightData);
  }
}
