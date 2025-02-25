const apiKey = "985e0df057bccfff41aedd0e4921c21a";
const geoApiUrl = "https://api.openweathermap.org/geo/1.0/direct";
const weatherApiUrl = "https://api.openweathermap.org/data/2.5/weather";

const tempElement = document.querySelector(".temp");
const weatherElement = document.querySelector(".weather");
const searchBar = document.querySelector(".search-bar");
const searchButton = document.querySelector(".submitBtn");

async function getCityCoordinates(city) {
  try {
    const response = await fetch(
      `${geoApiUrl}?q=${city}&limit=1&appid=${apiKey}`
    );
    const data = await response.json();

    if (data.length === 0) {
      throw new Error("City not found");
    }

    return { lat: data[0].lat, lon: data[0].lon };
  } catch (error) {
    alert(error.message);
    return null;
  }
}

async function getWeatherData(city) {
  const coordinates = await getCityCoordinates(city);
  if (!coordinates) return;

  try {
    const { lat, lon } = coordinates;

    console.log(coordinates)

    const response = await fetch(
      `${weatherApiUrl}?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric` // This line
    );
    const data = await response.json();

    tempElement.textContent = `${Math.round(data.main.temp)}°C`;
    weatherElement.textContent = data.weather[0].main;
  } catch (error) {
    console.log(error)
    alert("Error fetching weather data");
  }
}

searchButton.addEventListener("click", () => {
  console.log("search button clicked");
  const city = searchBar.value.trim();

  if (city) getWeatherData(city);
});

searchBar.addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    const city = searchBar.value.trim();
    if (city) getWeatherData(city);
  }
});

