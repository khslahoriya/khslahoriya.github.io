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

        // Update the background based on the weather condition
        updateBackground(data.current.condition.text);

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

// Function to update the background based on the weather condition
function updateBackground(condition) {
    const body = document.body;

    switch (condition.toLowerCase()) {
        case "sunny":
            body.style.background = "linear-gradient(135deg, #ffcf70, #ffaf50)";
            body.style.color = "#333";
            break;
        case "partly cloudy":
        case "cloudy":
            body.style.background = "linear-gradient(135deg, #d3d3d3, #a6a6a6)";
            body.style.color = "#fff";
            break;
        case "rain":
        case "light rain":
        case "heavy rain":
            body.style.background = "linear-gradient(135deg, #4f86f7, #2e4cb2)";
            body.style.color = "#fff";
            break;
        case "snow":
            body.style.background = "linear-gradient(135deg, #ffffff, #cce7ff)";
            body.style.color = "#333";
            break;
        case "fog":
        case "mist":
            body.style.background = "linear-gradient(135deg, #b8c6db, #f5f7fa)";
            body.style.color = "#333";
            break;
        case "thunderstorm":
            body.style.background = "linear-gradient(135deg, #373b44, #4286f4)";
            body.style.color = "#fff";
            break;
        default:
            body.style.background = "linear-gradient(135deg, #4facfe, #00f2fe)";
            body.style.color = "#fff";
            break;
    }
}

// Call the fetchWeather function when the page loads
document.addEventListener('DOMContentLoaded', function () {
    const cityDropdown = document.getElementById('city');
    // Add event listener to fetch weather data when the selected city changes
    cityDropdown.addEventListener('change', function () {
        const selectedCity = this.value;
        fetchWeather(selectedCity);
    });
    // Fetch weather data for the initially selected city
    fetchWeather(cityDropdown.value);
});
