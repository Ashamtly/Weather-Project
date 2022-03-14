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

function searchCity(city){  
  let apiKey = "0401d75eba16100d78dca41d3674fcdc";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;
  axios.get(apiUrl).then(showWeather);
}

function yourCity (event) {
  event.preventDefault();
  let cityInput = document.querySelector("#enter-city-input");
  let h1 = document.querySelector("#shown-city");
  let city = cityInput.value;
  if (city) {
    h1.innerHTML = `${city}`;
  } else {
    h1.innerHTML = null;
    alert("Please enter a city");
  }
  searchCity (city)
}

function showWeather(response){
    let localCity = document.querySelector("#shown-city");
    localCity.innerHTML = response.data.name;
    let localTemp = document.querySelector("span");
    let tempShown = Math.round(response.data.main.temp);
    localTemp.innerHTML = tempShown + "°C";
    let weatherDescription = document.querySelector("#conditions");
    weatherDescription.innerHTML = response.data.weather[0].description;
    let humidityPercentage = document.querySelector("#humid");
    let humid = response.data.main.humidity;
    humidityPercentage.innerHTML = `Humidity: ${humid}%`;
    let wind = document.querySelector("#wind-speed");
    let speed = Math.round(response.data.wind.speed);
    wind.innerHTML = `Wind: ${speed} km/hr`;
    let Icon = document.querySelector("#weather-icon"); 
    let weartherPic = response.data.weather[0].icon;
    Icon.setAttribute("src", `http://openweathermap.org/img/wn/${weartherPic}@2x.png`)
    celcius = Math.round(response.data.main.temp);
    forecastCoords(response.data.coord);
}

function searchPosition(position){
    let apiKey = "0401d75eba16100d78dca41d3674fcdc";
    let lat = position.coords.latitude;
    let lon = position.coords.longitude;
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;
    axios.get(apiUrl).then(showWeather);
}

function getPosition(event){
    event.preventDefault();
    navigator.geolocation.getCurrentPosition(searchPosition);
}

function appColor(){
  let timeColor = new Date().getHours();
if (timeColor < 12) {
    document.getElementById("app-wrapper").style.backgroundColor = "#65B9D3";
} else if (timeColor < 18) {
    document.getElementById("app-wrapper").style.backgroundColor = "#fda403";
} else {
    document.getElementById("app-wrapper").style.backgroundColor = "#2E4F6B";
}
}

function defaultWeather(response){
  let defaultTemperature = document.querySelector("#temp");
  defaultTemperature.innerHTML = Math.round(response.data.main.temp);
  let defaultCity = document.querySelector("#shown-city");
  defaultCity.innerHTML = response.data.name;
  let defaultWeather = document.querySelector("#conditions");
  defaultWeather.innerHTML = response.data.weather[0].description;
  let humidStandar = document.querySelector("#humid");
  humidStandar.innerHTML = "Humidity: " + response.data.main.humidity + "%";
  let standarWind = document.querySelector("#wind-speed");
  standarWind.innerHTML = "Wind: " + Math.round(response.data.wind.speed) + "km/hr";
  let weatherIcon = document.querySelector("#weather-icon"); 
  let weartherSymbol = response.data.weather[0].icon;
  weatherIcon.setAttribute("src", `http://openweathermap.org/img/wn/${weartherSymbol}@2x.png`)
  celcius = Math.round(response.data.main.temp);
  forecastCoords(response.data.coord);
}

function forecastCoords(coordinates){
  let lon = coordinates.lon;
  let lat = coordinates.lat;
  console.log(lon);
  console.log(lat);
  apiCall = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;
  console.log (apiCall);
  axios.get(apiCall).then(showForecast);
}

function showForecast(response){
  let forcast = (response.data.daily);
   let forcastElement = document.querySelector("#forecast");

   let forcastHTML = `<ul class="list-group list-group-flush">`;
   forcast.forEach(function (forcastDay, index){
    if (index < 4){
   forcastHTML = forcastHTML + `
            <li class="list-group-item" id="day2-forecast">
              <div class="row day1">
                <div class="col-4 day">
                  ${forcastDate(forcastDay.dt)}
                </div>
                <div class="col-4 weather">
                  ${forcastDay.weather[0].main}
                </div>
                <div class="col-4 Temp">
                  ${Math.round(forcastDay.temp.max)}°/${Math.round(forcastDay.temp.min)}°
                </div>
              </div>
            </li>
   `;
   forcastElement.innerHTML = forcastHTML + `   
   </ul>
          <a href="#" class="btn btn-success">5 days forecast</a>
     </div>
    </div>`;
    }
  })
}

function forcastDate(timestamp){
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  return days[day];
}

function showFarenheit (event){
    event.preventDefault();
    let temp = document.querySelector("span");
    let celTemp = celcius
    let farenTemp = (celTemp * 9)/5 + 32;
    temp.innerHTML = Math.round(farenTemp)+"°F";
}

function showCelcius (event){
    event.preventDefault();
    let temp = document.querySelector("span");
    let celTemp = celcius;
    temp.innerHTML = celTemp+"°C";
}


let currentDate = document.querySelector("h3.dateTime");
currentDate.innerHTML = formatDate();

let formCity = document.querySelector("#enter-city");
formCity.addEventListener("submit", yourCity);

let locationButton = document.querySelector("#your-location");
locationButton.addEventListener("click", getPosition);

let apiKey = "0401d75eba16100d78dca41d3674fcdc";
let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=Mexico&units=metric&appid=${apiKey}`;
axios.get(apiUrl).then(defaultWeather);

let celcius = null;

let changeFarenheit = document.querySelector("#farenheit-units");
changeFarenheit.addEventListener("click", showFarenheit);
let changeCelcius = document.querySelector("#celcius-units");
changeCelcius.addEventListener("click", showCelcius);

appColor();