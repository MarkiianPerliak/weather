// Отримати погоду за допомогою OpenWeatherMap API
// Опис: Використайте публічне API OpenWeatherMap
// для отримання поточної погоди. Зробіть GET-запит
// за адресою https://api.openweathermap.org/data/2.5/weather?q={city}&appid={5a1b683a64cf9db9ae06243dca955f3d},
// де {city} - назва міста, а {API_KEY} - ваш ключ API
// OpenWeatherMap. Перегляньте отримані дані щодо погоди.
const submitButton = document.querySelector(".weather__submit-button");

    function createWeatherText(weatherObject) {
    console.log(weatherObject)
    let emojicool = "WeatherEmoji";
   const mainWeather = weatherObject.weather[0].main;

    if (mainWeather === "Rain") {
        emojicool = "🌧️";
    } else if (mainWeather === "Clouds") {
        emojicool = "☁️";
    } else if (mainWeather === "Clear") {
        emojicool = "☀️";
    } else if (mainWeather === "Snow") {
        emojicool = "🌨️";
    } else if (mainWeather === "Drizzle") {
        emojicool = "🌦️";
    } else if (mainWeather === "Thunderstorm") {
        emojicool = "🌩️";
    } else if (mainWeather === "Mist" || mainWeather === "Fog" || mainWeather === "Haze") {
        emojicool = "🌫️";
    }

    const ktemp = weatherObject.main.temp;
    const ctemp = Math.round(ktemp - 273.15);
    const weatherHTML = `
    <div class="weather__box">
        <div class="left__box">
            <h2 class="city">City: ${weatherObject.name}</h1>
            <p class="emoji">${emojicool}</p>
            <p class="gradus">${ctemp}</p>
        </div>
        <div class="right__box">
        <h2 class="country">Country: ${weatherObject.sys.country}</h2>
        <p class="weather">Weather: ${weatherObject.weather[0].main}</p>
        <p class="weather-describtion">Weather Desc: ${weatherObject.weather[0].description}</p>
        <p class="wind-speed">Wind Speed - ${weatherObject.wind.speed}</p>
        <p class="humidity">Humidity - ${weatherObject.main.humidity}</p>
        </div>
    </div>
    `

    document.querySelector(".big__box").insertAdjacentHTML("afterend", weatherHTML)
}

submitButton.addEventListener("click", (event) => {
    const city = document.querySelector(".weather__input-city").value
    const country = document.querySelector(".weather__input-country").value

    function getWeatherAPI() {
    return fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city},${country}&appid=5a1b683a64cf9db9ae06243dca955f3d`)
    }

    getWeatherAPI().then((result) => result.json()).then((resultdata) => createWeatherText(resultdata))
})

// ℃ =(K - 273.15 ) * 1
// ℃ =(294 - 273.15 ) * 1.000000
// ℃ =20.850000000000023 * 1.000000
// ℃ =20.85000