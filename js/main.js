'use strict';
(function () {
  //DOM Selectors
  const btnNewGame = document.querySelector('.btn-new-game');
  const btnRoll = document.querySelector('.btn-roll');
  const btnHold = document.querySelector('.btn-hold');
  const diceDisplay = document.querySelector('#dice-display');
  //Game State
  const score = { player1: 0, player2: 0 };
  let currentScore = 0;
  let currentPlayer = 1;
  //Helper functions
  const rollDice = () => Math.trunc(Math.random() * 6) + 1;

  const rollEvaluate = function (roll) {
    if (roll === 1) {
      //set player score to 0
      //current score to 0
      //switch player
    } else if (roll > 1 && roll < 5) {
      //current score to 0
      //switch player
    } else if (roll === 5) {
      //give all current score to enemy
      //switch player
    } else if (roll === 19) {
      //take current score form enemy if enemy does not have enough put him in -
    } else if (roll === 20) {
      //update current score * 2 (NOT ROLL)
    } else {
      //update current score
    }
  };

  const swapPlayer = function () {
    currentPlayer = currentPlayer === 1 ? 2 : 1;
    document.querySelector('.player-1').classList.toggle('player-active');
    document.querySelector('.player-2').classList.toggle('player-active');
  };

  const displayScore = function (selector, player, score) {
    document.querySelector(`#${selector}-${player}-score`).textContent = score;
  };
  //Event handlers
  btnRoll.addEventListener('click', function () {
    const roll = rollDice();
    diceDisplay.textContent = roll;
    if (roll === 1) {
      currentScore = 0;
      displayScore('current', currentPlayer, currentScore);
      swapPlayer();
    } else {
      currentScore += roll;
      displayScore('current', currentPlayer, currentScore);
    }
  });

  btnHold.addEventListener('click', function () {
    score[`player${currentPlayer}`] += currentScore;
    displayScore('player', currentPlayer, score[`player${currentPlayer}`]);
    if (score[`player${currentPlayer}`] >= 20) {
      document.querySelector('.player-active h2').textContent = 'VICTORY';
      return;
    }
    currentScore = 0;
    swapPlayer();
  });
})();
