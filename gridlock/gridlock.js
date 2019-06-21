document.addEventListener("DOMContentLoaded", function(event) {
  // your code here

  let gridBox = document.querySelector(".container");
  let box1 = document.querySelector("#box1");

  gridBox.addEventListener("mousedown", event => {
    let targetBox = "box1";
    if (event.target.id == targetBox) {
      box1.classList.add("locked");
    }
    console.log("clicked in grid", event.target.id);
  });
});
