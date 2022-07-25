/* disable the cell of chessboard and remove the display of the hover action */
function disableBlock(element) {
  element.removeEventListener('click', clickBlock);
  element.classList.remove('hoverable');
}

/* enable the cell of chessboard can click and other style setting */
function resetBlock() {
  Object.entries(_blocks).forEach(([, element]) => {
    disableBlock(element);
    element.textContent = "";
    element.classList.remove('hoverable');
  });
}

/* check is player win or chessboard is full ? 
 * return 0 if win or full 
 * return 1 if others */
function checkStatus() {

  let current = Object.values(_blocks).indexOf(this);
  let value = this.textContent;

  let col = Math.trunc(current / chessBoardLength);
  let row = current % chessBoardLength;

  //check the col ( | )
  let same = 1;
  document.querySelectorAll('.col:nth-child(' + (col + 1) + ') > .blocks').forEach(node => same = (node.textContent != value) ? 0 : same);

  //check the row ( 一 )
  if (!same) {
    same = 1;
    document.querySelectorAll('.col > .blocks:nth-child(' + (row + 1) + ')').forEach(node => same = (node.textContent != value) ? 0 : same);
  }

  //check the positive direction diagonal ( \ )
  if (!same && (col == row)) {
    same = 1;
    document.querySelectorAll('.posDiagonal').forEach(node => same = (node.textContent != value) ? 0 : same);
  }

  //check the negative direction Diagonal ( / )
  if (!same && ((col + row + 1) == chessBoardLength)) {
    same = 1;
    document.querySelectorAll('.negDiagonal').forEach(node => same = (node.textContent != value) ? 0 : same);
  }

  if (same) {
    return winOrDeuce(1, players[player].name);
  }

  //full or not, if there is 0 empty means full
  if(!document.querySelectorAll('.blocks:empty').length){
    return winOrDeuce(0);
  }

  return 1;

}

/* if click the cell of  chessborad disable this cell and print the icon of player on it, and check is it wins or chessboard full ?*/
function clickBlock() {

  disableBlock(this);  
  this.textContent = players[player].name;

  if (checkStatus.call(this)) {
    player ^= 1;
    document.querySelector(":root").style.setProperty('--curPlayer', `"${players[player].name}"`);
  }

}