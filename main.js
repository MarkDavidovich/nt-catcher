import { Item } from "./model.js";
import { Renderer } from "./renderer.js";

const DEFAULT_TIME = 5;
const DEFAULT_LEVEL = 1;

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
  initLevel();
  resetStats();
  score.textContent = `Score: ${scoreAmount}`;
  score.levelNum = `Level: ${levelNum}`;
  startBtn.disabled = true;
  startBtn.classList.add("inactive");
  gameOverText.classList.remove("enabled");

  level.textContent = `Level: ${levelNum}`;

  countTime();
};

const endGame = () => {
  itemsContainer.innerHTML = "";

  startBtn.disabled = false;
  startBtn.classList.remove("inactive");

  gameOverText.classList.add("enabled");
};

const resetStats = () => {
  clearInterval(intervalId);

  levelNum = DEFAULT_LEVEL;
  scoreAmount = 0;
  totalTime = DEFAULT_TIME;
};

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

const initLevel = () => {
  item.removeAllItems();

  //add initial items;
  item.addItem(true);
  item.addItem(true);
  item.addItem(false);
  if (levelNum > 0) {
    for (let i = 0; i < levelNum; i++) {
      item.addItem(Math.random() > 0.5 ? true : false);
    }
  }

  loadItems();
};

const advanceLevel = () => {
  clearInterval(intervalId);
  item.removeAllItems();
  levelNum++;
  initLevel();
  totalTime = DEFAULT_TIME;
  countTime();
};

startBtn.addEventListener("click", () => {
  startGame();
});

itemsContainer.addEventListener("click", (ev) => {
  if (ev.target.classList.contains("item")) {
    const id = ev.target.dataset.id;
    //check if item is bad or good and increment score or trigger game over.
    if (ev.target.classList.contains("good")) {
      item.deleteItem(+id);

      scoreAmount++;
      score.textContent = `Score: ${scoreAmount}`;

      if (item.checkItems()) {
        console.log("next level!");
        advanceLevel();
      }
    } else {
      endGame();
    }

    loadItems();
  }
});
