// Отримати погоду за допомогою OpenWeatherMap API
// Опис: Використайте публічне API OpenWeatherMap
// для отримання поточної погоди. Зробіть GET-запит
// за адресою https://api.openweathermap.org/data/2.5/weather?q={city}&appid={5a1b683a64cf9db9ae06243dca955f3d},
// де {city} - назва міста, а {API_KEY} - ваш ключ API
// OpenWeatherMap. Перегляньте отримані дані щодо погоди.
const submitButton = document.querySelector(".weather__submit-button");

    function createWeatherText(weatherObject) {
    console.log(weatherObject)
    const weatherHTML = `
    <div class="weather__box">
        <h1 class="city">${weatherObject.name}</h1>
        <h2 class="country">${weatherObject.sys.country}</h2>
        <p class="weather">${weatherObject.weather[0].main}</p>
        <p class="wind-speed">Wind Speed - ${weatherObject.wind.speed}</p>
        <p class="humidity">Humidity - ${weatherObject.main.humidity}</p>
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


