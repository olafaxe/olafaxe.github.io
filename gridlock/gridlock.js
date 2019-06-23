"use strict";
// document.addEventListener("DOMContentLoaded", function() {
// your code here

let gridBox = document.querySelector(".container");
let startButton = document.querySelector(".startbutton-button");
const target = { target: "" };

gridBox.addEventListener("mousedown", event => {
  let tempNum = getRandomInt(3000);
  console.log(target["target"]);
  let clickBox = event.target.id;
  let boxSelect = document.querySelector("#" + clickBox);
  let targetBox = document.querySelector("#" + target["target"]);
  if (event.target.id == target["target"]) {
    boxSelect.classList.add("locked");
    boxSelect.classList.remove("target");
    setTimeout(startGame, tempNum);
  } else {
    boxSelect.classList.add("miss");
    targetBox.classList.remove("target");
    setTimeout(startGame, tempNum);
  }
  console.log("clicked in grid", event.target.id);
});
// startButton.addEventListener("click", event => {
//   startGame();
// });
function startGame() {
  let tempArr = [];
  let tempNum = getRandomInt(15);
  for (let i = 0; i < tempArr.length; i++) {
    if (tempArr[i] === tempNum) {
      console.log("duplicate");
    }
  }
  tempArr.push(tempNum);
  let targetBox = "box" + tempNum;
  let boxSelect = document.querySelector("#" + targetBox);
  boxSelect.classList.add("target");
  target["target"] = targetBox;
}

function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max) + 1);
}
// });

startButton.addEventListener("click", event => {
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
});
