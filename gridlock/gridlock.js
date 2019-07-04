"use strict";

let gridBox = document.querySelector(".container");
let startButton = document.querySelector(".startbutton-button");
let countDown = document.querySelector(".countdown");
let gameText = document.querySelector(".game-text");
let newGameBtn = document.querySelector(".start-startBtn");
let scoreOutput = document.querySelector(".score-number");
let highScore = document.querySelector(".highscore");

const target = { target: "" };
let tempArr = [];
let gameProgress = false;
let endGame = false;
let remove = false;
let strikes = 0;
let clickLock = false;
let scoreNum = 100;
let scoreActual = [];
let timerInterval;

/////////////////////////
/////////////////////////
highScorifier();

let actionClickDebounce = debounce(event => {
  console.log(tempArr);
  if (event.target.id === "" || !gameProgress || clickLock) {
    return;
  }
  clickLock = true;
  let tempNum = randomIntFromInterval(500, 4000);
  let clickBox = event.target.id;
  let boxSelect = document.querySelector("#" + clickBox);
  let targetBox = document.querySelector("#" + target["target"]);

  if (tempArr.length === 16) {
    timeStopper();
    scoreCalc();
    hitClick(boxSelect);
    highScorifier();
    gameWin(boxSelect);
    return;
  }

  if (event.target.id == target["target"]) {
    timeStopper();
    scoreCalc();
    hitClick(boxSelect);
    setTimeout(startGame, tempNum);
  } else {
    timeStopper();
    scoreActual.pop();
    missClick(boxSelect, targetBox);
    if (strikes == 3) {
      gameLose(boxSelect);
      highScorifier();
      timeStopper();
      reset();
      return;
    }
    setTimeout(startGame, tempNum);
  }
}, 250);

gridBox.addEventListener("mousedown", actionClickDebounce);

////////////////////////7

startButton.addEventListener("click", event => {
  newLife();
  highScorifier();
  scoreOutput.innerHTML = "";
  scoreActual = [];
  newGameBtn.classList.remove("start-animation");
  if (!gameProgress) {
    gameText.innerHTML = "";
    gameText.classList.remove("gridlock-feeling");
    gameText.classList.remove("gameover-feeling");
    reset();
    for (let i = 1; i < tempArr.length + 1; i++) {
      let targetBox = "#box" + i;
      let boxSelect = document.querySelector(targetBox);
      boxSelect.classList.remove("locked");
      boxSelect.classList.remove("target");
      boxSelect.classList.remove("miss");
    }
    tempArr = [];
    let num = 3;
    let countDown = document.querySelector(".countdown");
    countDown.innerHTML = num;
    let countDownTimer = setInterval(() => {
      num--;
      countDown.innerHTML = num;

      if (num === 0) {
        clearInterval(countDownTimer);
        countDown.innerHTML = "";
      }
    }, 1000);
    setTimeout(startGame, 3000);
  }
  gameProgress = true;
});

////////////////////////
///////FUNCTIONS////////
////////////////////////
function newLife() {
  document.querySelector(".lifebar_three").classList.remove("lifebar-skull");
  document.querySelector(".lifebar_three").classList.add("lifebar-heart");
  document.querySelector(".lifebar_two").classList.remove("lifebar-skull");
  document.querySelector(".lifebar_two").classList.add("lifebar-heart");
  document.querySelector(".lifebar_one").classList.remove("lifebar-skull");
  document.querySelector(".lifebar_one").classList.add("lifebar-heart");
}

function strike() {
  strikes++;
  if (strikes === 1) {
    document.querySelector(".lifebar_three").classList.add("lifebar-skull");
    document.querySelector(".lifebar_three").classList.remove("lifebar-heart");
  }
  if (strikes === 2) {
    document.querySelector(".lifebar_two").classList.add("lifebar-skull");
    document.querySelector(".lifebar_two").classList.remove("lifebar-heart");
  }
  if (strikes === 3) {
    document.querySelector(".lifebar_one").classList.add("lifebar-skull");
    document.querySelector(".lifebar_one").classList.remove("lifebar-heart");
  }
}
function startGame() {
  timeSetter();
  clickLock = false;
  if (remove) {
    tempArr.pop();
    remove = false;
  }
  let tempNum = randomIntFromInterval(1, 16);
  function randomNummerLoop() {
    for (let i = 0; i < tempArr.length; i++) {
      if (tempArr[i] === tempNum || tempNum === 0) {
        tempNum = randomIntFromInterval(i, 16);
        randomNummerLoop();
      }
    }
  }
  randomNummerLoop();

  tempArr.push(tempNum);
  let targetBox = "box" + tempNum;
  let boxSelect = document.querySelector("#" + targetBox);
  boxSelect.classList.remove("miss");
  boxSelect.classList.add("target");
  target["target"] = targetBox;
}

