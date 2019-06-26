"use strict";

let dpContainer = document.querySelector(".dp-container");
let yearSelect = document.querySelector(".yearSelect");
let monthSelect = document.querySelector(".monthSelect");

let valueYear;
let valueMonth;

dpContainer.addEventListener("click", () => {});

yearSelect.addEventListener("click", () => {
  valueYear = yearSelect.options[yearSelect.selectedIndex].text;
  return valueYear;
});

monthSelect.addEventListener("click", () => {
  valueMonth = monthSelect.options[monthSelect.selectedIndex].value;
  return valueMonth;
});

generateYears();
generateMonths();

function generateYears() {
  let tempY = new Date();
  let year = tempY.getFullYear();
  for (let i = year; i > 1900; i--) {
    let opt = document.createElement("option");
    opt.innerHTML = i;
    yearSelect.appendChild(opt);
  }
}

function generateMonths() {
  let month = [
    "January",
    "February",
    "Mars",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December"
  ];
  for (let i = 0; i < month.length; i++) {
    let opt = document.createElement("option");
    opt.value = i + 1;
    opt.innerHTML = month[i];
    monthSelect.appendChild(opt);
  }
}
