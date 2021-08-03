'use strict';

const btnNewGame = document.querySelector('.btn-new-game');
const btnRoll = document.querySelector('.btn-roll');
const btnHold = document.querySelector('.btn-hold');
const diceDisplay = document.querySelector('#dice-display');

let player1Score = 0;
let player2Score = 0;
let currentScore = 0;
let currentPlayer = 1;

const rollDice = () => Math.trunc(Math.random() * 6) + 1;

const swapPlayer = () => (currentPlayer = currentPlayer === 1 ? 2 : 1);

const displayScore = function (selector, player, score) {
  document.querySelector(`#${selector}-${player}-score`).textContent = score;
};

const swapPlayerEffect = function () {
  document.querySelector('.player-1').classList.toggle('player-active');
  document.querySelector('.player-2').classList.toggle('player-active');
};

btnRoll.addEventListener('click', function () {
  const roll = rollDice();
  diceDisplay.textContent = roll;
  if (roll === 1) {
    currentScore = 0;
    displayScore('current', currentPlayer, currentScore);
    swapPlayer();
    swapPlayerEffect();
  } else {
    currentScore += roll;
    displayScore('current', currentPlayer, currentScore);
  }
});

btnHold.addEventListener('click', function () {
  if (currentPlayer === 1) {
    player1Score += currentScore;
    displayScore('player', currentPlayer, player1Score);
  } else {
    player2Score += currentScore;
    displayScore('player', currentPlayer, player2Score);
  }
  currentScore = 0;
  swapPlayer();
  swapPlayerEffect();
});
