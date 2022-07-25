/* disable the cell of chessboard and remove the display of the hover action */
function disableBlock() {
  this.removeEventListener('click', clickBlock);
  this.classList.remove('hoverable');
  this.style.cursor = "default";
}

/* enable the cell of chessboard can click and other style setting */
function resetBlock() {
  Object.entries(_blocks).forEach(([, element]) => {
    disableBlock.call(element);
    element.textContent = "";
    element.classList.remove('hoverable');
  });
}

/* if click the cell of  chessborad disable this cell and print the icon of player on it, and check is it wins or chessboard full ?*/
function clickBlock() {

  disableBlock.call(this);  
  this.textContent = players[player].name;

  //check the status
  player ^= 1;
  document.querySelector(":root").style.setProperty('--curPlayer', `"${players[player].name}"`);

}