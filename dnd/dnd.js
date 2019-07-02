let lockzone = document.querySelector(".item-locked");

let from;
let to;

function allowDrop(ev) {
  ev.preventDefault();
}

function drag(ev) {
  ev.dataTransfer.setData("text", ev.target.id);
  let drag = ev.target;
  from = ev.target.parentElement;
}

function drop(ev) {
  ev.preventDefault();
  let data = ev.dataTransfer.getData("text");
  let okDrop = false;
  to = ev.target;
  let boxTo;
  let boxFrom;
  if (from.classList.contains("item-dragPl")) {
    boxFrom = "pla";
  } else if (from.classList.contains("item-dragOp")) {
    boxFrom = "opp";
  }
  if (to.classList.contains("item-dragPl")) {
    boxTo = "pla";
  } else if (to.classList.contains("item-dragOp")) {
    boxTo = "opp";
  }

  if (boxTo === boxFrom) {
    okDrop = true;
  }
  console.log(okDrop);
  if (okDrop) {
    ev.target.appendChild(document.getElementById(data));
  }
}
