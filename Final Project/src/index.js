import axios from "axios";

// Time display
function formatDate(today) {
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday"
  ];
  let day = days[today.getDay()];
  let currentHour = today.getHours();
  if (currentHour < 10) {
    currentHour = `0${currentHour}`;
  }
  let currentMinutes = today.getMinutes();
  if (currentMinutes < 10) {
    currentMinutes = `0${currentMinutes}`;
  }
  return `${day} ${currentHour}:${currentMinutes}`;
}

//Temp display in default units
function displayTemp(response) {
  let currentTemp = Math.round(response.data.main.temp);
  let city = response.data.name;
  let defaultUnit = "°C";
  document.querySelector("p .temperature").innerHTML = currentTemp;
  document.querySelector("p .degree").innerHTML = defaultUnit;
  document.querySelector("p .location").innerHTML = city;
}

// Location entry form
function searchByCity(event) {
  event.preventDefault();
  let city = document.querySelector("#location-input").value.trim();
  let units = "metric";
  let apiKey = "ca919d3d566d6ae96426df805fb208b2";
  let apiEndpoint = "https://api.openweathermap.org/data/2.5/weather?";
  let apiUrl = `${apiEndpoint}q=${city}&appid=${apiKey}&units=${units}`;

  if (city !== " ") {
    axios.get(apiUrl).then(displayTemp);
  } else {
    alert(
      "Please enter your location or click Get Weather for My Current Location."
    );
  }
}

//Location coordinates
function searchByCoords(event) {
  event.preventDefault();

  function showPosition(position) {
    let latitude = position.coords.latitude;
    let longitude = position.coords.longitude;
    let units = "metric";
    let apiKey = "ca919d3d566d6ae96426df805fb208b2";
    let apiEndpoint = "https://api.openweathermap.org/data/2.5/weather?";
    let apiUrl = `${apiEndpoint}lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=${units}`;

    axios.get(apiUrl).then(displayTemp);
  }
  navigator.geolocation.getCurrentPosition(showPosition);
}

//Celcius v Farenheit Links - couldn't get these to respond dynamically, will keep working at it
function serveCelcius(event) {
  event.preventDefault();
}

function serveFarenheit(event) {
  event.preventDefault();
}

let currentTime = new Date();
let todaysDate = document.querySelector("h2");
todaysDate.innerHTML = formatDate(currentTime);

let locationForm = document.querySelector("#location-form");
locationForm.addEventListener("submit", searchByCity);

let locationDetect = document.querySelector("#current-location");
locationDetect.addEventListener("submit", searchByCoords);

let celSelected = document.querySelector("#cel-select");
celSelected.addEventListener("click", serveCelcius);

let farSelected = document.querySelector("#far-select");
farSelected.addEventListener("click", serveFarenheit);
