/* create cells of the chessboard*/
function createBlock() {
  const board = document.getElementById("chessboard");
  Array.from({ length: (BOARD_LENGTH ** 2) }, (x, i) => {
    let button = document.createElement('button');
    button.className = 'blocks';
    board.append(button);
    //1d -> 2d structure
    _block2d[Math.trunc(i / BOARD_LENGTH)][i % BOARD_LENGTH] = button;
  });
  document.querySelector('.blocks:last-of-type').classList.add('last');
}

/* enable the cell of chessboard can click and other style setting */
function resetBlock() {
  _block2d.flat().forEach(element => element.textContent = "");
}

function checkLine(element) {
  return element.every(node => node.textContent == players[player].name);
}

/* check is player win or chessboard is full ? 
 * return 0 if win or full 
 * return 1 if others */
function checkStatus(element) {
  let current = _block2d.flat().indexOf(element);
  let row = Math.trunc(current / BOARD_LENGTH);
  let col = current % BOARD_LENGTH;

  const colLine = Array.from({ length: BOARD_LENGTH }, (x, i) => _block2d[i][col]);    //check col               ( | )
  const rowLine = _block2d[row];                                                       //check row               ( 一 )
  const posDiagonalLine = (col == row)                                                 //check positive Diagonal ( \ )
    ? Array.from({ length: BOARD_LENGTH }, (x, i) => _block2d[i][i])
    : [''];
  const negDiagonalLine = ((col + row + 1) == BOARD_LENGTH)                            //check negative Diagonal ( / )
    ? Array.from({ length: BOARD_LENGTH }, (x, i) => _block2d[i][BOARD_LENGTH - 1 - i])
    : [''];
  if (checkLine(colLine) || checkLine(rowLine) || checkLine(posDiagonalLine) || checkLine(negDiagonalLine)) {
    return winOrDeuce(1, players[player].name);
  }

  //full or not, if there is 0 empty means full
  return (!document.querySelectorAll('.blocks:empty').length) ? winOrDeuce(0) : 1;
}

/* if click the cell of  chessborad disable this cell and print the icon of player on it, and check is it wins or chessboard full ?*/
function clickBlock(element) {
  element.textContent = players[player].name;
  if (checkStatus(element)) {
    player ^= 1;
    _ROOT.style.setProperty('--curPlayer', `"${players[player].name}"`);
  }

}