async function fetchWeather(city) {
    const apiKey = '0861a71976184ff598504953240202'; // Replace with your actual API key
    const baseUrl = 'https://api.weatherapi.com/v1/current.json';

    try {
        // Construct the API URL
        const url = `${baseUrl}?key=${apiKey}&q=${encodeURIComponent(city)}&aqi=no`;
        console.log("Request URL:", url);

        // Fetch the weather data
        const response = await fetch(url);

        // Check if the response is successful
        if (!response.ok) {
            const errorText = await response.text();
            console.error('Error Response:', errorText);
            throw new Error('City not found. Please try again.');
        }

        // Parse the JSON response
        const data = await response.json();
        console.log('API Response:', data);

        // Display weather information
        document.getElementById('weather-output').innerHTML = `
            <h2>Weather for ${data.location.name}, ${data.location.country}</h2>
            <p><strong>Temperature:</strong> ${data.current.temp_c}°C</p>
            <p><strong>Condition:</strong> ${data.current.condition.text}</p>
            <p><strong>Feels Like:</strong> ${data.current.feelslike_c}°C</p>
            <p><strong>Humidity:</strong> ${data.current.humidity}%</p>
            <p><strong>Wind:</strong> ${data.current.wind_kph} km/h</p>
        `;
    } catch (error) {
        console.error('Fetch Error:', error);
        document.getElementById('weather-output').innerHTML = `<p style="color: red;">${error.message}</p>`;
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
