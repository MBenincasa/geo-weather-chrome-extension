document.addEventListener("DOMContentLoaded", function () {
    getLocation();
});

function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(getWeather);
    } else {
        alert("Geolocation is not supported by this browser.");
    }
}

function getWeather(position) {
    const apiKey = "<OOPNWEATHERMAP_API_KEY>";
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`;
  
    fetch(apiUrl)
        .then((response) => response.json())
        .then((data) => {
            displayWeather(data);
        })
        .catch((error) => {
            console.error("Error fetching weather data:", error);
        });
}

function displayWeather(data) {
    const locationElement = document.getElementById("location");
    const weatherElement = document.getElementById("weather");
  
    const location = data.name;
    const temperature = data.main.temp;
    const description = data.weather[0].description;
  
    locationElement.textContent = `Location: ${location}`;
    weatherElement.textContent = `Temperature: ${temperature}°C, Description: ${description}`;
}