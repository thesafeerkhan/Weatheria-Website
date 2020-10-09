// OpenWeather API
const apiKey = "64bbc54ffcc85312323053c0b353656c";
// aqicn API 
const apiKey2 = "bfb4961115bee56248fd03be6db61cce53cc0982"

// Variables
const searchBox = document.querySelector(".search-box");
const searchButton = document.querySelector(".search-button");

// Highlights
let uvIndex = document.querySelector(".uv-index");
let uvDegree = document.querySelector(".uv-degree");

let sunRise = document.querySelector(".sunrise");
let sunSet = document.querySelector(".sunset");

let windHighlight = document.querySelector(".wind-status");
let windDirection = document.querySelector(".wind-direction");

let visHighlight = document.querySelector(".visibility");
let visCat = document.querySelector(".visibility-cat");

let humidHighlight = document.querySelector(".humidity");
let humidCat = document.querySelector(".humidity-cat");

let aqIndex = document.querySelector('.aq-index');
let aqCat = document.querySelector('.aq-cat');

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
	// Uv Index
	fetch(`http://api.openweathermap.org/data/2.5/uvi?lat=${weatherObject.coord.lat}&lon=${weatherObject.coord.lon}&appid=${apiKey}`)
		.then((resp) => resp.json())
		.then(function (uvData) {
			uvIndex.innerText = uvData.value;

			var i = 0;
			if (i == 0) {
				i = 1;
				var elem = document.getElementById("myBar");
				var width = 1;
				var id = setInterval(frame, 10);
				function frame() {
					if (width < uvData.value * 6.7) {
						width++;
						elem.style.width = width + "%";
					} else {
						clearInterval(id);
						i = 0;
					}
				}
			}

			uvDegree.innerText = getUvDegree(uvData.value);
		});

	// Sunrise and Sunset
	sunRise.innerHTML = `<i class="fas fa-arrow-alt-circle-up fa-lg sunIcon"></i> ${unixToLocation(weatherObject.sys.sunrise)} AM`;
	sunSet.innerHTML = `<i class="fas fa-arrow-alt-circle-down fa-lg sunIcon"></i> ${unixToLocation(weatherObject.sys.sunset)} PM`;

	// Wind
	windHighlight.innerText = Math.round(weatherObject.wind.speed * 3.5) + " km/h";
	windDirection.innerText = getWindDirection(weatherObject.wind.deg);

	// Visibility
	visHighlight.innerText = weatherObject.visibility / 1000 + " km";
	visCat.innerText = getVisiCat(weatherObject.visibility / 1000);

	// Humidity
	humidHighlight.innerText = weatherObject.main.humidity + " %";
	humidCat.innerText = getHumidityCat(weatherObject.main.humidity);

	// Air Quality
	fetch(`https://api.waqi.info/feed/${weatherObject.name}/?token=${apiKey2}`)
		.then((resp) => resp.json())
		.then(function (aqData) {
			aqIndex.innerText = aqData.data.aqi;
			aqCat.innerText = getAQLevel(aqData.data.aqi);
		});

	// Location
	locationCity.innerText = weatherObject.name;
	locationCountry.innerText = weatherObject.sys.country;
	//Date
	let now = new Date();
	locationDate.innerHTML = getDate(now);

	locationWeather.innerText = weatherObject.weather[0].description;
	locationTemp.innerText = Math.round(weatherObject.main.temp) + "°c";
	locationWind.innerText = weatherObject.wind.speed + " m/s";
	locationHumid.innerText = weatherObject.main.humidity + " %";
	// locationHighLow.innerText = Math.round(weatherObject.main.temp_min) + "°c / " + Math.round(weatherObject.main.temp_max) + "°c";
}

function getUvDegree(uv) {
	if (uv > 11) return "Extreme";
	if (uv > 10) return "Very High";
	if (uv > 7) return "High";
	if (uv > 5) return "Medium";
	return "Low";
}

function getWindDirection(degree) {
	if (degree > 337.5) return "Northerly";
	if (degree > 292.5) return "North Westerly";
	if (degree > 247.5) return "Westerly";
	if (degree > 202.5) return "South Westerly";
	if (degree > 157.5) return "Southerly";
	if (degree > 122.5) return "South Easterly";
	if (degree > 67.5) return "Easterly";
	if (degree > 22.5) {
		return "North Easterly";
	}
	return "Northerly";
}

function getVisiCat(visibility) {
	if (visibility > 15) return "Clear";
	if (visibility > 6) return "Normal";
	return "Little";
}

function getHumidityCat(humidity) {
	if (humidity > 70) return "High";
	if (humidity > 30) return "Average";
	return "Low";
}

function getAQLevel(aqIndex) {
	if (aqIndex > 300) return "Hazardous";
	if (aqIndex > 200) return "Very Unhealthy";
	if (aqIndex > 150) return "Unhealthy";
	if (aqIndex > 100) return "Unhealthy for sensitive groups";
	if (aqIndex > 50) return "Moderate";
	return "Good";
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
