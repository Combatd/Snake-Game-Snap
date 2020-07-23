/* game.js

This code handles the game elements and interactions on game.html. 
Most of your work will be here!
*/

/***INITIALIZING VARIABLES AND OBJECTS***/
var canvas = document.getElementById('game');
var context = canvas.getContext('2d');
var grid = 40;
var count = 0;
var snake = {
  x: 160,
  y: 160,
  x_step: grid, //snake velocity. moves one grid length every frame in either the x or y direction
  y_step: 0,
  cells: [],  //an array that keeps track of all grids the snake body occupies
  currentLength: 4 //current length of the snake. grows when eating an apple. 
};
/* TO DO: create apple object below */
var apple = {
  x: getRandomInt(0, 15) * grid,
  y: getRandomInt(0, 15) * grid,
  color: "green"
}

// custom pill object is here
var pill = {
  x: getRandomInt(0, 15) * grid,
  y: getRandomInt(0, 15) * grid,
  color: "pink"
}

// custom asteroid objects is here
var asteroidOne = {
  x: getRandomInt(0, 15) * grid,
  y: getRandomInt(0, 15) * grid
}
var asteroidTwo = {
  x: getRandomInt(0, 15) * grid,
  y: getRandomInt(0, 15) * grid
}
var asteroidThree = {
  x: getRandomInt(0, 15) * grid,
  y: getRandomInt(0, 15) * grid
}
var asteroidFour = {
  x: getRandomInt(0, 15) * grid,
  y: getRandomInt(0, 15) * grid
}

// custom asteroidImg
var asteroidImg = document.querySelector('#asteroid-img');

// Custom Variables
var gameScore = 0;
const backgroundMusic = document.getElementById('background-music');
backgroundMusic.volume = 0.1;
const gameOverSound = document.getElementById('game-over-sound');

/***MAIN FUNCTIONS***/

/* start the game */
requestAnimationFrame(snakeSquadLoop);

/* Listen to keyboard events to move the snake */
document.addEventListener('keydown', function(e) {
  // prevent snake from backtracking on itself by checking that it's 
  // not already moving on the same axis (pressing left while moving
  // left won't do anything, and pressing right while moving left
  // shouldn't let you collide with your own body)

  // left arrow key
  if (e.which === 37 && snake.x_step === 0) {
    snake.x_step = -grid;
    snake.y_step = 0;
  }
  // up arrow key
  else if (e.which === 38 && snake.y_step === 0) {
    snake.y_step = -grid;
    snake.x_step = 0;
  }
  // right arrow key
  else if (e.which === 39 && snake.x_step === 0) {
    snake.x_step = grid;
    snake.y_step = 0;
  }
  // down arrow key
  else if (e.which === 40 && snake.y_step === 0) {
    snake.y_step = grid;
    snake.x_step = 0;
  }
  
  // custom conditional invoking pauseGame()
  if (e.which === 80) {
    // pauseGame();
    alert('Game Paused: Click "OK" to Resume');
  }
  
});

/***HELPER FUNCTIONS***/

