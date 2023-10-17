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

	let key = 'aao33d4100dc1f18c42d1b9teb580408';
	let url = `https://api.shecodes.io/weather/v1/current?query=${currentCity.innerHTML}&key=${key}&units=metric`;
	axios.get(`${url}`).then(response => {
		console.log(response);
		let temperatureElement = document.querySelector('#temperature');
		let humidityElement = document.querySelector('#humidity');
		let windElement = document.querySelector('#wind');
		let descriptionElement = document.querySelector('#description');
		let iconElement = document.querySelector('#icon');
		temperatureElement.innerHTML = Math.round(response.data.temperature.current);
		humidityElement.innerHTML = `humidity: ${response.data.temperature.humidity}%`;
		windElement.innerHTML = `wind: ${Math.round(
			response.data.wind.speed
		)} km/hr`;
		descriptionElement.innerHTML = response.data.condition.description;
		iconElement.setAttribute('src', `${response.data.condition.icon_url}`);
		iconElement.setAttribute('alt', `${response.data.condition.icon}`);
	});
}

function changeWeatherDataByGeo() {
	navigator.geolocation.getCurrentPosition(position => {
		let latitude = position.coords.latitude;
		let longtitude = position.coords.longitude;
		let key = 'aao33d4100dc1f18c42d1b9teb580408';
		let url = `https://api.shecodes.io/weather/v1/current?lon=${longtitude}&lat=${latitude}&key=${key}&units=metric`;
		axios.get(url).then(response => {
			console.log(response);
			let location = response.data.city;
			let temperatureElement = document.querySelector('#temperature');
			let humidityElement = document.querySelector('#humidity');
			let windElement = document.querySelector('#wind');
			let descriptionElement = document.querySelector('#description');
			let cityElement = document.querySelector('#current-city');
			let iconElement = document.querySelector('#icon');
			temperatureElement.innerHTML = Math.round(
				response.data.temperature.current
			);
			humidityElement.innerHTML = `humidity: ${response.data.temperature.humidity}%`;
			windElement.innerHTML = `wind: ${Math.round(
				response.data.wind.speed
			)} km/hr`;
			descriptionElement.innerHTML = response.data.condition.description;
			iconElement.setAttribute('src', `${response.data.condition.icon_url}`);
			iconElement.setAttribute('alt', `${response.data.condition.icon}`);

			cityElement.innerHTML = location;
		});
	});
}

changeWeatherDataByGeo();

let button = document.querySelector('#button-addon2');
button.addEventListener('click', changeWeatherDataByCity);

let geoButton = document.querySelector('#geo-button');
geoButton.addEventListener('click', changeWeatherDataByGeo);

let form = document.querySelector('#form');
form.addEventListener('submit', changeWeatherDataByCity);

//changing temperature units

let fahrenheit = document.querySelector('#fahrenheit-link');
let celsius = document.querySelector('#celcius-link');

function changeTemperatureInCelcius(event) {
	event.preventDefault();
	let city = document.querySelector('#current-city').innerHTML;
	let key = 'aao33d4100dc1f18c42d1b9teb580408';
	let url = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${key}&units=metric`;
	axios.get(`${url}`).then(response => {
		let temperatureElement = document.querySelector('#temperature');
		temperatureElement.innerHTML = Math.round(
			response.data.temperature.current
		);
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

