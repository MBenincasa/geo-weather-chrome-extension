document.addEventListener("DOMContentLoaded", function () {
  getLocation();
});

function getLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(getWeather, showError);
  } else {
    showError("Geolocation is not supported by this browser.");
  }
}

function getWeather(position) {
  const apiKey = "<OPENWEATHER_API_KEY>";
  const latitude = position.coords.latitude;
  const longitude = position.coords.longitude;
  const apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`;

  fetch(apiUrl)
    .then((response) => response.json())
    .then((data) => {
      displayWeather(data);
    })
    .catch((error) => {
      showError("Error fetching weather data: " + error.message);
    });
}

function displayWeather(data) {
  const locationElement = document.getElementById("location");
  const temperatureElement = document.getElementById("temperature");
  const descriptionElement = document.getElementById("description");
  const humidityElement = document.getElementById("humidity");
  const windSpeedElement = document.getElementById("wind-speed");
  const rainElement = document.getElementById("rain");
  const snowElement = document.getElementById("snow");
  const weatherIcon = document.getElementById("weather-icon");
  const moreInfoDiv = document.getElementById("more-info");

  locationElement.textContent = `${data.name}`;
  temperatureElement.textContent = `${data.main.temp}°C`;
  descriptionElement.textContent = data.weather[0].description;
  humidityElement.textContent = data.main.humidity;
  windSpeedElement.textContent = data.wind.speed;
  rainElement.textContent = data.rain ? data.rain["1h"] : 0;
  snowElement.textContent = data.snow ? data.snow["1h"] : 0;
  weatherIcon.setAttribute(
    "src",
    `https://openweathermap.org/img/w/${data.weather[0].icon}.png`
  );

  moreInfoDiv.style.display = "block";
}
  
function showError(errorMsg) {
  const errorElement = document.getElementById("error");
  errorElement.textContent = errorMsg;
}