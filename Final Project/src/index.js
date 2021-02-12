
function formatTime(timestamp) {
  let date = new Date(timestamp);
  let hours = date.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  return `${formatDate(timestamp)} ${hours}:${minutes}`;
}

function formatDate(timestamp) {
  let date = new Date(timestamp);
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday"
  ];
  let day = days[date.getDay()];

  return `${day}`;
}

//5-day forecast display
function displayForecast(response) {
  let forecastElement = document.querySelector("#forecast");
  forecastElement.innerHTML = null;
  let forecast = null;

  for (let index = 1; index < 6; index++) {
    forecast = response.data.daily[index];
    forecastElement.innerHTML += `
    <div class="col">
    <div class="card text-center h-100">
    <img src="https://openweathermap.org/img/wn/${forecast.weather[0].icon}@2x.png" class="card-img-top" alt="${forecast.weather[0].description}">
      <div class="card-title" id="day">${formatDate(forecast.dt * 1000)}</div>
        <div class="card-body" id="range">
        <div id="high">${Math.round(forecast.temp.max)}</div>
        <div id="low">${Math.round(forecast.temp.min)}</div>
        <h6 id="description">${forecast.weather[0].main}</h6>
        </div>
    </div>
  </div>
      `
    }
  }

//Temp display in default units (F)
function displayTemp(response) {
  let icon = response.data.weather[0].icon;
  let description = response.data.weather[0].description;
  let currentTemp = Math.round(response.data.main.temp);
  let humidity = response.data.main.humidity;
  let windSpeed = Math.round(response.data.wind.speed);
  let city = response.data.name;
  let latitude = response.data.coord.lat;
  let longitude = response.data.coord.lon;
  apiUrl = `${apiEndpoint}onecall?lat=${latitude}&lon=${longitude}&exclude=minutely,hourly&appid=${apiKey}&units=${units}`;

  document.querySelector("#icon").setAttribute(
    "src", `https://openweathermap.org/img/wn/${icon}@2x.png`
  );
  document.querySelector("#icon").setAttribute(
    "alt", `${description}`
  );
  document.querySelector("#description").innerHTML = `${description}`;
  document.querySelector("#weather").innerHTML = `It's ${currentTemp}${unitDisplay} in ${city}`;
  document.querySelector("#humidity").innerHTML = `Humidity: ${humidity}%`;
  document.querySelector("#wind").innerHTML = `Windspeed: ${windSpeed} mph`;
  axios.get(apiUrl).then(displayForecast);
}

// Location input
function searchByCity(city) {

  let units = "imperial";
  let apiUrl = `${apiEndpoint}weather?q=${city}&appid=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(displayTemp);
}

function submitCity(event) {
  event.preventDefault();
  let city = document.querySelector("#location-input").value.trim();
  if (city !== "") {
    searchByCity(city);
  } else {
    alert(
      "Please enter your location or click Get Weather for My Current Location."
    );
  }
}

//Location detect
function searchByCoords(event) {
  event.preventDefault();

  function showPosition(position) {
    let latitude = position.coords.latitude;
    let longitude = position.coords.longitude;
    let apiUrl = `${apiEndpoint}weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=${units}`;

    axios.get(apiUrl).then(displayTemp);
  }
  navigator.geolocation.getCurrentPosition(showPosition);
}

//Unit conversion
function serveCelcius(event) {
  event.preventDefault();
  celSelected.classList.add("active");
  farSelected.classList.remove("active");


}

function serveFarenheit(event) {
  event.preventDefault();
  celSelected.classList.remove("active");
  farSelected.classList.add("active");

  getUnits("imperial");
}



let currentTime = new Date();
let todaysDate = document.querySelector("#local-time");
todaysDate.innerHTML = formatTime(currentTime);

let apiKey = "ca919d3d566d6ae96426df805fb208b2";
let apiEndpoint = "https://api.openweathermap.org/data/2.5/";

let locationForm = document.querySelector("#location-form");
locationForm.addEventListener("submit", submitCity);

let locationDetect = document.querySelector("#current-location");
locationDetect.addEventListener("submit", searchByCoords);

let units = "imperial";
let unitDisplay = "°F";
let celSelected = document.querySelector("#cel-select");
celSelected.addEventListener("click", serveCelcius);

let farSelected = document.querySelector("#far-select");
farSelected.addEventListener("click", serveFarenheit);

searchByCity("Boston");