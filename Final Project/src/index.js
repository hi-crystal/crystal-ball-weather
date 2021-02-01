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

//5-day forecast display
function displayForecast(response) {
  let forecastElement = document.querySelector("#forecast");
  forecastElement.innerHTML = null;
  let forecast = null;

  for (let index = 0; index < 5; index++) {
    forecast = response.data.daily[index];
    console.log(forecast);
    forecastElement.innerHTML += `
    <div class="col">
    <div class="card text-center h-100">
    <img src="images/sun.svg" class="card-img-top" alt="">
      <div class="card-title" id="day">${forecast.dt}
        </div>
        <div class="card-body" id="range">
        <div id="high">${Math.round(forecast.temp.max)}</div>
        <div id="low">${Math.round(forecast.temp.min)}</div>
        </div>
    </div>
  </div>
      `
    }
  }

//Temp display in default units
function displayTemp(response) {
  let currentTemp = Math.round(response.data.main.temp);
  let unit = "metric";
  let unitDisplay = "°C";
  let city = response.data.name;
  let latitude = response.data.coord.lat;
  let longitude = response.data.coord.lon;
  apiUrl = `${apiEndpoint}onecall?lat=${latitude}&lon=${longitude}&exclude=minutely,hourly&appid=${apiKey}&units=${unit}`;

  document.querySelector("p").innerHTML = `It's currently ${currentTemp}${unitDisplay} in ${city}`;
  axios.get(apiUrl).then(displayForecast);
  console.log(apiUrl);
}

// Location entry form
function searchByCity(event) {
  event.preventDefault();
  let city = document.querySelector("#location-input").value.trim();
  let apiUrl = `${apiEndpoint}weather?q=${city}&appid=${apiKey}&units=${units}`;
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
    let apiUrl = `${apiEndpoint}weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=${units}`;

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
let todaysDate = document.querySelector("#local-time");
todaysDate.innerHTML = formatDate(currentTime);

let apiKey = "ca919d3d566d6ae96426df805fb208b2";
let apiEndpoint = "https://api.openweathermap.org/data/2.5/";
let units = "metric";

let locationForm = document.querySelector("#location-form");
locationForm.addEventListener("submit", searchByCity);

let locationDetect = document.querySelector("#current-location");
locationDetect.addEventListener("submit", searchByCoords);

let celSelected = document.querySelector("#cel-select");
celSelected.addEventListener("click", serveCelcius);

let farSelected = document.querySelector("#far-select");
farSelected.addEventListener("click", serveFarenheit);
