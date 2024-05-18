// Function to get user's current position
function getCurrentPosition() {
    return new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, reject);
    });
}

// Event listener for the search button
document.getElementById('search-button').addEventListener('click', () => {
    const location = document.getElementById('location-input').value;
    if (location) {
        getWeatherData(location);
        getForecastData(location);
    } else {
        alert('Please enter a valid location.');
    }
});

// Event listener for the use location button
document.getElementById('use-location-button').addEventListener('click', async () => {
    try {
        const position = await getCurrentPosition();
        const { latitude, longitude } = position.coords;
        const locationUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=${apiKey}`;
        const response = await fetch(locationUrl);
        if (!response.ok) throw new Error('Error fetching location data');
        const data = await response.json();
        populateWeatherData(data);

        const forecastApiUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&units=metric&appid=${apiKey}`;
        const forecastResponse = await fetch(forecastApiUrl);
        const forecastData = await forecastResponse.json();
        const forecastItems = forecastData.list;
        displayForecastItems(forecastItems);

        document.getElementById('location-input').value = `${data.name}, ${data.sys.country}`;
        // Update the search bar with the current location
        

    } catch (error) {
        console.error('Error fetching location data:', error);
    }
});

// Set default location on page load
window.addEventListener('load', () => {
    getWeatherData('Visakhapatnam');
    getForecastData('Visakhapatnam');
});
