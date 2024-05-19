async function getForecastData(location) {
    try {
        const response = await fetch(`/forecast?location=${location}`);
        if (!response.ok) throw new Error('Invalid location');
        const data = await response.json();
        displayForecastItems(data.list);
    } catch (error) {
        console.log('Error fetching forecast data:', error);
    }
}

function displayForecastItems(forecastItems) {
    const forecastContainer = document.querySelector('.forecast-items');
    forecastContainer.innerHTML = ''; // Clear previous forecast items

    forecastItems.forEach(item => {
        const forecastItem = document.createElement('div');
        forecastItem.classList.add('forecast-item');

        const dateTime = new Date(item.dt * 1000); // Convert timestamp to milliseconds
        const date = dateTime.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' });
        const time = dateTime.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });

        let iconUrl;
        const description = item.weather[0].description;
        if (description.includes("clouds")) {
            iconUrl = './Assets/icons/cloudy.gif';
        } else if (description.includes("rain")) {
            iconUrl = './Assets/icons/rain.gif';
        } else if (description.includes("wind")) {
            iconUrl = './Assets/icons/wind.gif';
        } else {
            iconUrl = './Assets/icons/clearsky.gif';
        }
        forecastItem.style.backgroundImage = `url(${iconUrl})`;

        forecastItem.innerHTML = `
            <p>Date: ${date}</p>
            <p>Day: ${dateTime.toLocaleDateString('en-US', { weekday: 'long' })}</p>
            <p>Time: ${time}</p>
            <p>Temp <i class="fas fa-thermometer-half"></i>: ${item.main.temp} °C</p>
            <p>Min <i class="fas fa-thermometer-half"></i>: ${item.main.temp_min} °C</p>
            <p>Max <i class="fas fa-thermometer-half"></i>: ${item.main.temp_max} °C</p>
            <p>Humidity <i class="fas fa-tint"></i>: ${item.main.humidity}%</p>
            <p>Wind Speed <i class="fas fa-wind"></i>: ${item.wind.speed} m/s</p>
            <p>Weather: ${item.weather[0].description}</p>
        `;

        forecastContainer.appendChild(forecastItem);
    });
}
