
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

//5-day forecast
function displayForecast(response) {
  let forecastElement = document.querySelector("#forecast");
    forecastElement.innerHTML = null;


  for (let index = 1; index < 6; index++) {
    forecast = response.data.daily[index];
    forecastElement.innerHTML += `
      <div class="col">
        <div class="card text-center h-100">
         <div class="card-title" id="day">${formatDate(forecast.dt * 1000).slice(0,3)}</div>
          <i class="card-img-top wi wi-owm-${forecast.weather[0].id}"></i>
          <div class="card-body" id="range">
            <h6 id="description">${forecast.weather[0].main}</h6>
            <div id="forecast-temps" class="high">${Math.round(forecast.temp.max)}</div>
            <div id="forecast-temps" class="low">${Math.round(forecast.temp.min)}</div>
          </div>
        </div>
      </div>
    `
  }
}

// Current weather
function displayWeather(response) {
  let iconId = response.data.weather[0].id;
  let description = response.data.weather[0].description;
  let city = response.data.name;
  let humidity = response.data.main.humidity;
  fahrenheitTemp = Math.round(response.data.main.temp);
  imperialSpeed = Math.round(response.data.wind.speed);


  document.querySelector("#icon").classList.add(`wi-owm-${iconId}`);
  document.querySelector("#description").innerHTML = `${description}`;
  document.querySelector("#temperature").innerHTML = `${fahrenheitTemp}${tempUnit}`;
  document.querySelector("#city").innerHTML = `${city}`;
  document.querySelector("#humidity").innerHTML = `Humidity: ${humidity}%`;
  document.querySelector("#wind").innerHTML = `Windspeed: ${imperialSpeed} ${speedUnit}`;

  let latitude = response.data.coord.lat;
  let longitude = response.data.coord.lon;
  apiUrl = `${apiEndpoint}onecall?lat=${latitude}&lon=${longitude}&exclude=minutely,hourly&appid=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(displayForecast);
}

// Get location from form
function handleCity(event) {
  event.preventDefault();
  let city = document.querySelector("#location-input").value.trim();
  if (city !== "") {
    searchCity(city);
  } else {
    alert(
      "Please enter your location or click Get Weather for My Current Location."
    );
  }
}

function searchCity(city) {
  let apiUrl = `${apiEndpoint}weather?q=${city}&appid=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(displayWeather);
}

//Get location from navigator
function searchCoords(event) {
  event.preventDefault();

  function showPosition(position) {
    let latitude = position.coords.latitude;
    let longitude = position.coords.longitude;
    let apiUrl = `${apiEndpoint}weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=${units}`;

    axios.get(apiUrl).then(displayWeather);
  }
  navigator.geolocation.getCurrentPosition(showPosition);
}

//Unit conversion
function serveMetric(event) {
  event.preventDefault();
  celsius.classList.add("active");
  fahrenheit.classList.remove("active");

  let celsiusTemp = Math.round((fahrenheitTemp - 32)*5/9);
  let metricSpeed = Math.round(imperialSpeed*1.609);
  let tempUnit = "°C";
  let speedUnit = "kph";

  document.querySelector("#temperature").innerHTML = `${celsiusTemp}${tempUnit}`;
  document.querySelector("#wind").innerHTML = `${metricSpeed} ${speedUnit}`;

  let forecastTemps = document.querySelectorAll("#forecast-temps");
    forecastTemps.forEach(function (temp) {
      temp.innerHTML = Math.round((temp.innerHTML - 32) * 5/9);
    });
  chooseCelsius.removeEventListener("click", serveMetric);
  chooseFahrenheit.addEventListener("click", serveImperial);
}

function serveImperial(event) {
  event.preventDefault();
  chooseCelsius.classList.remove("active");
  chooseFahrenheit.classList.add("active");

  document.querySelector("#temperature").innerHTML = `${fahrenheitTemp}${tempUnit}`;
  document.querySelector("#wind").innerHTML = `${imperialSpeed} ${speedUnit}`;

  let forecastTemps = document.querySelectorAll("#forecast-temps");
  forecastTemps.forEach(function (temp) {
    temp.innerHTML = Math.round((temp.innerHTML)*9/5+32);
  });

  chooseCelsius.addEventListener("click", serveMetric);
  chooseFahrenheit.removeEventListener("click", serveImperial);
}

let currentTime = new Date();
let todaysDate = document.querySelector("#local-time");
todaysDate.innerHTML = formatTime(currentTime);

let apiKey = "ca919d3d566d6ae96426df805fb208b2";
let apiEndpoint = "https://api.openweathermap.org/data/2.5/";

let locationForm = document.querySelector("#location-form");
locationForm.addEventListener("submit", handleCity);

let locationDetect = document.querySelector("#current-location");
locationDetect.addEventListener("submit", searchCoords);

let fahrenheitTemp = null;
let imperialSpeed = null;
let forecast = null;
let units = "imperial";
let tempUnit = "°F";
let speedUnit = "mph";

let chooseCelsius = document.querySelector("#celsius");
chooseCelsius.addEventListener("click", serveMetric);

let chooseFahrenheit = document.querySelector("#fahrenheit");
chooseFahrenheit.addEventListener("click", serveImperial);

searchCity("Boston");