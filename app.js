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
    const date = new Date();
    const hours = date.getHours();
    const minutes = date.getMinutes();

    const weatherHTML = `
    <div class="weather__box">
        <p data-text="${weatherObject.name} ${hours}:${minutes}" class="time">${weatherObject.name} ${hours}:${minutes}</p>
        <div class="line"></div>
        <div class="flex-box">
            <div class="left__box">
                <h2 data-text="City: ${weatherObject.name}" class="city">City: ${weatherObject.name}</h2>
                <div class="gradus-emoji-box">
                    <p class="emoji">${emojicool}</p>
                    <p data-text="${ctemp}" class="gradus">${ctemp}°</p>
                </div>
            </div>
            <div class="line-block"></div>
            <div class="right__box">
                <h2 data-text="Country: ${weatherObject.sys.country}" class="country">Country: ${weatherObject.sys.country}</h2>
                <p data-text="Weather: ${weatherObject.weather[0].main}" class="weather">Weather: ${weatherObject.weather[0].main}</p>
                <p data-text="Weather Desc: ${weatherObject.weather[0].description}" class="weather-describtion">Weather Desc: ${weatherObject.weather[0].description}</p>
                <p data-text="Wind Speed - ${weatherObject.wind.speed}" class="wind-speed">Wind Speed - ${weatherObject.wind.speed}</p>
                <p data-text="Humidity - ${weatherObject.main.humidity}" class="humidity">Humidity - ${weatherObject.main.humidity}</p>
            </div>
        </div>
        <div class="line"></div>
    </div>
    `;

    const wrapper = document.createElement("div");

    wrapper.innerHTML = weatherHTML;
    const biggiebox = document.querySelector(".big__box");
    biggiebox.insertAdjacentElement("afterend", wrapper);
    wrapper.classList.add("coolflexstyles");
    const thebox = document.querySelector(".weather__box");

    if (mainWeather === "Rain") {
        thebox.classList.add("rain");
    } else if (mainWeather === "Clouds") {
        thebox.classList.add("clouds");
    } else if (mainWeather === "Clear") {
        thebox.classList.add("sunny");
    } else if (mainWeather === "Snow") {
        thebox.classList.add("snow");
    } else if (mainWeather === "Drizzle") {
        thebox.classList.add("idkwhatsthat");
    } else if (mainWeather === "Thunderstorm") {
        thebox.classList.add("thunder");
    } else if (mainWeather === "Mist" || mainWeather === "Fog" || mainWeather === "Haze") {
        thebox.classList.add("fog");
    }

    const emojiEl = wrapper.querySelector(".emoji");
    const gradusEl = wrapper.querySelector(".gradus");
    const cityEl = wrapper.querySelector(".city");
    const countryEl = wrapper.querySelector(".country");
    const weatherEl = wrapper.querySelector(".weather");
    const weatherDescEl = wrapper.querySelector(".weather-describtion");
    const windSpeedEl = wrapper.querySelector(".wind-speed");
    const humidityEl = wrapper.querySelector(".humidity");
    const timeEl = wrapper.querySelector(".time");

    const city = document.querySelector(".weather__input-city").value;
    const country = document.querySelector(".weather__input-country").value;

    function getWeatherAPI() {
        return fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city},${country}&appid=5a1b683a64cf9db9ae06243dca955f3d`);
    }

    getWeatherAPI()
        .then((result) => result.json())
        .then((data) => Update(data));

    function Update(data) {
        setInterval(() => {
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
            const ktemp = data.main.temp;
            const ctemp = Math.round(ktemp - 273.15);
            const date = new Date();
            const hours = date.getHours();
            const minutes = date.getMinutes();

            emojiEl.textContent = emojicool;
            gradusEl.textContent = `${ctemp}°`;
            cityEl.textContent = `City: ${data.name}`;
            countryEl.textContent = `Country: ${data.sys.country}`;
            weatherEl.textContent = `Weather: ${data.weather[0].main}`;
            weatherDescEl.textContent = `Weather Desc: ${data.weather[0].description}`;
            windSpeedEl.textContent = `Wind Speed - ${data.wind.speed}`;
            humidityEl.textContent = `Humidity - ${data.main.humidity}`;
            timeEl.textContent = `${data.name} ${hours}:${minutes}`;

                const thebox = document.querySelector(".weather__box");
    if (mainWeather === "Rain") {
        thebox.classList.add("rain");
    } else if (mainWeather === "Clouds") {
        thebox.classList.add("clouds");
    } else if (mainWeather === "Clear") {
        thebox.classList.add("sunny");
    } else if (mainWeather === "Snow") {
        thebox.classList.add("snow");
    } else if (mainWeather === "Drizzle") {
        thebox.classList.add("idkwhatsthat");
    } else if (mainWeather === "Thunderstorm") {
        thebox.classList.add("thunder");
    } else if (mainWeather === "Mist" || mainWeather === "Fog" || mainWeather === "Haze") {
        thebox.classList.add("fog");
    }
        }, 1000);
    }
}

submitButton.addEventListener("click", (event) => {
    const city = document.querySelector(".weather__input-city").value;
    const country = document.querySelector(".weather__input-country").value;

    function getWeatherAPI() {
        return fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city},${country}&appid=5a1b683a64cf9db9ae06243dca955f3d`);
    }

    getWeatherAPI()
        .then((result) => result.json())
        .then((resultdata) => createWeatherText(resultdata));
});