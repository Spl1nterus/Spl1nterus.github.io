document.addEventListener("DOMContentLoaded", function () {

  let searchButton = document.getElementById("search-btn");
  let city = document.getElementById("search-txt");
  let cityName = document.getElementById("city-name");
  let svg = document.getElementById("icon").getElementsByTagName("use")[0];
  let temperature = document.getElementById("temp");
  let humidity = document.getElementById("humidity");
  let wind = document.getElementById("wind");
 


  function getLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(setPosition, error);

    } else {
      alert("Geolocation is not supported by this browser.");
    }
  }

  function error() {
    let searchLink = "https://api.openweathermap.org/data/2.5/weather?lat=0&lon=0&units=metric&appid=c1f0d32ccc4dd3226e84b81bec923749";
    httpRequest(searchLink, getData);
  }


  function setPosition(position) {
    let searchLink = "https://api.openweathermap.org/data/2.5/weather?lat=" + position.coords.latitude + "&lon=" + position.coords.longitude + "&units=metric&appid=c1f0d32ccc4dd3226e84b81bec923749";
    httpRequest(searchLink, getData);
  }

  getLocation();

  city.addEventListener("change", findWeather);

  function findWeather() {
    if (city.value != "") {
      let searchLink = "https://api.openweathermap.org/data/2.5/weather?q=" + encodeURIComponent(city.value) + "&units=metric&appid=c1f0d32ccc4dd3226e84b81bec923749";
      httpRequest(searchLink, getData);
    } else {
      city.placeholder = "Заполните поле города";
    }
  }

  function getData(data) {
    let jsonObject = JSON.parse(data);
    cityName.innerHTML = jsonObject.name;
    svg.href.baseVal = "img/sprite.svg#" + jsonObject.weather[0].icon;
    temperature.innerHTML = Math.floor(jsonObject.main.temp) + "&#176";
    humidity.innerHTML = jsonObject.main.humidity + "%";
    wind.innerHTML = Math.floor(jsonObject.wind.speed) + "m/s";
  }

  function httpRequest(url, callback) {
    let httpRequest = new XMLHttpRequest();
    httpRequest.onreadystatechange = function () {
      if (httpRequest.readyState == 4 && httpRequest.status == 200) {
        callback(httpRequest.responseText);
      }
    };
    httpRequest.open("GET", url, true);
    httpRequest.send();
  }
});