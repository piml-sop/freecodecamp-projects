const select = document.getElementById('city-select');
const btn = document.getElementById('get-weather-btn');
const weatherIcon = document.getElementById('weather-icon');
const weatherMain = document.getElementById('weather-main');
const mainTemp = document.getElementById('main-temperature');
const feelsLike = document.getElementById('feels-like');
const humidity = document.getElementById('humidity');
const windSpeed = document.getElementById('wind');
const windGust = document.getElementById('wind-gust');
const locationEl = document.getElementById('location');

async function getWeather(city) {
    try {
        const url = `https://weather-proxy.freecodecamp.rocks/api/city/${encodeURIComponent(city)}`;
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error(error);
        return null;
    }
}

async function showWeather(city) {
    const data = await getWeather(city);
    if (!data || !data.weather || !data.main) {
        alert('Something went wrong, please try again later.');
        return;
    }

    const icon = data.weather[0]?.icon || '';
    weatherIcon.src = icon;
    weatherIcon.alt = data.weather[0]?.main || 'Weather icon';
    weatherMain.textContent = data.weather[0]?.main || 'N/A';

    mainTemp.textContent = data.main.temp != null ? data.main.temp : 'N/A';
    feelsLike.textContent = data.main.feels_like != null ? data.main.feels_like : 'N/A';
    humidity.textContent = data.main.humidity != null ? data.main.humidity : 'N/A';

    windSpeed.textContent = data.wind?.speed != null ? data.wind.speed : 'N/A';
    windGust.textContent = data.wind?.gust != null ? data.wind.gust : 'N/A';

    locationEl.textContent = data.name || 'N/A';
}

btn.addEventListener('click', () => {
    const selectedOption = select.options[select.selectedIndex];
    const city = selectedOption.value;
    if (!city) return;
    showWeather(city);
});
