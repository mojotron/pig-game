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
  const rollEngine = function () {
    const x = document.querySelector('.dice-effect');
    x.classList.add('hidden');
    if (x.classList.contains('bounce-1')) {
      x.classList.remove('bounce-1');
      x.classList.add('bounce-2');
    } else {
      x.classList.remove('bounce-2');
      x.classList.add('bounce-1');
    }
    const roll = rollDice();
    diceDisplay.textContent = roll;
    x.classList.remove('hidden');
    rollEvaluate(roll);
  };

  const holdEngine = function () {
    score[`player${curPlayer}`] += curScore;
    curScore = 0;
    updatePlayerDom();
    if (score[`player${curPlayer}`] >= 100) {
      document.querySelector('.player-active h2').textContent = 'VICTORY';
      btnRoll.removeEventListener('click', rollEngine);
      btnRoll.removeEventListener('click', holdEngine);
      return;
    }
    diceDisplay.textContent = '';
    swapPlayer();
  };
  //TODO 1
  btnRoll.addEventListener('click', rollEngine);
  btnHold.addEventListener('click', holdEngine);

  const toggleRules = function () {
    rulesModal.classList.toggle('hidden');
    if (rulesTriangle.textContent === '▽') {
      rulesTriangle.textContent = '△';
    } else {
      rulesTriangle.textContent = '▽';
    }
  };
  btnNewGame.addEventListener('click', function () {
    document.querySelector(
      '.player-active h2'
    ).textContent = `Player ${curPlayer} Total`;
    score.player1 = 0;
    score.player2 = 0;
    curScore = 0;
    curPlayer = 1;
    displayScore('player', 1, 0);
    displayScore('player', 2, 0);
    displayScore('current', 1, 0);
    displayScore('current', 2, 0);
    document.querySelector('.dice-effect').classList.add('hidden');
    document.querySelector('.player-1').classList.add('player-active');
    document.querySelector('.player-2').classList.remove('player-active');
    //TODO 1
    btnRoll.addEventListener('click', rollEngine);
    btnHold.addEventListener('click', holdEngine);
  });

  btnRules.addEventListener('click', toggleRules);
  window.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && !rulesModal.classList.contains('hidden')) {
      toggleRules();
    }
  });
})();
