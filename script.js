// Function to display weather information on the webpage
function displayWeatherData(weatherData) {
    const locationElement = document.querySelector('.location');
    const temperatureElement = document.querySelector('.temperature');
    const descriptionElement = document.querySelector('.description');
    const feelsLikeElement = document.querySelector('.feels-like');
    const humidityElement = document.querySelector('.humidity');
    const windSpeedElement = document.querySelector('.wind-speed');
    const windDirectionElement = document.querySelector('.wind-direction');
    const pressureElement = document.querySelector('.pressure');
    const cloudCoverageElement = document.querySelector('.cloud-coverage');
    const precipitationElement = document.querySelector('.precipitation');
    const uvIndexElement = document.querySelector('.uv-index');
  
    locationElement.textContent = weatherData.location;
    temperatureElement.textContent = weatherData.temperature;
    descriptionElement.textContent = weatherData.description;
    feelsLikeElement.textContent = weatherData.feelsLike;
    humidityElement.textContent = weatherData.humidity;
    windSpeedElement.textContent = weatherData.windSpeed;
    windDirectionElement.textContent = weatherData.windDirection;
    pressureElement.textContent = weatherData.pressure;
    cloudCoverageElement.textContent = weatherData.cloudCoverage;
    precipitationElement.textContent = weatherData.precipitation;
    uvIndexElement.textContent = weatherData.uvIndex;
  }
  
  // Function to toggle dark mode
  function toggleDarkMode() {
    const containerElement = document.querySelector('.container');
    const bodyElement = document.body;
    
    containerElement.classList.toggle('dark-mode');
    bodyElement.classList.toggle('dark-mode-body');
  }
  
  
  // Function to handle search button click
  function handleSearch() {
    const searchInput = document.querySelector('#search-input');
    const location = searchInput.value.trim();
  
    if (location !== '') {
      getWeatherData(location);
      searchInput.value = '';
    }
  }
  
  // Function to get weather data based on location
  function getWeatherData(location) {
    const apiKey = 'f5241507bb2a4bf1bfb171149231805';
    const apiUrl = `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${location}`;
  
    fetch(apiUrl)
      .then(response => response.json())
      .then(data => {
        // Extract relevant weather information
        const location = data.location.name;
        const temperature = data.current.temp_c;
        const description = data.current.condition.text;
        const feelsLike = data.current.feelslike_c;
        const humidity = data.current.humidity;
        const windSpeed = data.current.wind_kph;
        const windDirection = data.current.wind_dir;
        const pressure = data.current.pressure_mb;
        const cloudCoverage = data.current.cloud;
        const precipitation = data.current.precip_mm;
        const uvIndex = data.current.uv;
  
        // Create weather object
        const weatherData = {
          location,
          temperature,
          description,
          feelsLike,
          humidity,
          windSpeed,
          windDirection,
          pressure,
          cloudCoverage,
          precipitation,
          uvIndex
        };
  
        // Display weather data on the webpage
        displayWeatherData(weatherData);
      })
      .catch(error => {
        console.log('Error fetching weather data:', error);
      });
  }
  
  // Function to get the user's current location
  function getCurrentLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        position => {
          const { latitude, longitude } = position.coords;
          getWeatherData(`${latitude},${longitude}`);
        },
        error => {
          console.log('Error getting current location:', error);
          // Fallback to a default location
          getWeatherData('New York');
        }
      );
    } else {
      console.log('Geolocation is not supported by this browser.');
      // Fallback to a default location
      getWeatherData('New York');
    }
  }
  
  // Event listener for dark mode toggle
  document.getElementById('dark-mode-checkbox').addEventListener('change', toggleDarkMode);
  
  // Event listener for search button
  document.getElementById('search-button').addEventListener('click', handleSearch);
  
  // Call the function to get the user's current location and display weather data
  getCurrentLocation();
  