/*snakeSquadLoop: This is the main code that is run each time the game loops*/
function snakeSquadLoop() {
  requestAnimationFrame(snakeSquadLoop);
  // if count < 16, then keep looping. Don't animate until you get to the 16th frame. This controls the speed of the animation.
  if (count < 16) {
    count++;
    return;
  }
  //Otherwise, it's time to animate. 
  count = 0;
  context.clearRect(0,0,canvas.width,canvas.height);
  /*TO DO:which functions do we need to run for this game to work, and in what order?*/
  calculateSnakeMove();
  drawSnake();
  drawApple();
  drawScore();
  
  // custom invocation of drawAsteroid()  
  drawAsteroid(asteroidOne);
  
  // custom invocation of drawPill()
  if (gameScore >= 20){
    drawPill();
  }
  
    
  // custom conditional for drawAsteroid(asteroid)
  
  // should draw asteroidTwo at gameScore 20
  if (gameScore >= 25) {
    drawAsteroid(asteroidTwo);
  }
  // should draw asteroidThree at gameScore 30
  if (gameScore >= 30) {
    drawAsteroid(asteroidThree);
  }
  // should draw asteroidFour at gameScore 50
  if (gameScore >= 50) {
    drawAsteroid(asteroidFour);
  }
  
  
  if (snakeTouchesApple()) {
    lengthenSnakeByOne();
    // custom function increaseScoreByOne()
    increaseScoreByOne();
    randomlyGenerateApple();
    if ((checkAppleOnAsteroid(asteroidOne) || checkAppleOnAsteroid(asteroidTwo) || checkAppleOnAsteroid(asteroidThree) || checkAppleOnAsteroid(asteroidFour) ) ) {
      randomlyGenerateApple();
    }
  }
  
  // custom conditonal calling snakeTouchesPill()
  if (snakeTouchesPill()) {
    shortenSnakeByOne()
    randomlyGeneratePill();
    
  }
  
  // custom conditional for checkCrashIntoAsteroid
  if (checkCrashIntoAsteroid(asteroidOne)) {
    // gameOverSound.play();
    backgroundMusic.pause();
    endGame();
  }
  
  if (checkCrashIntoAsteroid(asteroidTwo && gameScore >= 25)) {
    // gameOverSound.play();
    backgroundMusic.pause();
    endGame();
  }
  
  if (checkCrashIntoAsteroid(asteroidThree) && gameScore >= 30) {
    // gameOverSound.play();
    backgroundMusic.pause();
    endGame();
  }
  
  if (checkCrashIntoAsteroid(asteroidFour) && gameScore >= 50) {
    // gameOverSound.play();
    backgroundMusic.pause();
    endGame();
  }
  
  
  
  
  if (checkCrashItself()) {
    // gameOverSound.play();
    backgroundMusic.pause();
    endGame();
  }
  
}

function calculateSnakeMove(){
  // move snake by its velocity
  snake.x += snake.x_step;
  snake.y += snake.y_step;

  // wrap snake position horizontally on edge of screen
  if (snake.x < 0) {
    snake.x = canvas.width - grid;
  }
  else if (snake.x >= canvas.width) {
    snake.x = 0;
  }
  // wrap snake position vertically on edge of screen
  if (snake.y < 0) {
    snake.y = canvas.height - grid;
  }
  else if (snake.y >= canvas.height) {
    snake.y = 0;
  }
  // keep track of where snake has been. front of the array is always the head
  snake.cells.unshift({x: snake.x, y: snake.y});

  // remove cells as we move away from them
  if (snake.cells.length > snake.currentLength) {
    snake.cells.pop();
  }
}

/*drawApple
uses context functions to fill the cell at apple.x and apple.y with apple.color 
*/
function drawApple(){
  /* TO DO */
  context.beginPath();
  context.arc(apple.x, apple.y, 15, 0, -1.5 * Math.PI, true)
  context.strokeStyle = "yellow";
  context.lineWidth = 4;
  context.stroke();
  context.fillStyle = apple.color;
  context.fill();
}

/* custom function drawPill
uses context functions to fill the cell at pill.x and pill.y
*/
const drawPill = () => {
  context.fillStyle = pill.color;
  context.fillRect(pill.x, pill.y, grid, grid)
}



/* Custom drawAsteroid()
  use context function to draw an asteroid at asteroid.x and asteroid.y
*/
const drawAsteroid = (asteroid) => {
  // context.drawImage(img,x,y);
  context.drawImage(asteroidImg, asteroid.x, asteroid.y, 30, 30); 
}



/*drawSnake
For each cell of the snake, fill in the grid at the location (cell.x, cell.y) with the snake.color 
If the cell is the first cell in the array, use the drawCellWithBitmoji function to draw that cell as the user's bitmoji 
*/
function drawSnake(){
  /* TO DO */
  for (let i = 1; i < snake.cells.length; i++) {
    drawCellWithBitmoji(snake.cells[0]);
    context.fillStyle = snake.color;
    context.strokeStyle = 'blue';
    context.fillRect(snake.cells[i].x, snake.cells[i].y, grid, grid);
  }
}

/*drawCellWithBitmoji
Takes a cell (with an x and y property) and fills the cell with a bitmoji instead of a square
*/
function drawCellWithBitmoji(cell){
  var avatar_url = localStorage.getItem('avatarurl');
  document.getElementById('avatar').src = avatar_url;
  context.drawImage(document.getElementById('avatar'),0, 0, 200, 200, cell.x, cell.y, grid, grid);
}

