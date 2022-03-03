function formatDate() {
  let now = new Date();
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday"
  ];
  let day = days[now.getDay()];
  let hours = now.getHours();
  let min = now.getMinutes();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  if (min < 10) {
    min = `0${min}`;
  }
  let fullDate = `${day} ${hours}:${min}`;
  return fullDate;
}

function yourCity (event) {
  event.preventDefault();
  let cityInput = document.querySelector("#enter-city-input");
  let h1 = document.querySelector("#your-city");
  let city = cityInput.value;
  if (city) {
    h1.innerHTML = `${city}`;
  } else {
    h1.innerHTML = null;
    alert("Please enter a city");
  }
}


let currentDate = document.querySelector("h3.dateTime");
currentDate.innerHTML = formatDate();

let formCity = document.querySelector("#enter-city");
formCity.addEventListener("submit", yourCity);

function showFarenheit (event){
    event.preventDefault();
    let temp = document.querySelector("span");
    let celTemp = 27
    let farenTemp = celTemp * 1.8 + 32;
    temp.innerHTML = Math.round(farenTemp)+"°F";
}

function showCelcius (event){
    event.preventDefault();
    let temp = document.querySelector("span");
    let celTemp = 27;
    temp.innerHTML = celTemp+"°C";
}


let changeFarenheit = document.querySelector("#farenheit-units");
changeFarenheit.addEventListener("click", showFarenheit);
let changeCelcius = document.querySelector("#celcius-units");
changeCelcius.addEventListener("click", showCelcius);