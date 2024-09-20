function updatedTemperature(response) {
  let temperature = document.querySelector("#temperature");
  temperatureValue = response.data.temperature.current;
  let currentCity = document.querySelector("#current-city");
  let description = document.querySelector("#description");
  let windSpeed = document.querySelector("#windSpeed");
  speedOfWind = response.data.wind.speed;
  let humidity = document.querySelector("#humidity");
  let currentTime = document.querySelector("#current-time");
  let date = new Date(response.data.time * 1000);
  currentCity.innerHTML = response.data.city;
  temperature.innerHTML = Math.round(temperatureValue);
  description.innerHTML = response.data.condition.description;
  windSpeed.innerHTML = `${Math.round(speedOfWind)} km/h <br/> wind`;
  humidity.innerHTML = `${response.data.temperature.humidity} <br/> humidity`;
  currentTime.innerHTML = dateFormat(date);
}
function dateFormat(date) {
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[date.getDay()];

  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  let hours = date.getHours();
  return `${day}  ${hours}:${minutes}`;
}
function search(city) {
  let key = "f1d4abdc3aeo0d6af4ddd53f42t144ba";
  let url = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${key}&units=metric`;
  axios.get(url).then(updatedTemperature);
}

function handleSearch(event) {
  event.preventDefault();
  let cityInput = document.querySelector("#search-city");

  search(cityInput.value);
}
let searchCity = document.querySelector("#search-form");
searchCity.addEventListener("submit", handleSearch);
search("Nairobi");
