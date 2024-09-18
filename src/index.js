function handleSearch(event) {
  event.preventDefault();
  let city = document.querySelector("#search-city");
  let currentCity = document.querySelector("#current-city");
  currentCity.innerHTML = city.value;
}
let searchCity = document.querySelector("#search-form");
searchCity.addEventListener("submit", handleSearch);
