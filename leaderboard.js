'use strict';

var leaderboard = [];

if (localStorage.getItem('leaderboard') !== null) {
  console.log('Data found');
  leaderboard = JSON.parse(localStorage.getItem('leaderboard'));
}
