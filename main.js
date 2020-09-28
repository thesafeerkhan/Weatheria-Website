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
	getWeather(searchButton.value);
});

// Functions
function getWeather(locationName) {
	alert("Hello");
}
