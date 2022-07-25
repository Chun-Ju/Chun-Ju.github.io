/* create cells of the chessboard*/
function createBlock() {
  Array.from({ length: chessBoardLength }, (x, i) => {
    let div = document.createElement('div');
    div.className = "col";
    document.getElementById("chessboard").append(div);
    Array.from({ length: chessBoardLength }, (y, j) => {
      let button = document.createElement('button');
      button.className = "blocks";
      /* add the class to item on the diagonal (positive direction: \ ) (negative direction: / ) */
      if (chessBoardLength % 2) {
        if (i == j) {
          button.classList.add('posDiagonal');
        }
        if ((i + j + 1) == chessBoardLength) {
          button.classList.add('negDiagonal');
        }
      }
      document.getElementsByClassName("col")[i].append(button);
    });
  });
}

/* enable the cell of chessboard can click and other style setting */
function resetBlock() {
  Array.from(_blocks).forEach((element) => {
    element.classList.remove('hoverable');
    element.textContent = "";
  });
}

/* check is player win or chessboard is full ? 
 * return 0 if win or full 
 * return 1 if others */
function checkStatus(element) {

  let current = Object.values(_blocks).indexOf(element);
  let value = element.textContent;

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
  if (!document.querySelectorAll('.blocks:empty').length) {
    return winOrDeuce(0);
  }

  return 1;

}

/* if click the cell of  chessborad disable this cell and print the icon of player on it, and check is it wins or chessboard full ?*/
function clickBlock(element) {

  element.classList.remove('hoverable');
  element.textContent = players[player].name;

  if (checkStatus(element)) {
    player ^= 1;
    document.querySelector(":root").style.setProperty('--curPlayer', `"${players[player].name}"`);
  }

}