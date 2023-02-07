var searchBtn  = document.querySelector('.search-button')
var inputBox   = document.querySelector('#input')
var center     = document.querySelector('.center-content')
var row        = document.querySelector(".row")
var container    = document.querySelector(".city-history")

var searchHistory = JSON.parse(localStorage.getItem("cities")) || [];



function getCurrentWeather (){
     var cityName = inputBox.value
     var currentLink = 'https://api.openweathermap.org/data/2.5/weather?q='+cityName+'&units=imperial&appid=e8aeba804c1545aeb1b9eb9fd7af69ff'
    //  var currentLink = 'https://api.openweathermap.org/data/2.5/forecast?q='+cityName+'&appid=e8aeba804c1545aeb1b9eb9fd7af69ff'

     fetch(currentLink)
    .then(response => response.json())
    .then(function(data){
        center.innerHTML = ""
        console.log(data)
        var cityh2         = document.createElement('h2')
        var tempEl         = document.createElement('p')
        var windEl         = document.createElement('p')
        var humEl          = document.createElement('p')

        cityh2.textContent = cityName;
        tempEl.textContent = 'Temperature '+ data.main.temp + ' degrees';
        windEl.textContent = 'Wind Speed '+ data.wind.speed + ' mph';
        humEl.textContent  = 'Humidity ' + data.main.humidity ;
        
        center.append(cityh2, tempEl, windEl, humEl)
    })
};

function getForecastWeather (){
    var cityName = inputBox.value
    var currentLink = 'https://api.openweathermap.org/data/2.5/forecast?q='+cityName+'&units=imperial&appid=e8aeba804c1545aeb1b9eb9fd7af69ff'
   //  var currentLink = 'https://api.openweathermap.org/data/2.5/forecast?q='+cityName+'&appid=e8aeba804c1545aeb1b9eb9fd7af69ff'

    fetch(currentLink)
   .then(response => response.json())
   .then(function(data){
        row.innerHTML = ""
       console.log(data.list)
        // 3, 11, 19, 27, 35

        var selectedData = [
            data.list[3],
            data.list[11],
            data.list[19],
            data.list[27],
            data.list[35],
        ]
        // <div class="col m-1">
        //     <p>Temp: 10</p>
        //     <p>Humidity: 10</p>
        //     <p> Wind Speed: 11</p>
        // </div>

        for(i = 0; i < selectedData.length; i++) {
            var colDiv = document.createElement("div");
            colDiv.classList.add("col");
            colDiv.classList.add("m-1");
            
            addWeatherIcon(colDiv, selectedData[i]);
    
            var timeH4 = document.createElement("h4");
                timeH4.textContent = dayjs(selectedData[i].dt * 1000).format("MM/DD");
    
            var tempP = document.createElement("p");
                tempP.textContent = 'Temp '+ selectedData[i].main.temp + ' degrees';
    
            var humidP = document.createElement("p");
                humidP.textContent  = 'Humidity ' + selectedData[i].main.humidity ;
    
            var windP = document.createElement("p");
                windP.textContent = 'Wind Speed '+ selectedData[i].wind.speed  + ' mph';
    
            colDiv.append(timeH4, tempP, humidP, windP);
    
            row.append(colDiv)
           }
           
           function addWeatherIcon(colDiv, selectedData) {
            var weather = selectedData.weather[0].main;
            var icon = document.createElement("i");
          
            switch(weather) {
              case "Clouds":
                icon.classList.add("fa", "fa-cloud");
                break;
              case "Sunny":
                icon.classList.add("fa", "fa-sun");
                break;
              case "Rain":
                icon.classList.add("fa", "fa-cloud-rain");
                break;
              case "Windy":
                icon.classList.add("fa", "fa-wind");
                break;
              default:
                icon.classList.add("fa", "fa-thermometer-half");
            }
          
            colDiv.prepend(icon);
          }
          
        
   })
};
function saveToStorage () {
    var cityName = inputBox.value;

    if (!searchHistory.includes(cityName)) {
        searchHistory.push(cityName);
        localStorage.setItem("cities", JSON.stringify(searchHistory));
    }
}


function createButtons () {
    container.innerHTML = "";

    for(i = 0; i < searchHistory.length; i++) {
        var cityBtn = document.createElement("button");
        cityBtn.textContent = searchHistory[i];
        container.append(cityBtn);
    }
}

function searchCity () {
    createButtons()
    saveToStorage();
    getCurrentWeather();
    getForecastWeather();
}

searchBtn.addEventListener('click', searchCity);
createButtons()


container.addEventListener("click", function(event) {
    if (event.target.nodeName === "BUTTON") {
        inputBox.value = event.target.textContent;
        searchCity();
    }
});