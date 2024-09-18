function updatedTemperature(response) {
  let temperature = document.querySelector("#temperature");
  temperatureValue = response.data.temperature.current;
  let currentCity = document.querySelector("#current-city");
  currentCity.innerHTML = response.data.city;
  temperature.innerHTML = Math.round(temperatureValue);
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
