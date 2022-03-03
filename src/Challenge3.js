let weather = {
  "paris": {
    temp: 19.7,
    humidity: 80
  },
  "tokyo": {
    temp: 17.3,
    humidity: 50
  },
  "lisbon": {
    temp: 30.2,
    humidity: 20
  },
  "san francisco": {
    temp: 20.9,
    humidity: 100
  },
  "moscow": {
    temp: -5,
    humidity: 20
  }
};
let city = prompt ("Enter a city");
city = city.trim().toLowerCase();

if (weather[city] !== undefined) {
let farenheith = ((weather[city].temp * 9) / 5 )+ 32 ;
farenheith = Math.round(farenheith);
let celcius = Math.round(weather[city].temp);
let humid = weather[city].humidity; 
    alert (`It is currently ${celcius}°C  (${farenheith}°F) in ${city} with a humidity of ${humid} %`);
} else {
alert (`Sorry we don't know the weather for this city, try going to https://www.google.com/search?q=weather+${city}`);
};
