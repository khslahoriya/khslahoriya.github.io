// Function to fetch weather data based on city name
async function fetchWeather(city) {
    try {
        const response = await fetch(`https://api.weatherapi.com/v1/current.json?key=0861a71976184ff598504953240202&q=${city}&aqi=no`);
        if (!response.ok) {
            throw new Error('City not found or invalid API response');
        }
        const data = await response.json();

        // Extract relevant weather information
        const location = data.location.name + ', ' + data.location.region + ', ' + data.location.country;
        const temperature = data.current.temp_c + '°C';
        const condition = data.current.condition.text;

        // Display weather information
        const weatherContainer = document.getElementById('weather-container');
        weatherContainer.innerHTML = `
            <h2>Current Weather</h2>
            <p><strong>Location:</strong> ${location}</p>
            <p><strong>Temperature:</strong> ${temperature}</p>
            <p><strong>Condition:</strong> ${condition}</p>
        `;

        // Update the background based on the weather condition
        updateBackground(condition);

        // Fetch forecast data
        fetchForecast(city);
    } catch (error) {
        console.error('Error fetching weather data:', error);
        const weatherContainer = document.getElementById('weather-container');
        weatherContainer.innerHTML = `<p>${error.message}. Please try another city.</p>`;
    }
}

// Function to fetch forecast data for the city
async function fetchForecast(city) {
    try {
        const response = await fetch(`https://api.weatherapi.com/v1/forecast.json?key=0861a71976184ff598504953240202&q=${city}&days=7&aqi=no&alerts=no`);
        if (!response.ok) {
            throw new Error('Failed to fetch forecast data');
        }
        const data = await response.json();

        // Display forecast data
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
        const forecastContainer = document.getElementById('forecast-container');
        forecastContainer.innerHTML = '<p>Failed to fetch forecast data. Please try again later.</p>';
    }
}

// Function to update the background based on the weather condition
function updateBackground(condition) {
    const body = document.body;

    if (condition.toLowerCase().includes("sunny")) {
        body.style.background = "linear-gradient(135deg, #ffcf70, #ffaf50)";
        body.style.color = "#333";
    } else if (condition.toLowerCase().includes("cloudy") || condition.toLowerCase().includes("overcast")) {
        body.style.background = "linear-gradient(135deg, #d3d3d3, #a6a6a6)";
        body.style.color = "#fff";
    } else if (condition.toLowerCase().includes("rain")) {
        body.style.background = "linear-gradient(135deg, #4f86f7, #2e4cb2)";
        body.style.color = "#fff";
    } else if (condition.toLowerCase().includes("snow")) {
        body.style.background = "linear-gradient(135deg, #ffffff, #cce7ff)";
        body.style.color = "#333";
    } else if (condition.toLowerCase().includes("fog") || condition.toLowerCase().includes("mist")) {
        body.style.background = "linear-gradient(135deg, #b8c6db, #f5f7fa)";
        body.style.color = "#333";
    } else if (condition.toLowerCase().includes("thunder")) {
        body.style.background = "linear-gradient(135deg, #373b44, #4286f4)";
        body.style.color = "#fff";
    } else {
        body.style.background = "linear-gradient(135deg, #4facfe, #00f2fe)";
        body.style.color = "#fff";
    }
}

// Add event listener to fetch weather for user-inputted city
document.addEventListener('DOMContentLoaded', function () {
    const fetchWeatherBtn = document.getElementById('fetch-weather-btn');
    const cityInput = document.getElementById('city-input');

    fetchWeatherBtn.addEventListener('click', function () {
        const city = cityInput.value.trim();
        if (city) {
            fetchWeather(city);
        } else {
            alert('Please enter a city name.');
        }
    });
});
