const apiKey = '29928d766a52d3c7cfeb5f13cdfb8a0a'; // Replace with your OpenWeatherMap API key
let apiUrl = `https://api.openweathermap.org/data/2.5/weather?units=metric&appid=${apiKey}`;

// Function to fetch weather data
async function getWeatherData(location) {
    try {
        const response = await fetch(`${apiUrl}&q=${location}`);
        if (!response.ok) throw new Error('Invalid location');
        const data = await response.json();
        populateWeatherData(data);
    } catch (error) {
        alert('Invalid location. Please enter a valid location.');
    }
}

// Function to populate weather data into HTML elements
function populateWeatherData(data) {
    document.getElementById('temperature').textContent = data.main.temp;
    document.getElementById('description').textContent = data.weather[0].description;
    document.getElementById('humidity').textContent = data.main.humidity;
    document.getElementById('wind-speed').textContent = data.wind.speed;
    document.querySelector('.weather-icon').style.backgroundImage = `url(http://openweathermap.org/img/wn/${data.weather[0].icon}.png)`;
}

// Function to get current position
function getCurrentPosition() {
    return new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, reject);
    });
}

// Event listener for the search button
document.getElementById('search-button').addEventListener('click', () => {
    const location = document.getElementById('location-input').value;
    if (location) getWeatherData(location);
});

// Event listener for the use location button
document.getElementById('use-location-button').addEventListener('click', async () => {
    try {
        const position = await getCurrentPosition();
        const { latitude, longitude } = position.coords;
        const locationUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=${apiKey}`;
        const response = await fetch(locationUrl);
        const data = await response.json();
        populateWeatherData(data);
    } catch (error) {
        console.error('Error fetching location data:', error);
        getWeatherData('London');
    }
});
