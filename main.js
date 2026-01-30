import { Item } from "./model.js";
import { Renderer } from "./renderer.js";

const DEFAULT_TIME = 5;
const DEFAULT_LEVEL = 1;

// connects between model and renderer to show elements on the screen
const item = Item();
const renderer = Renderer();

const itemsContainer = document.querySelector(".object-container");
const startBtn = document.querySelector(".start-btn");
const timerText = document.querySelector(".timer");
const scoreText = document.querySelector(".score");
const levelText = document.querySelector(".level");
const gameOverText = document.querySelector(".game-over-text");

let timerInterval;
let levelChangeInterval;
let levelNum;
let scoreAmount;
let totalTime;

const loadItems = () => {
  renderer.renderItems(item.getItems());
};

const startGame = () => {
  resetStats();
  initLevel();

  updateScore();
  updateLevel();

  startBtn.disabled = true;
  startBtn.classList.add("inactive");
  gameOverText.classList.remove("enabled");

  countTime();
};

const endGame = () => {
  item.removeAllItems();
  loadItems();
  startBtn.disabled = false;
  updateLevel();
  updateScore();

  resetStats();
  startBtn.classList.remove("inactive");

  gameOverText.classList.add("enabled");
};

const resetStats = () => {
  clearInterval(timerInterval);

  levelNum = DEFAULT_LEVEL;
  scoreAmount = 0;
  totalTime = DEFAULT_TIME;
};

const countTime = () => {
  clearInterval(timerInterval);

  timerInterval = setInterval(() => {
    updateTimer();
    updateTimerDisplay();
    if (totalTime === 0) {
      timerText.classList.remove("flashing-red");
      endGame();
      clearInterval(timerInterval);
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

  for (let i = 0; i < levelNum; i++) {
    item.addItem(Math.random() > 0.5);
  }

  loadItems();
};

const advanceLevel = () => {
  clearInterval(timerInterval);

  levelNum++;
  totalTime += 2;

  updateTimer();
  updateLevel();

  updateLevelDisplay();
  timerText.classList.remove("flashing-red");
  item.removeAllItems();

  initLevel();
  countTime();
};

startBtn.addEventListener("click", () => {
  startGame();
});

const updateScore = () => {
  scoreText.textContent = `Score: ${scoreAmount}`;
};

const updateLevel = () => {
  levelText.textContent = `Level: ${levelNum}`;
};

const updateTimer = () => {
  timerText.textContent = `Time Left: ${totalTime}`;
};

const updateTimerDisplay = () => {
  if (totalTime <= 3) {
    timerText.classList.add("flashing-red");
  } else {
    timerText.classList.remove("flashing-red");
  }
};

const updateLevelDisplay = () => {
  clearInterval(levelChangeInterval);
  levelText.classList.add("flashing-yellow");

  setTimeout(() => {
    levelText.classList.remove("flashing-yellow");
  }, 1000);
};

itemsContainer.addEventListener("click", (ev) => {
  if (ev.target.classList.contains("item")) {
    const id = ev.target.dataset.id;
    //check if item is bad or good and increment score or trigger game over.
    if (ev.target.classList.contains("good")) {
      item.deleteItem(+id);
      //this option enables the prevention of re-organizing items with each click because we don't need to re-render each time.
      ev.target.remove();

      scoreAmount++;
      updateScore();
      if (item.checkItems()) {
        advanceLevel();
      }
    } else {
      endGame();
    }

    // loadItems();
  }
});
