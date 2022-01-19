//variabels
let board = document.getElementById("board");
let scoreCard = document.getElementById("score");
let inputDir = { x: 0, y: 0 };
const foodSound = new Audio("music/food.mp3");
const moveSound = new Audio("music/move.mp3");
const gameOverSound = new Audio("music/gameover.mp3");
const musicSound = new Audio("music/music.mp3");
let score = 0;
let segment = [{ x: 13, y: 15 }];
let lastPainTime = 0;
speed = 10;
let food = { x: 10, y: 2 };
let a = 2;
let b = 16;

//functions
function isCollide(segment) {
  // if you collide within yourself
  for (let i = 1; i < segment.length; i++) {
    if (segment[i].x === segment[0].x && segment[i].y === segment[0].y)
      return true;
  }
  // if collide with walls
  if (
    segment[0].x >= 18 ||
    segment[0].x <= 0 ||
    segment[0].y >= 18 ||
    segment[0].y <= 0
  )
    return true;
}

function gameFunction() {
  //play sound
  musicSound.play();
  //1. Updating the snake array and food position
  //game over
  if (isCollide(segment)) {
    gameOverSound.play();
    inputDir = { x: 0, y: 0 };
    alert("Click on ok to play again!");
    segment = [{ x: 13, y: 15 }];
    score = 0;
  }
  // incrementing of the snake body and score
  if (segment[0].y === food.y && segment[0].x === food.x) {
    segment.unshift({
      x: segment[0].x + inputDir.x,
      y: segment[0].y + inputDir.y,
    });
    food = {
      x: Math.round(a + (b - a) * Math.random()),
      y: Math.round(a + (b - a) * Math.random()),
    };
    score++;
    foodSound.play();
  }
  //moving the snake
  for (let i = segment.length - 2; i >= 0; i--) {
    segment[i + 1] = { ...segment[i] };
  }
  segment[0].x += inputDir.x;
  segment[0].y += inputDir.y;

  //2. Display snake and food
  board.innerHTML = "";
  segment.forEach((e, index) => {
    let snakePart = document.createElement("div");
    snakePart.style.gridRowStart = e.y;
    snakePart.style.gridColumnStart = e.x;
    snakePart.classList.add("snakeBody");
    board.appendChild(snakePart);
  });

  let foodElement = document.createElement("div");
  foodElement.style.gridRowStart = food.y;
  foodElement.style.gridColumnStart = food.x;
  foodElement.classList.add("food");
  board.appendChild(foodElement);

  //displaying score
  scoreCard.innerText = "Score: " + score;
}

function main(ctime) {
  window.requestAnimationFrame(main);
  //console.log(ctime);
  if ((ctime - lastPainTime) / 1000 < 1 / speed) return;
  lastPainTime = ctime;
  gameFunction();
}

//main logic
window.requestAnimationFrame(main);
window.addEventListener("keydown", (e) => {
  console.log(e);
  moveSound.play();
  switch (e.key) {
    case "ArrowUp":
      inputDir.x = 0;
      inputDir.y = -1;
      break;
    case "ArrowDown":
      inputDir.x = 0;
      inputDir.y = 1;
      break;
    case "ArrowLeft":
      inputDir.x = -1;
      inputDir.y = 0;
      break;
    case "ArrowRight":
      inputDir.x = 1;
      inputDir.y = 0;
      break;
    case "w":
      inputDir.x = 0;
      inputDir.y = -1;
      break;
    case "s":
      inputDir.x = 0;
      inputDir.y = 1;
      break;
    case "a":
      inputDir.x = -1;
      inputDir.y = 0;
      break;
    case "d":
      inputDir.x = 1;
      inputDir.y = 0;
      break;
    default:
      break;
  }
});
