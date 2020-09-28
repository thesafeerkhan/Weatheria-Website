// OpenWeather API
const apiKey = "64bbc54ffcc85312323053c0b353656c";

// Variables
const searchBox = document.querySelector(".search-box");
const searchButton = document.querySelector(".search-button");
let locationName = document.querySelector(".location-name");
let locationDate = document.querySelector(".location-date");
let locationWeather = document.querySelector(".location-weather");
let locationTemp = document.querySelector(".location-temp");
let locationHighLow = document.querySelector(".location-highlow");

// Event Listeners
searchBox.addEventListener("keypress", function (event) {
	if (event.keyCode == 13) {
		getWeather(searchBox.value);
	}
});

searchButton.addEventListener("click", function () {
	getWeather(searchBox.value);
});

// Functions
function getWeather(locationQuery) {
	fetch("https://api.openweathermap.org/data/2.5/weather?q=" + locationQuery + "&units=metric&appid=" + apiKey)
		.then(function (weather) {
			return weather.json();
		})
		.then(updateWeather);
}

function updateWeather(weatherObject) {
	locationName.innerText = weatherObject.name + ", " + weatherObject.sys.country;
	locationWeather.innerText = weatherObject.weather[0].description;
	locationTemp.innerText = Math.round(weatherObject.main.temp) + "°c";
	locationHighLow.innerText = Math.round(weatherObject.main.temp_min) + "°c / " + Math.round(weatherObject.main.temp_max) + "°c";
	//Date
	let now = new Date();
	locationDate.innerHTML = dateBuilder(now);
}

function dateBuilder(d) {
	let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
	let days = ["Sunday", "Monday", "Tuesday", "Wedday", "Thursday", "Friday", "Saturday"];

	let day = days[d.getDay()];
	let date = d.getDate();
	let month = months[d.getMonth()];
	let year = d.getFullYear();

	return `${day}, ${date} ${month}, ${year}`;
}
