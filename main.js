import { Item } from "./model.js";
import { Renderer } from "./renderer.js";

// connects between model and renderer to show elements on the screen
const item = Item();
const renderer = Renderer();

const itemsContainer = document.querySelector(".object-container");
const startBtn = document.querySelector(".start-btn");
const timer = document.querySelector(".timer");
const score = document.querySelector(".score");
const level = document.querySelector(".level");
const gameOverText = document.querySelector(".game-over-text");

let intervalId;
let levelNum;
let scoreAmount;
let totalTime;

const loadItems = () => {
  renderer.renderItems(item.getItems());
};

const startGame = () => {
  resetStats();
  score.textContent = `Score: ${scoreAmount}`;
  score.levelNum = `Level: ${levelNum}`;
  loadItems();

  startBtn.disabled = true;
  startBtn.classList.add("inactive");
  gameOverText.classList.remove("enabled");

  level.textContent = `Level: ${levelNum}`;

  countTime();

  //start game resets score, loads items into it and starts counter
};

const endGame = () => {
  itemsContainer.innerHTML = "";

  startBtn.disabled = false;
  startBtn.classList.remove("inactive");

  gameOverText.classList.add("enabled");
};

const resetStats = () => {
  clearInterval(intervalId);

  levelNum = 0;
  scoreAmount = 0;
  totalTime = 5;

  //   startBtn.textContent = "Start";
  //   timer.textContent = "Time Left: -";
  //   score.textContent = "Score: -";
  //   level.textContent = "Level: -";
};

//put it in startGame
const countTime = () => {
  clearInterval(intervalId);

  intervalId = setInterval(() => {
    timer.textContent = `Time Left: ${totalTime}`;
    if (totalTime === 0) {
      endGame();
      clearInterval(intervalId);
    }
    totalTime--;
  }, 1000);
};

startBtn.addEventListener("click", () => {
  startGame();
});

itemsContainer.addEventListener("click", (ev) => {
  if (ev.target.classList.contains("item")) {
    const id = ev.target.dataset.id;
    //check if item is bad or good and increment score or trigger game over.
    if (ev.target.classList.contains("good")) {
      scoreAmount++;
      score.textContent = `Score: ${scoreAmount}`;
    } else {
      console.log("GAME OVER BITCH");
    }
    item.deleteItem(+id);

    loadItems();
  }
});

//Start Game

//End Game

//Count Time
//counts from a certain number, if it's over, ends the game, resets on each stage and on game start.
