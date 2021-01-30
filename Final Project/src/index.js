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
let currentTime = new Date();
let todaysDate = document.querySelector("h2");
todaysDate.innerHTML = formatDate(currentTime);

function getLocation(event) {
  event.preventDefault();
  let locationInput = document.querySelector("#location-input");
  let locationDisplay = document.querySelector("p .location");
  if (locationInput.value !== "") {
    locationDisplay.innerHTML = locationInput.value;
  } else {
    alert("Please enter your location.");
  }
}

let locationForm = document.querySelector("#location-form");
locationForm.addEventListener("submit", getLocation);

function serveCelcius(event) {
  event.preventDefault();
  let tempDisplay = document.querySelector("p .temperature");
  let unitDisplay = document.querySelector("p .degree");
  tempDisplay.innerHTML = "2";
  unitDisplay.innerHTML = "°C";
}

function serveFarenheit(event) {
  event.preventDefault();
  let tempDisplay = document.querySelector("p .temperature");
  let unitDisplay = document.querySelector("p .degree");
  tempDisplay.innerHTML = "36";
  unitDisplay.innerHTML = "°F";
}

let celSelected = document.querySelector("#cel-select");
celSelected.addEventListener("click", serveCelcius);

let farSelected = document.querySelector("#far-select");
farSelected.addEventListener("click", serveFarenheit);
