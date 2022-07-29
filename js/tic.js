const BOARD_LENGTH = 3;

const _START = document.getElementById('start');
const _RESTART = document.getElementById('restart');
const _PLAYERS = document.getElementsByClassName("players");
const _ROOT = document.documentElement;

let players;
let player = 0;
class Player {
  constructor(name) {
    this.name = name;
    this.time = TIME_LIMIT;
  }
}

let _block2d = Array.from(Array(BOARD_LENGTH), () => new Array(BOARD_LENGTH));
let gameEnd = _ROOT.dataset.state = 1;//determine game is ending or not

/* after first time onload, it need to set sth */
function initial() {
  _ROOT.style.setProperty('--chessBoardSize', `${BOARD_LENGTH}`);
  createBlock();
  resetBlock();

  players = [new Player("O"), new Player("X")];
  Array.from(_PLAYERS).forEach(element => element.textContent = (TIME_LIMIT / SEC).toFixed(PRECISION));

  _START.addEventListener("click", start);
  _START.disabled = false;

  _RESTART.addEventListener("click", reset);
  _RESTART.disabled = true;

  document.getElementById("chessboard").onclick = function (event) {
    if (!event.target.textContent && !gameEnd) {
      clickBlock(event.target);
    }
  };
}

/* enable to click and hover effect, finally start the timer */
function start() {
  _ROOT.dataset.state = gameEnd = 0;
  [_START.disabled, _RESTART.disabled] = [_RESTART.disabled, _START.disabled];
  startTimer();//start the timer
}

/* stop the timer and reset the thing display */
function reset() {
  cancelTimer();//stop the timer
  Array.from(_PLAYERS).forEach(element => element.textContent = (TIME_LIMIT / SEC).toFixed(PRECISION));
  resetBlock();

  player = 0;
  players = [new Player("O"), new Player("X")];
  _ROOT.style.setProperty('--curPlayer', `"${players[player].name}"`);

  [_START.disabled, _RESTART.disabled] = [_RESTART.disabled, _START.disabled];

}

/* stop the timer and alert the winner of the game */
function winOrDeuce(win, winner) {
  cancelTimer();//stop the timer
  (win) ? alert(`贏家是${winner}`) : alert("平手");
  return 0;
}

initial();