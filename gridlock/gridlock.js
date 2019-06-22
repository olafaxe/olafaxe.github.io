document.addEventListener("DOMContentLoaded", function(event) {
  // your code here

  let gridBox = document.querySelector(".container");
  let box1 = document.querySelector("#box1");

  gridBox.addEventListener("mousedown", event => {
    let targetBox = "box1";
    let clickBox = event.target.id;
    let boxSelect = document.querySelector("#" + clickBox);
    if (event.target.id == targetBox) {
      box1.classList.add("locked");
      box1.classList.remove("target");
    } else {
      boxSelect.classList.add("miss");
    }
    console.log("clicked in grid", event.target.id);
  });
});
