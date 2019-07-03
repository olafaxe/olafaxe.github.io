let lockzone = document.querySelector(".item-locked");
let dropzone = document.querySelectorAll(".dropzone");

let from;
let to;
let target;

function allowDrop(ev) {
  ev.preventDefault();
}

function drag(ev) {
  ev.dataTransfer.setData("text", ev.target.id);
  from = ev.target.parentElement;
}

function drop(ev) {
  event.target.classList.remove("target-current");

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

document.addEventListener(
  "dragenter",
  function(event) {
    if (event.target.classList.contains("item-dragPl") && target === "player") {
      event.target.classList.add("target-current");
    } else if (
      event.target.classList.contains("item-dragOp") &&
      target === "opp"
    ) {
      event.target.classList.add("target-current");
    }
  },
  false
);

document.addEventListener(
  "dragleave",
  function(event) {
    event.target.classList.remove("target-current");
  },
  false
);

document.addEventListener(
  "dragstart",
  function(event) {
    for (let i = 0; i < dropzone.length; i++) {
      if (
        dropzone[i].classList.contains("item-dragPl") &&
        from.classList.contains("item-dragPl")
      ) {
        target = "player";
        dropzone[i].classList.add("target-hl");
      } else if (
        dropzone[i].classList.contains("item-dragOp") &&
        from.classList.contains("item-dragOp")
      ) {
        target = "opp";
        dropzone[i].classList.add("target-hl");
      }
    }
  },
  false
);

document.addEventListener(
  "dragend",
  function(event) {
    for (let i = 0; i < dropzone.length; i++) {
      dropzone[i].classList.remove("target-hl");
    }
  },
  false
);

// to = event.target;
// let boxTo;
// let boxFrom;
// if (from.classList.contains("item-dragPl")) {
//   boxFrom = "pla";
// } else if (from.classList.contains("item-dragOp")) {
//   boxFrom = "opp";
// }
// if (to.classList.contains("item-dragPl")) {
//   boxTo = "pla";
// } else if (to.classList.contains("item-dragOp")) {
//   boxTo = "opp";
// }
// if (boxTo === boxFrom) {
//   event.target.classList.add("target-hl");
// }
