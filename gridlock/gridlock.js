"use strict";
// document.addEventListener("DOMContentLoaded", function() {
// your code here

let gridBox = document.querySelector(".container");
let startButton = document.querySelector(".startbutton-button");
const target = { target: "" };

gridBox.addEventListener("mousedown", event => {
  console.log(target["target"]);
  let clickBox = event.target.id;
  let boxSelect = document.querySelector("#" + clickBox);
  let targetBox = document.querySelector("#" + target["target"]);
  if (event.target.id == target["target"]) {
    boxSelect.classList.add("locked");
    boxSelect.classList.remove("target");
  } else {
    boxSelect.classList.add("miss");
    targetBox.classList.remove("target");
  }
  console.log("clicked in grid", event.target.id);
});
startButton.addEventListener("click", event => {
  startGame();
});
function startGame() {
  let tempNum = getRandomInt(15);
  let targetBox = "box" + tempNum;
  let boxSelect = document.querySelector("#" + targetBox);
  boxSelect.classList.add("target");
  target["target"] = targetBox;
}

function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max) + 1);
}
// });
