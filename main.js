const emptyBoxes = document.querySelectorAll(".box-cell");
const gameBoard = document.querySelector('.grid-container');
const player1Class = 'player-1';
const player2Class = 'player-2';
const player1Score = document.querySelector('.player-1-score')
const player2Score = document.querySelector('.player-2-score')
const endGameMessage = document.querySelector('.end-game')
const win = document.querySelector('.win-message')
const reset = document.querySelector('.restart-button')
let player2Turn;
let player1Turn;
const winCondition = [
  [0, 1, 2], 
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6]
]

// 1.Create click event on each box ( once: true )
// 2.Create and add to the click event a function that will control other functions like : adding of the icon, swap player turns, check if winP1/draw/winP2, remove function, score function.
// 3.Create add incon function.
// 4.Create swap player turns.
// 5.Create classList.add for hover effect based on player turn.
// 6.Create array with possible win combination for the check win.
// 7.Create check win condition function.
// 8.Create keep score function based on win function (if condition met, add 1 point for the player)
// 9.Create remove random icon from the board based on win function, that will remove one icon from the losing player. 
// 10.Create Reset button function.

const clickControl = (event) => {
  const box = event.target; 
  const addCurrentClass = player2Turn ? player2Class : player1Class;
  addIcon(box, addCurrentClass);
  swapPlayer();
  hoverClass();
  if ( checkWin(addCurrentClass)) {
    keepScore(player2Turn) 
    endGame(player2Turn) 
 }
}

const swapPlayer = () => {
  player2Turn = !player2Turn;
}

const addIcon = (box, addCurrentClass) => {
  box.classList.add(addCurrentClass);
}

const hoverClass = () => {
  gameBoard.classList.remove(player2Class);
  gameBoard.classList.remove(player1Class);
  if (player2Turn) {
    gameBoard.classList.add(player2Class);
  } else {
    gameBoard.classList.add(player1Class);
  } 
}

const startGame = () => {
  player2Turn = false;
  emptyBoxes.forEach(box => {
    box.classList.remove(player1Class)
    box.classList.remove(player2Class)
    box.removeEventListener('click', clickControl)
    box.addEventListener('click', clickControl, {once: true})
  });
  hoverClass() 
  endGameMessage.classList.remove('show') 
}

startGame();

const checkWin = (addCurrentClass) => {
  return winCondition.some((arrays) => {
    return arrays.every(index => {
      return emptyBoxes[index].classList.contains(addCurrentClass)
    })
  })      
}

const keepScore = (player2Turn) => {
  if (player2Turn) {
    player1Score.innerText++;
  } else {
    player2Score.innerText++;
  } 
}

const endGame = (player2Turn) => {
  if (player2Turn) {
    win.innerText = "Undead Wins !"
  } else {
    win.innerText = "Lightbringer Wins !"
  }
  endGameMessage.classList.add('show')
}

const popItem = () => {
  
}

reset.addEventListener('click', startGame)

