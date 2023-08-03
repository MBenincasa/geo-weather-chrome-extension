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
	const apiKey = "<OPENWEATHERMAP_API_KEY>";
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
    const weatherElement = document.getElementById("weather");
  
    const location = data.name;
    const temperature = data.main.temp;
    const description = data.weather[0].description;
    const humidity = data.main.humidity;
    const windSpeed = data.wind.speed;
    const iconUrl = `https://openweathermap.org/img/w/${data.weather[0].icon}.png`;
    const rain = data.rain ? data.rain["1h"] : 0;
    const snow = data.snow ? data.snow["1h"] : 0;
  
    locationElement.textContent = `Location: ${location}`;
    weatherElement.innerHTML = `
      	<p><strong>Temperature:</strong> ${temperature}°C</p>
      	<p><strong>Description:</strong> ${description}</p>
      	<p><strong>Humidity:</strong> ${humidity}%</p>
      	<p><strong>Wind Speed:</strong> ${windSpeed} m/s</p>
      	<p><strong>Rain (last hour):</strong> ${rain} mm</p>
      	<p><strong>Snow (last hour):</strong> ${snow} mm</p>
      	<img src="${iconUrl}" alt="${description}">`;
}
  
function showError(errorMsg) {
    const errorElement = document.getElementById("error");
    errorElement.textContent = errorMsg;
}