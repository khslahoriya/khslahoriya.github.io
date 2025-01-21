// Function to fetch weather for the entered city
async function fetchWeather(city) {
    const apiKey = '0861a71976184ff598504953240202'; // Replace with your WeatherAPI key
    const baseUrl = 'https://api.weatherapi.com/v1/current.json';

    try {
        // Fetch the weather data
        const response = await fetch(`${baseUrl}?key=${apiKey}&q=${city}&aqi=no`);
        
        if (!response.ok) {
            throw new Error('City not found. Please try again.');
        }

        const data = await response.json();

        // Display weather information
        const weatherOutput = document.getElementById('weather-output');
        weatherOutput.innerHTML = `
            <h2>Weather for ${data.location.name}, ${data.location.country}</h2>
            <p><strong>Temperature:</strong> ${data.current.temp_c}°C</p>
            <p><strong>Condition:</strong> ${data.current.condition.text}</p>
            <p><strong>Feels Like:</strong> ${data.current.feelslike_c}°C</p>
            <p><strong>Humidity:</strong> ${data.current.humidity}%</p>
            <p><strong>Wind:</strong> ${data.current.wind_kph} km/h</p>
        `;
    } catch (error) {
        // Handle errors (e.g., invalid city name)
        const weatherOutput = document.getElementById('weather-output');
        weatherOutput.innerHTML = `<p>${error.message}</p>`;
    }
}

// Add event listener to the button
document.getElementById('search-btn').addEventListener('click', () => {
    const cityInput = document.getElementById('city-input').value.trim();
    
    if (cityInput) {
        fetchWeather(cityInput);
    } else {
        alert('Please enter a city name.');
    }
});
