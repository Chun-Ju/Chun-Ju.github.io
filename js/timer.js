let timeLimit = 60000;//unit: ms
let precision = 1;//display [presicion] digits after the decimal point

let timerId = 0;
let timeBase = 10 ** (3 - precision);//unit: ms
let sec = 1000;//unit: ms

function startTimer() {

  let start = null;
  timerId = window.requestAnimationFrame(animation);

  function animation(t) {

    start = start ?? t;

    let timeInterval = t - start;
    if (timeInterval > timeBase) {

      players[player].time = Math.max(players[player].time - timeInterval, 0);
      let timeTmp = (players[player].time / sec).toFixed(precision);
      _players[player].textContent = timeTmp;
 
      /*  check whether time is out or not. */
      if (timeTmp == 0) {
        players[player].time = 0;
        setTimeout(() => { winOrDeuce(1, players[player ^ 1].name) }, 0);
        return;
      }
      start = t;
    
    }

    timerId = window.requestAnimationFrame(animation);
  }

}

function cancelTimer() {

  rootElement.dataset.state = gameEnd = 1;  
  /* to avoid double cancel the same timer */
  if (timerId != 0) {
    window.cancelAnimationFrame(timerId);
    timerId = 0;
  }

}