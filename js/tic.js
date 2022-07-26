let chessBoardLength = 3;

let players;
let player = 0;
//determine game is ending or not
let gameEnd = 1;

function Player(name) {
  this.name = name;
  this.time = timeLimit;
}

let _start = document.getElementById('start');
let _restart = document.getElementById('restart');
let _blocks = document.getElementsByClassName('blocks');
let _players = document.getElementsByClassName("players");
let rootElement = document.documentElement;

/* after first time onload, it need to set sth */
function initial() {

  createBlock();
  resetBlock();

  players = [new Player("O"), new Player("X")];
  Array.from(_players).forEach(element => element.textContent = (timeLimit / sec).toFixed(precision));

  _start.addEventListener("click", start);
  _start.disabled = false;

  _restart.addEventListener("click", reset);
  _restart.disabled = true;

}

/* enable to click and hover effect, finally start the timer */
function start() {
  gameEnd = 0;
  document.getElementById("chessboard").onclick = function(event) {
    if(!event.target.textContent && !gameEnd){
      clickBlock(event.target);
    }
  };

  Array.from(_blocks).forEach(element => element.classList.add('hoverable'));

  [_start.disabled, _restart.disabled] = [_restart.disabled, _start.disabled];
  //start the timer
  startTimer();
}

/* stop the timer and reset the thing display */
function reset() {
  //stop the timer
  cancelTimer();
  Array.from(_players).forEach(element => element.textContent = (timeLimit / sec).toFixed(precision));

  resetBlock();

  player = 0;
  players = [new Player("O"), new Player("X")];

  rootElement.style.setProperty('--curPlayer', `"${players[player].name}"`);

  [_start.disabled, _restart.disabled] = [_restart.disabled, _start.disabled];

}

/* stop the timer and alert the winner of the game */
function winOrDeuce(win, winner) {
  //stop the timer
  cancelTimer();

  Array.from(_blocks).forEach(element => element.classList.remove('hoverable'));
  (win) ? alert(`贏家是${winner}`) : alert("平手");

  return 0;

}

initial();