/* create cells of the chessboard*/
function createBlock() {
  let board = document.getElementById("chessboard");
  Array.from({ length: (chessBoardLength ** 2) }, (x, i) => {
    let button = document.createElement('button');
    button.className = 'blocks';
    board.append(button);
    //1d -> 2d structure
    _block2d[Math.trunc(i / chessBoardLength)][i % chessBoardLength] = _blocks[i];
  });
  document.querySelector('.blocks:last-of-type').classList.add('last');
}

/* enable the cell of chessboard can click and other style setting */
function resetBlock() {
  Array.from(_blocks).forEach(element => element.textContent = "");
}

function checkLine(element) {
  return element.every(node => node.textContent == players[player].name);
}

/* check is player win or chessboard is full ? 
 * return 0 if win or full 
 * return 1 if others */
function checkStatus(element) {
  let current = Object.values(_blocks).indexOf(element);
  let row = Math.trunc(current / chessBoardLength);
  let col = current % chessBoardLength;

  let colLine = Array.from({ length: chessBoardLength }, (x, i) => _block2d[i][col]);           //check col               ( | )
  let rowLine = _block2d[row];                                                                  //check row               ( 一 )
  let posDiagonalLine = (col == row) 
    ? Array.from({ length: chessBoardLength }, (x, i) => _block2d[i][i])
    : [''];                                                                                     //check positive Diagonal ( \ )
  let negDiagonalLine = ((col + row + 1) == chessBoardLength)
    ? Array.from({ length: chessBoardLength }, (x, i) => _block2d[i][chessBoardLength - 1 - i]) 
    : [''];                                                                                     //check negative Diagonal ( / )
  if (checkLine(colLine) || checkLine(rowLine) || checkLine(posDiagonalLine) || checkLine(negDiagonalLine)) {
    return winOrDeuce(1, players[player].name);
  }

  //full or not, if there is 0 empty means full
  if (!document.querySelectorAll('.blocks:empty').length) {
    return winOrDeuce(0);
  }

  return 1;

}

/* if click the cell of  chessborad disable this cell and print the icon of player on it, and check is it wins or chessboard full ?*/
function clickBlock(element) {
  element.textContent = players[player].name;
  if (checkStatus(element)) {
    player ^= 1;
    rootElement.style.setProperty('--curPlayer', `"${players[player].name}"`);
  }

}