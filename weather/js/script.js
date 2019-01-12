document.addEventListener("DOMContentLoaded", function () {

  let searchButton = document.getElementById("search-btn");
  let city = document.getElementById("search-txt");
  let cityName = document.getElementById("city-name");
  let svg = document.getElementById("icon").getElementsByTagName("use")[0];
  let temperature = document.getElementById("temp");
  let humidity = document.getElementById("humidity");
  let wind = document.getElementById("wind");
  let error = document.getElementById("error-msg");
  let searchLink = "https://api.openweathermap.org/data/2.5/weather?lat=0&lon=0&units=metric&appid=c1f0d32ccc4dd3226e84b81bec923749";


  function getLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(setPosition);

    } else {
      alert("Geolocation is not supported by this browser.");
    }
  }

  function setPosition(position) {
    searchLink = "https://api.openweathermap.org/data/2.5/weather?lat=" + position.coords.latitude + "&lon=" + position.coords.longitude + "&units=metric&appid=c1f0d32ccc4dd3226e84b81bec923749";
    console.log(searchLink);
    httpRequestAsync(searchLink, getData);
  }


  getLocation();
  city.addEventListener("change", findWeatherDetails);



  function findWeatherDetails() {
    if (city.value != "") {
      searchLink = "https://api.openweathermap.org/data/2.5/weather?q=" + city.value + "&units=metric&appid=c1f0d32ccc4dd3226e84b81bec923749";
      httpRequestAsync(searchLink, getData);
    } else {
      city.placeholder = "Заполните поле города";
      city.classList.add('search-txt--error');
    }
  }

  function getData(data) {
    let jsonObject = JSON.parse(data);
    cityName.innerHTML = jsonObject.name;
    svg.href.baseVal = "../img/sprite.svg#" + jsonObject.weather[0].icon;
    temperature.innerHTML = Math.floor(jsonObject.main.temp) + "&#176";
    humidity.innerHTML = jsonObject.main.humidity + "%";
    wind.innerHTML = Math.floor(jsonObject.wind.speed) + "m/s";
  }

  function httpRequestAsync(url, callback) {
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