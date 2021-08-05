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
  const rollDice = () => Math.trunc(Math.random() * 20) + 1;
  const switchPlayer = () => (currentPlayer = currentPlayer === 1 ? 2 : 1);
  const swapPlayer = function () {
    switchPlayer();
    document.querySelector('.player-1').classList.toggle('player-active');
    document.querySelector('.player-2').classList.toggle('player-active');
  };

  const displayScore = function (selector, player, score) {
    document.querySelector(`#${selector}-${player}-score`).textContent = score;
  };
  const renderNewDisplay = function () {
    displayScore('player', currentPlayer, score[`player${currentPlayer}`]);
    displayScore('current', currentPlayer, currentScore);
  };
  const rollEvaluate = function (roll) {
    if (roll === 1) {
      if (score[`player${currentPlayer}`] > 0)
        score[`player${currentPlayer}`] = 0;
      currentScore = 0;
      renderNewDisplay();
      swapPlayer();
    } else if (roll > 1 && roll < 4) {
      currentScore = 0;
      renderNewDisplay();
      swapPlayer();
    } else if (roll === 5) {
      switchPlayer();
      const temp = currentScore <= 5 ? roll : currentScore;
      score[`player${currentPlayer}`] += temp;
      displayScore('current', currentPlayer, score[`player${currentPlayer}`]);
      currentScore = 0;
      switchPlayer();
      renderNewDisplay();
    } else if (roll === 19) {
      //take current score form enemy if enemy does not have enough put him in -
      switchPlayer();
      const temp = currentScore <= roll ? roll : currentScore;
      score[`player${currentPlayer}`] -= temp;
      displayScore('player', currentPlayer, score[`player${currentPlayer}`]);
      switchPlayer();
      currentScore += roll;
      displayScore('current', currentPlayer, currentScore);
    } else if (roll === 20) {
      if (currentScore < 10) {
        currentScore += 20;
      } else {
        currentScore *= 2;
      }

      displayScore('current', currentPlayer, currentScore);
    } else {
      currentScore += roll;
      displayScore('current', currentPlayer, currentScore);
    }
  };
  //Event handlers
  btnRoll.addEventListener('click', function () {
    const roll = rollDice();
    diceDisplay.textContent = roll;
    rollEvaluate(roll);
  });

  btnHold.addEventListener('click', function () {
    score[`player${currentPlayer}`] += currentScore;
    displayScore('player', currentPlayer, score[`player${currentPlayer}`]);
    if (score[`player${currentPlayer}`] >= 500) {
      document.querySelector('.player-active h2').textContent = 'VICTORY';
      return;
    }
    currentScore = 0;
    swapPlayer();
  });

  btnNewGame.addEventListener('click', function () {});
})();
