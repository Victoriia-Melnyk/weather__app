let currentDate = new Date();

//format date
function formatDate(date) {
	let days = [
		'Sunday',
		'Monday',
		'Tuesday',
		'Wednesday',
		'Thursday',
		'Friday',
		'Saturday',
	];
	let dayOfWeekIndex = date.getDay();
	let day = days[dayOfWeekIndex];

	let hours = date.getHours();
	if (hours < 10) {
		hours = `0${hours}`;
	}
	let minutes = date.getMinutes();
	if (minutes < 10) {
		minutes = `0${minutes}`;
	}

	return `${day} ${hours}:${minutes}`;
}

let currentDateElement = document.querySelector('#current-date');
currentDateElement.innerHTML = formatDate(currentDate);

//changing month
function formatMonth(date) {
	let months = [
		'January',
		'Fabruary',
		'March',
		'April',
		'May',
		'June',
		'July',
		'August',
		'September',
		'October',
		'November',
		'December',
	];
	let month = months[date.getMonth()];
	let dayOfMonth = date.getDate();

	return `${month} ${dayOfMonth}`;
}

let monthElement = document.querySelector('#current-month');
monthElement.innerHTML = formatMonth(currentDate);

//showing real weather data

function changeWeatherDataByCity(event) {
	event.preventDefault();
	let city = document.querySelector('#form-input').value;
	let currentCity = document.querySelector('#current-city');
	currentCity.innerHTML = city;

	let key = 'ab3b706b8e9b1f3dfc03939f848fe9da';
	let url = `https://api.openweathermap.org/data/2.5/weather?q=${currentCity.innerHTML}&units=metric`;
	axios.get(`${url}&appid=${key}`).then(response => {
		let temperatureElement = document.querySelector('#temperature');
		let humidityElement = document.querySelector('#humidity');
		let windElement = document.querySelector('#wind');
		let descriptionElement = document.querySelector('#description');
		temperatureElement.innerHTML = Math.round(response.data.main.temp);
		humidityElement.innerHTML = `humidity: ${response.data.main.humidity}%`;
		windElement.innerHTML = `wind: ${Math.round(
			response.data.wind.speed
		)} km/hr`;
		descriptionElement.innerHTML = response.data.weather[0].description;
	});
}

function changeWeatherDataByGeo(event) {
	event.preventDefault();
	navigator.geolocation.getCurrentPosition(position => {
		let latitude = position.coords.latitude;
		let longtitude = position.coords.longitude;
		let key = 'ab3b706b8e9b1f3dfc03939f848fe9da';
		let url = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longtitude}&appid=${key}&units=metric`;
		axios.get(url).then(response => {
			let location = response.data.name;
			let cityElement = document.querySelector('#current-city');
			let temperatureElement = document.querySelector('#temperature');
			let humidityElement = document.querySelector('#humidity');
			let windElement = document.querySelector('#wind');
			let descriptionElement = document.querySelector('#description');
			temperatureElement.innerHTML = Math.round(response.data.main.temp);
			humidityElement.innerHTML = `humidity: ${response.data.main.humidity}%`;
			windElement.innerHTML = `wind: ${Math.round(
				response.data.wind.speed
			)} km/hr`;
			descriptionElement.innerHTML = response.data.weather[0].main;
			cityElement.innerHTML = location;
		});
	});
}

let button = document.querySelector('#button-addon2');
button.addEventListener('click', changeWeatherDataByCity);

let geoButton = document.querySelector('#geo-button');
geoButton.addEventListener('click', changeWeatherDataByGeo);

//changing temperature units

let fahrenheit = document.querySelector('#fahrenheit-link');
let celsius = document.querySelector('#celcius-link');

function changeTemperatureInCelcius(event) {
	event.preventDefault();
	let city = document.querySelector('#current-city').innerHTML;
	let key = 'ab3b706b8e9b1f3dfc03939f848fe9da';
	let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric`;
	axios.get(`${url}&appid=${key}`).then(response => {
		let temperatureElement = document.querySelector('#temperature');
		temperatureElement.innerHTML = Math.round(response.data.main.temp);
	});
}
function changeTemperatureInfahrenheit(event) {
	event.preventDefault();
	let temperatureElement = document.querySelector('#temperature');
	let temperature = temperatureElement.innerHTML;
	temperatureElement.innerHTML = `${Math.round((temperature * 9) / 5 + 32)}`;
}

fahrenheit.addEventListener('click', changeTemperatureInfahrenheit);

celsius.addEventListener('click', changeTemperatureInCelcius);
