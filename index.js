// DOM Elements
const form = document.querySelector(".citySearch");
const inputArea = document.querySelector("#search");
const submitBtn = document.querySelector(".submitBtn");
const formMsg = document.querySelector(".formMsg");
const city = document.querySelector(".city");
const cities = document.querySelector(".citiesWeather");


// -----
let clearReset = function () {
  form.reset();
  inputArea.focus();
};

let inputValue = "";

form.addEventListener("submit", function (e) {
  e.preventDefault();

  formMsg.textContent = "";
  formMsg.classList.remove("visible");

  inputValue = inputArea.value;

  if (inputValue.length > 30) {
    formMsg.textContent = "The characters are more than 30 😥";
    formMsg.classList.add("visible");
    clearReset();
  }

  return;
});

// API Key
const apiKey = "d09d69503c82e97ff41ac07e5fd5214a";

const url = `https://api.openweathermap.org/data/2.5/weather?units=metric&appid=${apiKey}&q=`;

async function checkWeather(city) {
  try {
    const response = await fetch(url + city);
    let data = await response.json();
    console.log(data);

    if (data.cod == "404") {
      throw new Error(`${data.cod}, ${data.message}`);
    }

    const { main, name, sys, weather } = data;

    const newCity = document.createElement("div");
    newCity.classList.add(".city");

    const icon = `images/${weather[0]["icon"]}.svg`;
    // -----

    const markup = `<div class="city">
    <img src="${icon}" alt="${weather[0]["description"]}">

        <div class="cityConditions">
          <div class="cityTemp">
            <h2 class="temp">${Math.round(main.temp)}<sup>℃</sup></h2>
            <p class="conditions">${weather[0]["description"].toUpperCase()}</p>
          </div>

          <div class="cityCountry">
            <p class="place">${name}</p>
            <p><span class="country">${sys.country}</span></p>
          </div>
        </div>
        </div>`;

    newCity.innerHTML = markup;

    cities.appendChild(newCity);
  } catch {
    formMsg.textContent =
      "City not found! Please search for a valid place 😥😥";
    formMsg.classList.add("visible");
  }
}

submitBtn.addEventListener("click", function () {
  checkWeather(inputArea.value);
  clearReset();
});

// --------
