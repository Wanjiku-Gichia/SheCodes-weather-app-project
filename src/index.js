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
  let icon = document.querySelector("#icon");

  currentCity.innerHTML = response.data.city;
  temperature.innerHTML = Math.round(temperatureValue);
  description.innerHTML = response.data.condition.description;
  windSpeed.innerHTML = `${Math.round(speedOfWind)} km/h <br/> wind`;
  humidity.innerHTML = `${response.data.temperature.humidity} %<br/> humidity`;
  currentTime.innerHTML = dateFormat(date);
  icon.innerHTML = `<img src="${response.data.condition.icon_url}" class="weather-app-icon" />`;
  getForecast(response.data.city);
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
function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  return days[date.getDay()];
}
function formatDate(timestamp) {
  let date = new Date(timestamp * 1000);
  let dayOfTheMonth = date.getDate();
  let monthOfYear = date.getMonth() + 1;
  return `${dayOfTheMonth}/${monthOfYear}`;
}

function getForecast(city) {
  let apiKey = "f1d4abdc3aeo0d6af4ddd53f42t144ba";
  let url = `https://api.shecodes.io/weather/v1/forecast?query=${city}&key=${apiKey}`;
  axios.get(url).then(displayForecast);
}

function displayForecast(response) {
  let forecastHtml = "";
  response.data.daily.forEach(function (day, index) {
    let highestTemperature = document.querySelector("#highestTemperatureValue");
    highestTemperature.innerHTML = Math.round(day.temperature.maximum);
    let lowestTemperature = document.querySelector("#lowestTemperatureValue");
    lowestTemperature.innerHTML = Math.round(day.temperature.minimum);

    if (index < 5) {
      forecastHtml =
        forecastHtml +
        `
<div class="weatherForecast">
            <span class="day">
              <span class="dayOfWeek">${formatDay(day.time)}</span><br />
              <span class="date">${formatDate(day.time)}</span>
            </span>
            <span class="emoji"><img src="${day.condition.icon_url}"/></span>
            <span class="forecastLowTemperature">
              <span class="lowValue">${Math.round(
                day.temperature.minimum
              )}°</span><br />
              <span class="lowLabel">low</span>
            </span>
            <span class="forecastHighTemperature">
              <span class="highValue">${Math.round(
                day.temperature.maximum
              )}°</span><br />
              <span class="highLabel">high</span>
            </span>
            <span class="forecastWindSpeed">
              <span class="windValue">${Math.round(
                day.wind.speed
              )}kmh</span><br />
              <span class="windLabel">wind</span>
            </span>
            <span class="forecastHumidity">
              <span class="humidityValue">${
                day.temperature.humidity
              }%</span><br />
              <span class="humidityLabel">humidity</span>
            </span>
          </div>`;
    }
  });
  let forecast = document.querySelector("#weatherForecast");
  forecast.innerHTML = forecastHtml;
}
