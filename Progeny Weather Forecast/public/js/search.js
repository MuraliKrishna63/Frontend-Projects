function getCurrentPosition() {
    return new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, reject);
    });
}

document.getElementById('search-button').addEventListener('click', () => {
    const location = document.getElementById('location-input').value;
    if (location) {
        getWeatherData(location);
        getForecastData(location);
    } else {
        alert('Please enter a valid location.');
    }
});

document.getElementById('use-location-button').addEventListener('click', async () => {
    try {
        const position = await getCurrentPosition();
        const { latitude, longitude } = position.coords;

        const locationUrl = `/weather?lat=${latitude}&lon=${longitude}`;
        const response = await fetch(locationUrl);
        if (!response.ok) throw new Error('Error fetching location data');
        const data = await response.json();
        populateWeatherData(data);

        const forecastApiUrl = `/forecast?lat=${latitude}&lon=${longitude}`;
        const forecastResponse = await fetch(forecastApiUrl);
        const forecastData = await forecastResponse.json();
        displayForecastItems(forecastData.list);

        document.getElementById('location-input').value = `${data.name}, ${data.sys.country}`;
    } catch (error) {
        console.error('Error fetching location data:', error);
    }
});

window.addEventListener('load', () => {
    getWeatherData('Visakhapatnam');
    getForecastData('Visakhapatnam');
});
