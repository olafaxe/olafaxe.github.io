"use strict";

//////////////////////////////////

let dpContainer = document.querySelector(".dp-container");
let yearSelect = document.querySelector(".yearSelect");
let monthSelect = document.querySelector(".monthSelect");
let getDateBtn = document.querySelector(".dateBtn");
let closeBtn = document.querySelector(".close");
let datePick = dpContainer.querySelectorAll(".date");
let datePuck = dpContainer.getElementsByClassName(".date");

let valueYear = "";
let valueMonth = "";
let valueDay = "";
let dayLock;
let lastMonth;
let canPickDate = false;

///////////////////////////////////////
generateYears();
generateMonths();
//////////////////////////////////////

getDateBtn.addEventListener("click", () => {
  dpContainer.style.display = "grid";
});

closeBtn.addEventListener("click", () => {
  dpContainer.style.display = "none";

  if (valueYear === "" || valueMonth === "" || valueDay === "") {
    return;
  } else {
    getDateBtn.value = `${valueYear} / ${valueMonth} / ${valueDay}`;
  }
  // console.log("Final date: ", valueYear, valueMonth, valueDay);
});

dpContainer.addEventListener("click", () => {});

yearSelect.addEventListener("click", () => {
  valueYear = yearSelect.value;
});

monthSelect.addEventListener("change", event => {
  console.log(event.target.value);
  if (dayLock) {
    removeDays(lastMonth);
  }
  generateDays(event.target.value);
  // if (!dayLock) {
  //   generateDays();
  // } else {
  //   removeDays();
  // }
  valueMonth = monthSelect.value;
  canPickDate = true;
});

console.log(datePick);
for (let i = 0; i < datePick.length; i++) {
  datePick[i].addEventListener("click", event => {
    if (datePick[i].classList.contains("selection")) {
      datePick[i].classList.remove("selection");
      valueDay = "No day";
    } else {
      datePick[i].classList.add("selection");
      datePick[i].classList.add("select-date");
      setTimeout(() => {
        datePick[i].classList.remove("select-date");
      }, 1000);
      valueDay = datePick[i].textContent;
    }
  });
}

/////////////////////////////////
///// FUNCTIONS /////////////////
/////////////////////////////////

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
    opt.setAttribute("class", "monthClick");

    monthSelect.appendChild(opt);
  }
}

function generateDays(valueMonth) {
  let monthKey;

  if (valueMonth == 2) {
    monthKey = 28;
  } else {
    if (valueMonth <= 7) {
      if (valueMonth % 2) {
        monthKey = 31;
      } else {
        monthKey = 30;
      }
    } else {
      if (valueMonth % 2) {
        monthKey = 30;
      } else {
        monthKey = 31;
      }
    }
  }
  for (let i = 1; i <= monthKey; i++) {
    let div = document.createElement("div");
    div.textContent = i;
    div.setAttribute("class", "day" + i);
    div.classList.add("dateNum");
    let slot = document.querySelector(".place" + i);
    slot.setAttribute("value", i);
    slot.appendChild(div);
  }
  lastMonth = monthKey;
  dayLock = true;
  console.log(monthKey);
}

function removeDays(monthKey) {
  for (let i = 1; i <= monthKey; i++) {
    let div = document.querySelector(".day" + i);
    let slot = document.querySelector(".place" + i);
    slot.removeAttribute("value", i);
    slot.removeChild(div);
  }
  dayLock = false;
}

// 1 January - 31 days
// 2 February - 28 days in a common year and 29 days in leap years
// 3 March - 31 days
// 4 April - 30 days
// 5 May - 31 days
// 6 June - 30 days
// 7 July - 31 days
// 8 August - 31 days
// 9 September - 30 days
// 10 October - 31 days
// 11 November - 30 days
// 12 December - 31 days
