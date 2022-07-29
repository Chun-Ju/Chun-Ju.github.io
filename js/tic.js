let chessBoardLength = 3;

let players;
let player = 0;
class Player {
  constructor(name) {
    this.name = name;
    this.time = timeLimit;
  }
}

let _start = document.getElementById('start');
let _restart = document.getElementById('restart');
let _blocks = document.getElementsByClassName('blocks');
let _block2d = Array.from(Array(chessBoardLength), () => new Array(chessBoardLength));
let _players = document.getElementsByClassName("players");
let rootElement = document.documentElement;

let gameEnd = rootElement.dataset.state = 1;//determine game is ending or not

/* after first time onload, it need to set sth */
function initial() {
  rootElement.style.setProperty('--chessBoardSize', `${chessBoardLength}`);
  createBlock();
  resetBlock();

  players = [new Player("O"), new Player("X")];
  Array.from(_players).forEach(element => element.textContent = (timeLimit / sec).toFixed(precision));

  _start.addEventListener("click", start);
  _start.disabled = false;

  _restart.addEventListener("click", reset);
  _restart.disabled = true;

  document.getElementById("chessboard").onclick = function (event) {
    if (!event.target.textContent && !gameEnd) {
      clickBlock(event.target);
    }
  };
}

/* enable to click and hover effect, finally start the timer */
function start() {
  rootElement.dataset.state = gameEnd = 0;
  [_start.disabled, _restart.disabled] = [_restart.disabled, _start.disabled];
  startTimer();//start the timer
}

/* stop the timer and reset the thing display */
function reset() {
  cancelTimer();//stop the timer
  Array.from(_players).forEach(element => element.textContent = (timeLimit / sec).toFixed(precision));
  resetBlock();

  player = 0;
  players = [new Player("O"), new Player("X")];
  rootElement.style.setProperty('--curPlayer', `"${players[player].name}"`);

  [_start.disabled, _restart.disabled] = [_restart.disabled, _start.disabled];

}

/* stop the timer and alert the winner of the game */
function winOrDeuce(win, winner) {
  cancelTimer();//stop the timer
  (win) ? alert(`贏家是${winner}`) : alert("平手");
  return 0;
}

initial();