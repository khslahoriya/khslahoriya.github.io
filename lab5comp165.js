// Function to fetch weather data based on selected city
async function fetchWeather(city) {
    try {
        const response = await fetch(`https://api.weatherapi.com/v1/current.json?key=0861a71976184ff598504953240202&q=${city}&aqi=no`);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();

        // Extract relevant weather information from the API response
        const location = data.location.name + ', ' + data.location.region + ', ' + data.location.country;
        const temperature = data.current.temp_c + '°C';
        const condition = data.current.condition.text;

        // Display current weather information on the webpage
        const weatherContainer = document.getElementById('weather-container');
        weatherContainer.innerHTML = `
            <h2>Current Weather</h2>
            <p><strong>Location:</strong> ${location}</p>
            <p><strong>Temperature:</strong> ${temperature}</p>
            <p><strong>Condition:</strong> ${condition}</p>
        `;

        // Fetch and display forecast data
        fetchForecast(city);
    } catch (error) {
        console.error('Error fetching weather data:', error);
        // Display error message on the webpage
        const weatherContainer = document.getElementById('weather-container');
        weatherContainer.innerHTML = '<p>Failed to fetch weather data. Please try again later.</p>';
    }
}

// Function to fetch forecast data based on selected city
async function fetchForecast(city) {
    try {
        const response = await fetch(`https://api.weatherapi.com/v1/forecast.json?key=0861a71976184ff598504953240202&q=${city}&days=7&aqi=no&alerts=no`);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();

        // Extract and display forecast data
        const forecastContainer = document.getElementById('forecast-container');
        forecastContainer.innerHTML = '<h2>7-Day Forecast</h2>';
        data.forecast.forecastday.forEach(day => {
            forecastContainer.innerHTML += `
                <div>
                    <p><strong>Date:</strong> ${day.date}</p>
                    <p><strong>Average Temperature:</strong> ${day.day.avgtemp_c}°C</p>
                    <p><strong>Condition:</strong> ${day.day.condition.text}</p>
                </div>
            `;
        });
    } catch (error) {
        console.error('Error fetching forecast data:', error);
        // Display error message on the webpage
        const forecastContainer = document.getElementById('forecast-container');
        forecastContainer.innerHTML = '<p>Failed to fetch forecast data. Please try again later.</p>';
    }
}

// Call the fetchWeather function when the page loads
document.addEventListener('DOMContentLoaded', function() {
    const cityDropdown = document.getElementById('city');
    // Add event listener to fetch weather data when the selected city changes
    cityDropdown.addEventListener('change', function() {
        const selectedCity = this.value;
        fetchWeather(selectedCity);
    });
    // Fetch weather data for the initially selected city
    fetchWeather(cityDropdown.value);
});