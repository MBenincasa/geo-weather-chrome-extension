# Geo Weather Chrome Extension

## Description

Geo Weather is a Google Chrome extension that allows you to view weather information for your current location using data provided by OpenWeatherMap.

## Features

- Displays the current temperature in Celsius.
- Shows a brief description of the current weather conditions.
- Provides additional information such as humidity, wind speed, rainfall, and snowfall (if available).

## How it Works

The extension uses the free API from OpenWeatherMap to fetch weather data for your current location, using your device's geolocation.

## Installation

1. Download the extension source code or clone the repository from GitHub.
2. Open Google Chrome and type `chrome://extensions` in the address bar.
3. Enable Developer mode in the top-right corner.
4. Click "Load unpacked" and select the extension folder.
5. The extension will be loaded and available in the top-right corner of the Chrome window.

## OpenWeatherMap API Credentials

The extension uses the free API from OpenWeatherMap to fetch weather data. To use the extension, you need to obtain a free API key from OpenWeatherMap and insert it into the `popup.js` file as the value of the `apiKey` variable.

## License

This project is licensed under the [GPL 3.0 License](https://www.gnu.org/licenses/gpl-3.0.html).

## Contributions

Contributions and suggestions to improve this extension are welcome. If you want to contribute, fork the repository, make the changes, and submit a pull request.
