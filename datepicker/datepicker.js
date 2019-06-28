"use strict";

//////////////////////////////////

let dpContainer = document.querySelector(".dp-container");
let yearSelect = document.querySelector(".yearSelect");
let monthSelect = document.querySelector(".monthSelect");
let getDateBtn = document.querySelector(".dateBtn");
let closeBtn = document.querySelector(".close");
let confirmBtn = document.querySelector(".confirm");
let datePick = dpContainer.querySelectorAll(".date");
let yearOutput = document.querySelector(".year-output");

let valueYear = "";
let valueMonth = "";
let valueDay = "";
let dayLock;
let lastMonth;
let lastDay;
let canPickDate = false;
let leapYear = false;

///////////////////////////////////////
//////////////////////////////////////

getDateBtn.addEventListener("click", () => {
  reset();
  generateYears();
  generateMonths();
  dpContainer.style.display = "grid";
});

confirmBtn.addEventListener("mousedown", () => {
  let confirmText = document.querySelector(".confirmText");
  confirmText.classList.add("confirm-clickText");
  confirmBtn.classList.add("confirm-click");
  setTimeout(() => {
    confirmText.classList.remove("confirm-clickText");
    confirmBtn.classList.remove("confirm-click");
  }, 1000);
  setTimeout(confirmClick, 1000);
});

function confirmClick() {
  let outputYear = valueYear;
  if (valueDay === "") {
    yearOutput.innerHTML = `yyyy-mm-dd`;
  } else {
    console.log(
      "types: ",
      typeof valueYear,
      typeof valueMonth,
      typeof valueDay
    );
    console.log("print: ", valueYear, valueMonth, valueDay);
    console.log(outputYear);
    yearOutput.innerHTML = outputYear + "-" + valueMonth + "-" + valueDay;
  }

  dpContainer.style.display = "none";
}

closeBtn.addEventListener("click", () => {
  removeYears();
  dpContainer.style.display = "none";

  if (dayLock) {
    removeDays(lastMonth);
  }

  getDateBtn.value = `yyyy-mm-dd`;

  reset();
});

dpContainer.addEventListener("click", () => {});

yearSelect.addEventListener("click", event => {
  let selectedYear = event.target.value;
  checkLeapYear(selectedYear);
  valueMonth = monthSelect.value;
  if (dayLock) {
    removeDays(lastMonth);
  }
  if (valueMonth === "") {
    return;
  } else {
    generateDays(valueMonth);
  }
  console.log("when select year: ", valueYear);
  console.log("when sel year type: ", typeof valueYear);
});

monthSelect.addEventListener("change", event => {
  console.log(event.target.value);
  if (dayLock) {
    removeDays(lastMonth);
  }
  generateDays(event.target.value);
  valueMonth = event.target.value;
  if (valueMonth < 10) {
    valueMonth = `0${valueMonth}`;
  }
  canPickDate = true;
});

console.log(datePick);
for (let i = 0; i < datePick.length; i++) {
  datePick[i].addEventListener("click", event => {
    console.log(datePick[i].firstChild);
    if (datePick[i].firstChild === null) {
      return;
    } else {
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
        if (valueDay < 10) {
          valueDay = `0${valueDay}`;
        }
        lastDay = datePick[i];
      }

      for (let i = 0; i < datePick.length; i++) {
        if (datePick[i] != lastDay) {
          datePick[i].classList.remove("selection");
        }
      }
    }
  });
  console.log(lastDay);
}

/////////////////////////////////
///// FUNCTIONS /////////////////
/////////////////////////////////
function reset() {
  valueYear = "";
  valueMonth = "";
  valueDay = "";
  dayLock;
  lastMonth;
  canPickDate = false;
  leapYear = false;
  removeYears();
  dpContainer.style.display = "none";
  if (dayLock) {
    removeDays(lastMonth);
  }
}
function generateYears() {
  let tempY = new Date();
  let year = tempY.getFullYear();
  for (let i = year; i > 1900; i--) {
    let opt = document.createElement("option");
    opt.classList.add("tempYear");
    opt.innerHTML = i;
    yearSelect.appendChild(opt);
  }
  yearSelect.selectedIndex = "0";
}

function removeYears() {
  let tempY = new Date();
  let year = tempY.getFullYear();
  for (let i = 1900; i < year; i++) {
    let opt = document.querySelectorAll(".tempYear");
    for (let i = 0; i < opt.length; i++) {
      // console.log(opt[i]);
      yearSelect.removeChild(opt[i]);
    }
  }
}

function checkLeapYear(selYear) {
  leapYear = false;
  if ((!(selYear % 4) && selYear % 100) || !(selYear % 400)) {
    leapYear = true;
  }
  valueYear = selYear;
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
  monthSelect.selectedIndex = "0";
}

function generateDays(valueMonth) {
  let monthKey;

  if (valueMonth == 2) {
    if (leapYear) {
      monthKey = 29;
    } else {
      monthKey = 28;
    }
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
    slot.classList.remove("selection");
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