/*snakeTouchesApple
checks if any cell in the snake is at the same x and y location of the apple
returns true (the snake is eating the apple) or false (the snake is not eating the apple)
*/
function snakeTouchesApple(){
  /* TO DO */
  if(apple.x === snake.cells[0].x && apple.y === snake.cells[0].y) {
    return true
  } else {
    return false;
  }
  
}


/* Custom function snakeTouchesPill
checks if any call in the snake is at the same x and y location of the pill
returns true (the snake is eating the pill) or false (the snake is not eating the pill)
*/
const snakeTouchesPill = () => {
  if(pill.x === snake.cells[0].x && snake.y === snake.cells[0].y) {
    return true
  } else {
    return false;
  }
  
}



/*lengthenSnakeByOne
increments the currentLength property of the snake object by one to show that the snake has eaten an apple
*/
function lengthenSnakeByOne(){
  snake.currentLength = snake.currentLength + 1;
}

/* Custom function shortenSnakeByOne
decrements the currentLength property of the snake object by one to show that the snake has eaten a pill
*/
const shortenSnakeByOne = () => {
  // snake.cells.pop();
  snake.currentLength -= 1;
}

/*randomlyGenerateApple
uses getRandomInt to generate a new x and y location for the apple within the grid
this function does not draw the apple itself, it only stores the new locations in the apple object
*/
function randomlyGenerateApple(){
  apple.x = getRandomInt(0, 15) * grid;
  apple.y = getRandomInt(0, 15) * grid;
}

/* Custom function randomlyGeneratePill
uses getRandomInt to generate a new x and y location for the pill within the grid
this function does not draw the pill itself, it only stores the new locations in the pill object
it will only run
*/
const randomlyGeneratePill = () => {
  pill.x = getRandomInt(0, 15) * grid;
  pill.y = getRandomInt(0, 15) * grid;
}

/* Custom function randomlyGenerateAsteroid
uses getRandomInt to generate a new x and y location for the asteroid within the grid
this function does not draw the asteroid itself, it only stores the new locations in the asteroid object
it will only run
*/
const randomlyGenerateAsteroid = (asteroid) => {
  asteroid.x = getRandomInt(0, 15) * grid;
  asteroid.y = getRandomInt(0, 15) * grid;
}


/*checkCrashItself
checks if any cell in the snake is at the same x and y location of the any other cell of the snake
returns true (the snake crashed into itself) or false (the snake is not crashing) 
*/
function checkCrashItself(){
  /* TO DO */
  
  for (let i = 0; i < snake.cells.length; i++) {
    let snakeHead = snake.cells[0]
    for (let j = 1; j < snake.cells.length; j++) {
      if (snakeHead.x === snake.cells[j].x && snakeHead.y === snake.cells[j].y) return true;
    }
  }
  return false;
  
}

/*endGame
displays an alert and reloads the page
*/
function endGame(){
  alert("GAME OVER - " + "Score: " + gameScore);
  document.location.reload();
}

/*getRandomInt
takes a mininum and maximum integer
returns a whole number randomly in that range, inclusive of the mininum and maximum
see https://stackoverflow.com/a/1527820/2124254
*/
function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

/* Custom: increaseScoreByOne
Increases gameScore by one upon snakeTouchesApple invocation
*/
const increaseScoreByOne = () => {
  gameScore += 1;
}

/* Custom: drawScore()
  uses context object to draw a score using font and fillText with gameScore value
*/
const drawScore = () => {
  context.font = '40px sans-serif';
  context.fillText(`Score: ${gameScore}`, 39, 39);
}

/* Custom: pauseGame()
  changes boolean isPaused to true and creates an alert which changes isPaused back to false after the alert
*/
const pauseGame = () => {
  alert("Game Currently Paused");
}

/* Custom: checkCrashItself
checks if any cell in the snake is at the same x and y location of any asteroid
returns true (the snake crashed into asteroid) or false (the snake is not crashing) 
*/
const checkCrashIntoAsteroid = (asteroid) => {
  let snakeHead = snake.cells[0];
  if (snakeHead.x === asteroid.x && snakeHead.y == asteroid.y) {
    return true;
  }
  return false;
}

/* Custom: checkAppleOnAsteroid
checks if apple is generated on location of an asteroid
returns true or false
*/
const checkAppleOnAsteroid = (asteroid) => {
  if (apple.x === asteroid.x && apple.y === asteroid.y){ 
    return true;
  }
  return false;
}