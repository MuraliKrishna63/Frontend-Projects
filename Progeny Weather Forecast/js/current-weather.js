// current-weather.js
var apiKeys = '29928d766a52d3c7cfeb5f13cdfb8a0a'; // Replace with your OpenWeatherMap API key
var apiBaseUrl = `https://api.openweathermap.org/data/2.5/forecast?units=metric&appid=${apiKeys}`;

// Function to fetch current weather data asynchronously
async function getWeatherData(location) {
    try {
        const response = await fetch(`${apiBaseUrl}&q=${location}`);
        if (!response.ok) throw new Error('Invalid location');
        const data = await response.json();
        populateWeatherData(data);
    } catch (error) {
        // Handle errors
        console.log('Error fetching weather data:', error);
    }
}

// Populate weather data into HTML elements
function populateWeatherData(data) {
    document.getElementById('temperature').textContent = data.list[0].main.temp;
    document.getElementById('max-temp').textContent = data.list[0].main.temp_max;
    document.getElementById('min-temp').textContent = data.list[0].main.temp_min;
    document.getElementById('description').textContent = data.list[0].weather[0].description;
    document.getElementById('humidity').textContent = data.list[0].main.humidity;
    document.getElementById('wind-speed').textContent = data.list[0].wind.speed;

    // Set weather icon image source
    const description = data.list[0].weather[0].description;
    let iconUrl;
    if (description.includes("clouds")) {
        iconUrl = './Assets/icons/cloudy.gif';
    } else if (description.includes("rain")) {
        iconUrl = './Assets/icons/rain.gif';
    } else if (description.includes("wind")) {
        iconUrl = './Assets/icons/wind.gif';
    } else {
        iconUrl = './Assets/icons/clearsky.gif';
    }
    document.querySelector('.weather-info').style.backgroundImage = `url(${iconUrl})`;
}

