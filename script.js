let klocka = document.querySelector("#klocka");

setInterval(
  (clock = () => {
    let todayDate = new Date();

    let hours = todayDate.getHours();
    let minutes = todayDate.getMinutes();
    let seconds = todayDate.getSeconds();
    if (seconds < 10) {
      seconds = `0${todayDate.getSeconds()}`;
    }
    if (minutes < 10) {
      minutes = `0${todayDate.getMinutes()}`;
    }
    if (hours < 10) {
      hours = `0${todayDate.getHours()}`;
    }
    let time = `${hours}:${minutes}:${seconds}`;

    klocka.innerHTML = time;
  }),
  500
);
