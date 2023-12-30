const gameBoard = document.querySelector(".gameBoard");
const container = document.querySelector(".container");
const scores = document.querySelector(".score")
let gameOver = false ;
let snake = [];
let foodX ,foodY;
let snakeX=15 , snakeY =15;
let snakeVelX =0 , snakeVelY = 0;
let gameInterval ;
let score = 0;


function creaateFood (){
  foodX = Math.floor(Math.random()*30) ;
  foodY = Math.floor(Math.random()*30) ;

}


document.addEventListener("keydown", (e)=> {
  if(e.key === "ArrowUp" && snakeVelY != 1) {
    snakeVelX = 0;
    snakeVelY = -1;
} else if(e.key === "ArrowDown" && snakeVelY != -1) {
  snakeVelX = 0;
  snakeVelY = 1;
} else if(e.key === "ArrowLeft" && snakeVelX != 1) {
  snakeVelX = -1;
  snakeVelY = 0;
} else if(e.key === "ArrowRight" && snakeVelX != -1) {
  snakeVelX = 1;
  snakeVelY = 0;
}
});

const handelGameOver = ()=> {
clearInterval(gameInterval);
  alert("Game Over..!! Do You Want To Try Again.. ?");
  location.reload();
}

const startGame = () =>{
  if(gameOver) return handelGameOver();
  let start = `<div class="food" style="grid-area: ${foodY} / ${foodX}"></div>`;

  
  if(snakeX === foodX && snakeY === foodY) {
      creaateFood();
      snake.push([foodY, foodX]); 
      score++; 
      scores.innerText = `Score: ${score}`;
  }
  snakeX += snakeVelX;
  snakeY += snakeVelY;
  
  for (let i = snake.length - 1; i > 0; i--) {
    snake[i] = snake[i - 1];
  }
  snake[0] = [snakeX, snakeY]; 

  if(snakeX <= 0 || snakeX > 30 || snakeY <= 0 || snakeY > 30) {
      return gameOver = true;
  }

  for (let i = 0; i < snake.length; i++) {
      start += `<div class="snake" style="grid-area: ${snake[i][1]} / ${snake[i][0]}"></div>`;
      if (i !== 0 && snake[0][1] === snake[i][1] && snake[0][0] === snake[i][0]) {
          gameOver = true;
  
}  
}
gameBoard.innerHTML = start;
}

creaateFood();
gameInterval = setInterval(startGame , 80);
