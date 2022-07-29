const TIME_LIMIT = 60000;//unit: ms
const PRECISION = 1;//display [presicion] digits after the decimal point

const TIME_BASE = 10 ** (3 - PRECISION);//unit: ms
const SEC = 1000;//unit: ms
let timerId = 0;

function startTimer() {
  let start = null;
  timerId = window.requestAnimationFrame(animation);

  function animation(t) {
    start = start ?? t;
    const timeInterval = t - start;
    if (timeInterval > TIME_BASE) {
      players[player].time = Math.max(players[player].time - timeInterval, 0);
      let timeTmp = (players[player].time / SEC).toFixed(PRECISION);
      _PLAYERS[player].textContent = timeTmp;
      /*  check whether time is out or not. */
      if (timeTmp == 0) {
        players[player].time = 0;
        setTimeout(() => winOrDeuce(1, players[player ^ 1].name), 0);
        return;
      }

      start = t;
    }

    timerId = window.requestAnimationFrame(animation);
  }

}

function cancelTimer() {
  _ROOT.dataset.state = gameEnd = 1;  
  /* to avoid double cancel the same timer */
  if (timerId != 0) {
    window.cancelAnimationFrame(timerId);
    timerId = 0;
  }

}