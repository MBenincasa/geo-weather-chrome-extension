document.addEventListener("DOMContentLoaded", function () {
  fetch("../config.json")
    .then((response) => response.json())
    .then((config) => {
      const apiKey = config.openWeatherMapApiKey;
      getAirPollutionData(apiKey);
    })
    .catch((error) => {
      showError("Error reading API key from config.json: " + error.message);
    });

  const backLink = document.getElementById("back-link");
  backLink.addEventListener("click", function () {
    window.location.href = "/source/popup.html";
  });
});

function getAirPollutionData(apiKey) {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition((position) => onGeoSuccess(position, apiKey), onGeoError);
  } else {
    showError("Geolocation is not supported by this browser.");
  }
}

function onGeoSuccess(position, apiKey) {
  const latitude = position.coords.latitude;
  const longitude = position.coords.longitude;
  const apiUrl = `http://api.openweathermap.org/data/2.5/air_pollution?lat=${latitude}&lon=${longitude}&appid=${apiKey}`;

  fetch(apiUrl)
    .then((response) => response.json())
    .then((data) => {
      displayAirPollutionData(data);
    })
    .catch((error) => {
      showError("Error fetching air pollution data: " + error.message);
    });
}

function onGeoError(error) {
  showError("Geolocation error: " + error.message);
}

function displayAirPollutionData(data) {
  const aqiElement = document.getElementById("aqi");
  const coElement = document.getElementById("co");
  const noElement = document.getElementById("no");
  const no2Element = document.getElementById("no2");
  const o3Element = document.getElementById("o3");
  const so2Element = document.getElementById("so2");
  const pm25Element = document.getElementById("pm25");
  const pm10Element = document.getElementById("pm10");
  const nh3Element = document.getElementById("nh3");

  aqiElement.textContent = data.list[0].main.aqi;
  coElement.textContent = data.list[0].components.co;
  noElement.textContent = data.list[0].components.no;
  no2Element.textContent = data.list[0].components.no2;
  o3Element.textContent = data.list[0].components.o3;
  so2Element.textContent = data.list[0].components.so2;
  pm25Element.textContent = data.list[0].components.pm2_5;
  pm10Element.textContent = data.list[0].components.pm10;
  nh3Element.textContent = data.list[0].components.nh3;
}

function showError(errorMsg) {
  const errorElement = document.getElementById("error");
  errorElement.textContent = errorMsg;
}
