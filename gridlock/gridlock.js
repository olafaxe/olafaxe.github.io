"use strict";
// document.addEventListener("DOMContentLoaded", function() {
// your code here

let gridBox = document.querySelector(".container");
let startButton = document.querySelector(".startbutton-button");
let countDown = document.querySelector(".countdown");
let gameText = document.querySelector(".game-text");
let newGameBtn = document.querySelector(".start-startBtn");

const target = { target: "" };
let tempArr = [];
let gameProgress = false;
let endGame = false;
let remove = false;
let strikes = 0;
let clickLock = false;

let actionClickDebounce = debounce(event => {
  if (event.target.id === "" || !gameProgress || clickLock) {
    return;
  }
  clickLock = true;
  console.log(event.target.id);
  let tempNum = getRandomInt(3000);
  console.log(target["target"]);
  let clickBox = event.target.id;
  let boxSelect = document.querySelector("#" + clickBox);
  let targetBox = document.querySelector("#" + target["target"]);

  if (tempArr.length === 16) {
    gameText.innerHTML = "GRID LOCK";
    gameText.classList.add("gridlock-feeling");
    gameProgress = false;
    boxSelect.classList.add("locked");
    boxSelect.classList.remove("target");
    newGameBtn.classList.add("start-animation");

    return;
  }

  if (event.target.id == target["target"]) {
    boxSelect.classList.add("locked");
    boxSelect.classList.remove("target");
    setTimeout(startGame, tempNum);
  } else {
    strikes++;
    if (strikes == 3) {
      gameProgress = false;
      gameText.innerHTML = "GAME OVER";
      gameText.classList.add("gameover-feeling");
      boxSelect.classList.remove("target");
      newGameBtn.classList.add("start-animation");
      reset();
      return;
    }
    remove = true;
    boxSelect.classList.add("miss");
    setTimeout(() => {
      boxSelect.classList.remove("miss");
    }, 2000);
    targetBox.classList.remove("target");
    setTimeout(startGame, tempNum);
  }
  console.log("clicked in grid", event.target.id);
}, 250);

gridBox.addEventListener("mousedown", actionClickDebounce);

////////////////////////7

function startGame() {
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
  // if (boxSelect.classList.contains("locked")) {
  //   remove = true;
  //   startGame();
  // }
  boxSelect.classList.remove("miss");
  boxSelect.classList.add("target");
  target["target"] = targetBox;
}

function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}
// });

function randomIntFromInterval(min, max) {
  // min and max included (stackoverflow)
  return Math.floor(Math.random() * (max - min + 1) + min);
}

startButton.addEventListener("click", event => {
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

function debounce(func, wait, immediate) {
  var timeout;

  return function executedFunction() {
    var context = this;
    var args = arguments;

    var later = function() {
      timeout = null;
      if (!immediate) func.apply(context, args);
    };

    var callNow = immediate && !timeout;

    clearTimeout(timeout);

    timeout = setTimeout(later, wait);

    if (callNow) func.apply(context, args);
  };
}
