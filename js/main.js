'use strict';
(function () {
  //DOM Selectors
  const btnNewGame = document.querySelector('.btn-new-game');
  const btnRoll = document.querySelector('.btn-roll');
  const btnHold = document.querySelector('.btn-hold');
  const btnRules = document.querySelector('.btn-rules');
  const diceDisplay = document.querySelector('#dice-display');
  const rulesModal = document.querySelector('.rules-modal');
  const rulesTriangle = document.querySelector('.triangle');
  const player1El = document.querySelector('.player-1');
  const player2El = document.querySelector('.player-2');
  const bounce = document.querySelector('.dice-effect');
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
    updatePlayerDom(curPlayer);
    swapPlayer();
  };

  const displayScore = function (selector, player, score) {
    document.querySelector(`#${selector}-${player}-score`).textContent = score;
  };

  const updatePlayerDom = function (player) {
    displayScore('player', player, score[`player${player}`]);
    displayScore('current', player, curScore);
  };
  //Main game logic
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
      updatePlayerDom(curPlayer);
      switchPlayer();
      lostRoundUpdate();
    } else if (roll === 19) {
      const tempScore = curScore;
      curScore = 0;
      switchPlayer();
      score[`player${curPlayer}`] -= tempScore;
      updatePlayerDom(curPlayer);
      switchPlayer();
      score[`player${curPlayer}`] += tempScore;
      updatePlayerDom(curPlayer);
    } else if (roll === 20) {
      curScore < roll ? (curScore += roll * 2) : (curScore *= 2);
      displayScore('current', curPlayer, curScore);
    } else {
      curScore += roll;
      updatePlayerDom(curPlayer);
    }
  };
  //Swapping classes to apply bounce effect on every roll
  const swapBounceClasses = function () {
    if (bounce.classList.contains('bounce-1')) {
      bounce.classList.remove('bounce-1');
      bounce.classList.add('bounce-2');
    } else {
      bounce.classList.remove('bounce-2');
      bounce.classList.add('bounce-1');
    }
  };
  //Event handlers
  const rollEngine = function () {
    const roll = rollDice();
    diceDisplay.textContent = roll;
    bounce.classList.remove('hidden');
    swapBounceClasses();
    rollEvaluate(roll);
  };

  const holdEngine = function () {
    score[`player${curPlayer}`] += curScore;
    curScore = 0;
    updatePlayerDom(curPlayer);
    if (score[`player${curPlayer}`] >= 100) {
      document.querySelector('.player-active h2').textContent = 'VICTORY';
      btnRoll.removeEventListener('click', rollEngine);
      btnRoll.removeEventListener('click', holdEngine);
      return;
    }
    diceDisplay.textContent = '';
    bounce.classList.add('hidden');
    swapPlayer();
  };

  const toggleRules = function () {
    rulesModal.classList.toggle('hidden');
    if (rulesTriangle.textContent === '▽') {
      rulesTriangle.textContent = '△';
    } else {
      rulesTriangle.textContent = '▽';
    }
  };

  const closeModalWithEscape = function (event) {
    if (event.key === 'Escape' && !rulesModal.classList.contains('hidden')) {
      toggleRules();
    }
  };
  //Initialize new game, setting variables to start position
  const initNewGame = function () {
    score.player1 = score.player2 = curScore = 0;
    curPlayer = 1;
    updatePlayerDom(1);
    updatePlayerDom(2);
    player1El.classList.add('player-active');
    player2El.classList.remove('player-active');
    bounce.classList.add('hidden');
    btnRoll.addEventListener('click', rollEngine);
    btnHold.addEventListener('click', holdEngine);
    document.querySelector(
      '.player-active h2'
    ).textContent = `Player ${curPlayer} Total`;
  };
  //START GAME on page load
  initNewGame();
  //Event listeners
  btnNewGame.addEventListener('click', initNewGame);
  btnRules.addEventListener('click', toggleRules);
  window.addEventListener('keydown', closeModalWithEscape);
})();
