'use strict';

var leaderboard = [];
var standings = ['1st', '2nd', '3rd', '4th', '5th', '6th'];
var scoreTable = document.getElementById('scoreTable');

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
console.log(leaderboard);
leaderboard.sort(function(a, b) {
  return b.score - a.score;
});
console.log(leaderboard);

function drawTable () {
  var trEl = document.createElement('tr');
  var tdEl = document.createElement('td');
  for(var i = 0; i < standings.length; i++){
    trEl = document.createElement('tr');
    tdEl = document.createElement('td');
    tdEl.textContent = standings[i];
    trEl.appendChild(tdEl);
    tdEl = document.createElement('td');
    tdEl.textContent = leaderboard[i].username;
    trEl.appendChild(tdEl);
    tdEl = document.createElement('td');
    tdEl.textContent = leaderboard[i].score;
    trEl.appendChild(tdEl);
    scoreTable.appendChild(trEl);
  }
}
drawTable();