////////////////////////////////////////

function timeSetter() {
  let diff;
  if (tempArr.length < 8) {
    console.log("easy");
    diff = 100;
  } else if (tempArr.length >= 8 && tempArr.length < 12) {
    console.log("medium");
    diff = 50;
  } else if (tempArr.length >= 12 && tempArr.length < 16) {
    console.log("hard");
    diff = 25;
  }
  timerInterval = setInterval(timer, diff);
}

function timer() {
  scoreNum--;
  if (scoreNum === 0) {
    gridBox.classList.add("timeOut");
    setTimeout(() => {
      gridBox.classList.remove("timeOut");
    }, 1000);
    tempArr.pop();
    scoreNum = 100;
    strike();
    timeStopper();
    let timedOut = true;
    if (strikes === 3) {
      if (!timedOut) {
        timeStopper();
      }
      gameProgress = false;
      gameText.innerHTML = "GAME OVER";
      gameText.classList.add("gameover-feeling");
      newGameBtn.classList.add("start-animation");
      for (let i = 1; i < 16; i++) {
        let targetBox = document.querySelector("#box" + i);
        targetBox.classList.remove("target");
      }
      return;
    }
    for (let i = 1; i < 16; i++) {
      console.log("test");
      let targetBox = document.querySelector("#box" + i);
      targetBox.classList.remove("target");
    }

    timeStopper();
    let tempNum = randomIntFromInterval(500, 4000);
    setTimeout(startGame, tempNum);
  }
}

function timeStopper() {
  scoreActual.push(scoreNum);
  scoreNum = 100;
  clearInterval(timerInterval);
}

////////////////////////////////////////

function scoreCalc() {
  console.log("SCORE TRIGGER");
  let scoreTotal = 0;
  for (let i = 0; i < scoreActual.length; i++) {
    scoreTotal = scoreTotal + scoreActual[i];
  }

  scoreOutput.innerHTML = scoreTotal;
}

///////////////////////////////////////

function randomIntFromInterval(min, max) {
  // min and max included (stackoverflow)
  return Math.floor(Math.random() * (max - min + 1) + min);
}

////////////////////////////////////////

function reset() {
  for (let i = 0; i < tempArr.length; i++) {
    let k = tempArr[i];
    let targetBox = document.querySelector("#box" + k);
    targetBox.classList.remove("locked");
    targetBox.classList.remove("target");
    targetBox.classList.remove("miss");
  }
  endGame = false;
  strikes = 0;
}

////////////////////////////////////////

function debounce(func, wait, immediate) {
  let timeout;

  return function executedFunction() {
    let context = this;
    let args = arguments;

    let later = function() {
      timeout = null;
      if (!immediate) func.apply(context, args);
    };

    let callNow = immediate && !timeout;

    clearTimeout(timeout);

    timeout = setTimeout(later, wait);

    if (callNow) func.apply(context, args);
  };
}

////////////////////////////////////////

function gameWin(boxSelect) {
  gameText.innerHTML = "GRID LOCK";
  gameText.classList.add("gridlock-feeling");
  gameProgress = false;
  boxSelect.classList.add("locked");
  boxSelect.classList.remove("target");
  newGameBtn.classList.add("start-animation");
}

////////////////////////////////////////

function gameLose(boxSelect) {
  gameProgress = false;
  gameText.innerHTML = "GAME OVER";
  gameText.classList.add("gameover-feeling");
  boxSelect.classList.remove("target");
  newGameBtn.classList.add("start-animation");
}

////////////////////////////////////////

function missClick(boxSelect, targetBox) {
  strike();
  remove = true;
  boxSelect.classList.add("miss");
  setTimeout(() => {
    boxSelect.classList.remove("miss");
  }, 2000);
  targetBox.classList.remove("target");
}

////////////////////////////////////////

function hitClick(boxSelect) {
  boxSelect.classList.add("locked");
  boxSelect.classList.remove("target");
}

////////////////////////////////////////

function highScorifier() {
  console.log("hs start");
  let oldScore = localStorage.getItem("highscore");
  if (!oldScore) {
    highScore.innerHTML = `Highscore: 0`;
  } else {
    highScore.innerHTML = `Highscore: ${oldScore}`;
  }
  let score = Number(scoreOutput.innerHTML);
  if (score > oldScore) {
    localStorage.removeItem("highscore");
    localStorage.setItem("highscore", score);
    highScore.innerHTML = `Highscore: ${score}`;
  }
  console.log(score);
}
