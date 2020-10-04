// OpenWeather API
const apiKey = "64bbc54ffcc85312323053c0b353656c";

// Variables
const searchBox = document.querySelector(".search-box");
const searchButton = document.querySelector(".search-button");

// Highlights
let setRiseHighlight = document.querySelector(".sunrise-sunset");
let windHighlight = document.querySelector(".wind-status");
let visHighlight = document.querySelector(".visibility");
let humidHighlight = document.querySelector(".humidity");

// Location
let locationCity = document.querySelector(".location-city");
let locationCountry = document.querySelector(".location-country");
let locationDate = document.querySelector(".location-date");
let locationTemp = document.querySelector(".location-temp");
let locationWeather = document.querySelector(".location-weather");
let locationWind = document.querySelector(".location-wind");
let locationHumid = document.querySelector(".location-humid");
let locationPrecip = document.querySelector(".location-precip");

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
	visHighlight.innerText = weatherObject.visibility / 1000 + " km";
	setRiseHighlight.innerText = unixToLocation(weatherObject.sys.sunrise) + "/" + unixToLocation(weatherObject.sys.sunset);
	windHighlight.innerText = weatherObject.wind.speed + " m/s";
	humidHighlight.innerText = weatherObject.main.humidity + " %";

	locationCity.innerText = weatherObject.name;
	locationCountry.innerText = weatherObject.sys.country;
	//Date
	let now = new Date();
	locationDate.innerHTML = getDate(now);

	locationWeather.innerText = weatherObject.weather[0].description;
	locationTemp.innerText = Math.round(weatherObject.main.temp) + "°c";
	locationWind.innerText = weatherObject.wind.speed + " m/s";
	locationHumid.innerText = weatherObject.main.humidity + " %";
	console.log(weatherObject);
	// locationHighLow.innerText = Math.round(weatherObject.main.temp_min) + "°c / " + Math.round(weatherObject.main.temp_max) + "°c";
}

function getDate(d) {
	let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
	let days = ["Sunday", "Monday", "Tuesday", "Wedday", "Thursday", "Friday", "Saturday"];

	let day = days[d.getDay()];
	let date = d.getDate();
	let month = months[d.getMonth()];
	let year = d.getFullYear();

	return `${day}, ${date} ${month}, ${year}`;
}

function unixToLocation(unixTime) {
	let unix_timestamp = unixTime;

	var date = new Date(unix_timestamp * 1000);
	var hours = date.getHours();
	var minutes = "0" + date.getMinutes();
	var seconds = "0" + date.getSeconds();

	if (hours > 12) {
		var formattedTime = hours - 12 + ":" + minutes.substr(-2);
	} else {
		var formattedTime = hours + ":" + minutes.substr(-2);
	}

	return formattedTime;
}
