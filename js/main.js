'use strict';

const btnNewGame = document.querySelector('.btn-new-game');
const btnRoll = document.querySelector('.btn-roll');
const btnHold = document.querySelector('.btn-hold');
const diceDisplay = document.querySelector('#dice-display');

const player1 = document.querySelector('.player-1');
const player2 = document.querySelector('.player-2');

const player1total = document.querySelector('#player-1-score');
const player2total = document.querySelector('#player-2-score');

const player1current = document.querySelector('#current-1-score');
const player2current = document.querySelector('#current-2-score');

let player1Score = 0;
let player2Score = 0;
let currentScore = 0;
let currentPlayer = 1;

const rollDice = () => Math.trunc(Math.random() * 20) + 1;

const swapPlayer = () => (currentPlayer = currentPlayer === 1 ? 2 : 1);

const swapPlayerEffect = function () {
  player1.classList.toggle('player-active');
  player2.classList.toggle('player-active');
};

btnRoll.addEventListener('click', function () {
  const roll = rollDice();
  currentScore += roll;
  document.querySelector(`#current-${currentPlayer}-score`).textContent =
    currentScore;
  diceDisplay.textContent = roll;
});
