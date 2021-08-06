'use strict';
(function () {
  //DOM Selectors
  const btnNewGame = document.querySelector('.btn-new-game');
  const btnRoll = document.querySelector('.btn-roll');
  const btnHold = document.querySelector('.btn-hold');
  const diceDisplay = document.querySelector('#dice-display');
  //Game State
  const score = { player1: 0, player2: 0 };
  let curScore = 0;
  let curPlayer = 1;
  //Helper functions
  const rollDice = () => Math.trunc(Math.random() * 20) + 1;

  const switchPlayer = () => (curPlayer = curPlayer === 1 ? 2 : 1);

  const swapPlayer = function () {
    switchPlayer();
    document.querySelector('.player-1').classList.toggle('player-active');
    document.querySelector('.player-2').classList.toggle('player-active');
  };

  const lostRoundUpdate = function () {
    curScore = 0;
    updatePlayerDom();
    swapPlayer();
  };

  const displayScore = function (selector, player, score) {
    document.querySelector(`#${selector}-${player}-score`).textContent = score;
  };

  const updatePlayerDom = function () {
    displayScore('player', curPlayer, score[`player${curPlayer}`]);
    displayScore('current', curPlayer, curScore);
  };

  const rollEvaluate = function (roll) {
    if (roll === 1) {
      if (score[`player${curPlayer}`] > 0) score[`player${curPlayer}`] = 0;
      lostRoundUpdate();
    } else if (roll === 2) {
      lostRoundUpdate();
    } else if (roll === 3) {
      switchPlayer();
      score[`player${curPlayer}`] += curScore <= roll ? roll : curScore;
      curScore = 0;
      updatePlayerDom();
      switchPlayer();
      lostRoundUpdate();
    } else if (roll === 19) {
      const tempScore = curScore <= roll ? roll : curScore;
      curScore = 0;
      switchPlayer();
      score[`player${curPlayer}`] -= tempScore;
      updatePlayerDom();
      switchPlayer();
      score[`player${curPlayer}`] += tempScore;
      updatePlayerDom();
    } else if (roll === 20) {
      curScore < roll ? (curScore += roll * 2) : (curScore *= 2);
      displayScore('current', curPlayer, curScore);
    } else {
      curScore += roll;
      updatePlayerDom();
    }
  };
  //Event handlers
  btnRoll.addEventListener('click', function () {
    const roll = rollDice();
    diceDisplay.textContent = roll;
    rollEvaluate(roll);
  });

  btnHold.addEventListener('click', function () {
    score[`player${curPlayer}`] += curScore;
    curScore = 0;
    updatePlayerDom();
    if (score[`player${curPlayer}`] >= 100) {
      document.querySelector('.player-active h2').textContent = 'VICTORY';
      return;
    }
    diceDisplay.textContent = '';
    swapPlayer();
  });

  btnNewGame.addEventListener('click', function () {});

  //TODO
  //dice effect and display
  //reset button and logic
  //rules or msg system
  //victory msg
})();
