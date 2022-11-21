var searchBtn  = document.querySelector('.search-button')
var inputBox   = document.querySelector('#input')
var center     = document.querySelector('.center-content')

function searchCity (){
    var cityName = inputBox.value
    var currentLink = 'https://api.openweathermap.org/data/2.5/weather?q='+cityName+'&units=imperial&appid=e8aeba804c1545aeb1b9eb9fd7af69ff'
    fetch(currentLink)
    .then(response => response.json())
    .then(function(data){
        console.log(data)
        var cityh2 = document.createElement('h2')
        var tempEl = document.createElement('p')
        var windEl = document.createElement('p')
        var humEl  = document.createElement('p')

        cityh2.textContent = cityName;
        tempEl.textContent = data.main.temp;
        windEl.textContent = data.wind.speed;
        humEl.textContent  = data.main.humidity

        center.append(cityh2, tempEl, windEl, humEl)
    })
}
searchBtn.addEventListener('click',searchCity)