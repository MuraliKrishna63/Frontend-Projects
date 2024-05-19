async function getWeatherData(location) {
    try {
        const response = await fetch(`/weather?location=${location}`);
        if (!response.ok) throw new Error('Invalid location');
        const data = await response.json();
        populateWeatherData(data);
    } catch (error) {
        console.log('Error fetching weather data:', error);
    }
}

function populateWeatherData(data) {
    document.getElementById('temperature').textContent = data.main.temp;
    document.getElementById('max-temp').textContent = data.main.temp_max;
    document.getElementById('min-temp').textContent = data.main.temp_min;
    document.getElementById('description').textContent = data.weather[0].description;
    document.getElementById('humidity').textContent = data.main.humidity;
    document.getElementById('wind-speed').textContent = data.wind.speed;

    const description = data.weather[0].description;
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
