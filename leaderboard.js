'use strict';

var leaderboard = [];

if (localStorage.getItem('leaderboard') !== null) {
  console.log('Data found');
  leaderboard = JSON.parse(localStorage.getItem('leaderboard'));
} else {
  new User('Will','9999');
  new User('Kat','700');
}
console.log(leaderboard);
leaderboard.sort(function(a, b) {
  return b.score - a.score;
});
console.log(leaderboard);
