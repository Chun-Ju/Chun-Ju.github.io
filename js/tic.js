let chessBoardLength = 3;

let players;
let player = 0;

function Player(name) {
  this.name = name;
  this.time = 600;
}

let _start = document.getElementById('start');
let _restart = document.getElementById('restart');
let _blocks = document.getElementsByClassName('blocks');
let _players = document.getElementsByClassName("players");

/* after first time onload, it need to set sth */
function initial() {

  resetBlock();

  players = [new Player("O"), new Player("X")];
  Object.entries(_players).forEach(([, element]) => element.textContent = (60.0).toFixed(1));

  _start.addEventListener("click", start);
  _start.disabled = false;

  _restart.addEventListener("click", reset);
  _restart.disabled = true;

}

/* enable to click and hover effect, finally start the timer */
function start() {

  Object.entries(_blocks).forEach(([, element]) => {
    element.addEventListener("click", clickBlock);
    element.style.cursor = "pointer";
    element.textContent = "";
    element.classList.add('hoverable');
  });

  [_start.disabled, _restart.disabled] = [_restart.disabled, _start.disabled];
}

/* stop the timer and reset the thing display */
function reset() {

  resetBlock();

  player = 0;
  players = [new Player("O"), new Player("X")];

  document.querySelector(":root").style.setProperty('--curPlayer', `"${players[player].name}"`);

  [_start.disabled, _restart.disabled] = [_restart.disabled, _start.disabled];

}

/* stop the timer and alert the winner of the game */
function winOrDeuce(win, winner) {

  (win) ? alert(`贏家是${winner}`) : alert("平手");
  Object.entries(_blocks).forEach(([, element]) => disableBlock.call(element));

  return 0;

}

initial();