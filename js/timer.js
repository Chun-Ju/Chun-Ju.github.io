let timerId = 0;

function startTimer() {

  let count = 0;
  timerId = window.requestAnimationFrame(animation);

  function animation(t) {
    count++;
    /* requestAnimationFrame return per 1/60 sec, but the hw requires 1/10 sec */
    if (count % 6 == 0) {
      _players[player].textContent = (--players[player].time / 10).toFixed(1);
      /*  check whether time is out or not. */
      if (players[player].time == 0) {
        setTimeout(() => { winOrDeuce(1, players[player ^ 1].name) }, 0);
        return;
      }
    }
    timerId = window.requestAnimationFrame(animation);
  }

}

function cancelTimer() {
  gameEnd = 1;
  /* to avoid double cancel the same timer */
  if (timerId != 0) {
    window.cancelAnimationFrame(timerId);
    timerId = 0;
  }
}