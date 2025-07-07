// Отримати погоду за допомогою OpenWeatherMap API
// Опис: Використайте публічне API OpenWeatherMap
// для отримання поточної погоди. Зробіть GET-запит
// за адресою https://api.openweathermap.org/data/2.5/weather?q={city}&appid={5a1b683a64cf9db9ae06243dca955f3d},
// де {city} - назва міста, а {API_KEY} - ваш ключ API
// OpenWeatherMap. Перегляньте отримані дані щодо погоди.
// ℃ =(K - 273.15 ) * 1
// ℃ =(294 - 273.15 ) * 1.000000
// ℃ =20.850000000000023 * 1.000000
// ℃ =20.85000

const submitButton = document.querySelector(".weather__submit-button");
let number = 0;

function createWeatherText(initialData) {
    number++;
    console.log(initialData)
    const biggiebox = document.querySelector(".big__box");
    biggiebox.classList.add("coolmarginstyles");

    const city = initialData.name;
    const country = initialData.sys.country;

    const mainWeather = initialData.weather[0].main;
    let emojicool = "🌈";
    if (mainWeather === "Rain") 
        emojicool = "🌧️";
    else if (mainWeather === "Clouds") 
        emojicool = "☁️";
    else if (mainWeather === "Clear") 
        emojicool = "☀️";
    else if (mainWeather === "Snow") 
        emojicool = "🌨️";
    else if (mainWeather === "Drizzle") 
        emojicool = "🌦️";
    else if (mainWeather === "Thunderstorm") 
        emojicool = "🌩️";
    else if (["Mist", "Fog", "Haze"].includes(mainWeather)) 
        emojicool = "🌫️";

    const ctemp = Math.round(initialData.main.temp - 273.15);
    const date = new Date();
    const hours = date.getHours();
    const minutes = date.getMinutes();

    const weatherHTML = `
        <div class="weather__box-${number} weather__box">
            <p class="time">${city} ${hours}:${minutes}</p>
            <div class="line"></div>
            <div class="flex-box">
                <div class="left__box">
                    <h2 class="city">City: ${city}</h2>
                    <div class="gradus-emoji-box">
                        <p class="emoji">${emojicool}</p>
                        <p class="gradus">${ctemp}°</p>
                    </div>
                </div>
                <div class="line-block"></div>
                <div class="right__box">
                    <h2 class="country">Country: ${country}</h2>
                    <p class="weather">Weather: ${mainWeather}</p>
                    <p class="weather-describtion">Weather Desc: ${initialData.weather[0].description}</p>
                    <p class="wind-speed">Wind Speed - ${initialData.wind.speed}</p>
                    <p class="humidity">Humidity - ${initialData.main.humidity}</p>
                </div>
            </div>
            <div class="line"></div>
        </div>
    `;

    biggiebox.insertAdjacentHTML("afterbegin", weatherHTML);
    const thebox = document.querySelector(`.weather__box-${number}`);
    applyWeatherStyle(thebox, mainWeather);

    const emojiEl = thebox.querySelector(".emoji");
    const gradusEl = thebox.querySelector(".gradus");
    const cityEl = thebox.querySelector(".city");
    const countryEl = thebox.querySelector(".country");
    const weatherEl = thebox.querySelector(".weather");
    const weatherDescEl = thebox.querySelector(".weather-describtion");
    const windSpeedEl = thebox.querySelector(".wind-speed");
    const humidityEl = thebox.querySelector(".humidity");
    const timeEl = thebox.querySelector(".time");

    setInterval(() => {
        fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city},${country}&appid=5a1b683a64cf9db9ae06243dca955f3d`)
            .then(res => res.json())
            .then(data => {
                const updatedWeather = data.weather[0].main;
                let newEmoji = "🌈";
                if (updatedWeather === "Rain") 
                    newEmoji = "🌧️";
                else if (updatedWeather === "Clouds") 
                    newEmoji = "☁️";
                else if (updatedWeather === "Clear") 
                    newEmoji = "☀️";
                else if (updatedWeather === "Snow") 
                    newEmoji = "🌨️";
                else if (updatedWeather === "Drizzle") 
                    newEmoji = "🌦️";
                else if (updatedWeather === "Thunderstorm") 
                    newEmoji = "🌩️";
                else if (["Mist", "Fog", "Haze"].includes(updatedWeather)) 
                    newEmoji = "🌫️";

                const newCTemp = Math.round(data.main.temp - 273.15);
                const now = new Date();
                const hrs = now.getHours();
                const mins = now.getMinutes();

                emojiEl.textContent = newEmoji;
                gradusEl.textContent = `${newCTemp}°`;
                cityEl.textContent = `City: ${data.name}`;
                countryEl.textContent = `Country: ${data.sys.country}`;
                weatherEl.textContent = `Weather: ${updatedWeather}`;
                weatherDescEl.textContent = `Weather Desc: ${data.weather[0].description}`;
                windSpeedEl.textContent = `Wind Speed - ${data.wind.speed}`;
                humidityEl.textContent = `Humidity - ${data.main.humidity}`;
                timeEl.textContent = `${data.name} ${hrs}:${mins}`;

                applyWeatherStyle(thebox, updatedWeather);
            });
    }, 60000);
}

function applyWeatherStyle(el, weatherType) {
    el.classList.remove("rain", "clouds", "sunny", "snow", "idkwhatsthat", "thunder", "fog");

    if (weatherType === "Rain") el.classList.add("rain");
    else if (weatherType === "Clouds") el.classList.add("clouds");
    else if (weatherType === "Clear") el.classList.add("sunny");
    else if (weatherType === "Snow") el.classList.add("snow");
    else if (weatherType === "Drizzle") el.classList.add("idkwhatsthat");
    else if (weatherType === "Thunderstorm") el.classList.add("thunder");
    else if (["Mist", "Fog", "Haze"].includes(weatherType)) el.classList.add("fog");
}

submitButton.addEventListener("click", () => {
    const city = document.querySelector(".weather__input-city").value;
    const country = document.querySelector(".weather__input-country").value;

    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city},${country}&appid=5a1b683a64cf9db9ae06243dca955f3d`)
        .then(res => res.json())
        .then(data => createWeatherText(data));
});
