var searchButton = $('#search-btn');
var searchInput = $('#searchInput');
var recentHistory = $('#recentHistory');
var cardRow = $('#cardRow')
var cityName = 'undefined';
var lat = 0;
var lon = 0;
var temp = [];
var wind = [];
var humidity = [];
var date = [];

var now = dayjs().format('DD' + '/' + "MM" + "/" + "YYYY");

function searchButtonHandler() {
    if (searchInput.val() === '') {
        console.log('Empty!');
    } else {
        var cityHistoryString = localStorage.getItem('cityHistory');
        var cityHistory = [];
        if (cityHistoryString) {
            cityHistory = JSON.parse(cityHistoryString);
        }
        cityHistory.push(searchInput.val().trim());
        localStorage.setItem('cityHistory', JSON.stringify(cityHistory));
        convertGeo();
    }
}

function convertGeo() {
    var inputString = searchInput.val().toLowerCase();
    var requestURL = 'http://api.openweathermap.org/geo/1.0/direct?q=' + inputString + '&limit=1&appid=e9b8186425312aeb2aeb30949d61fa5c';

    fetch(requestURL)
    .then(response => {          
        return response.json();
    })
    .then(data => {
        cityName = data[0].name;
        lat = data[0].lat;
        lon = data[0].lon;
        getAPI();
    });
}

function getAPI() {
    var requestForecast = 'http://api.openweathermap.org/data/2.5/forecast?lat=' + lat + '&lon=' + lon + '&appid=e9b8186425312aeb2aeb30949d61fa5c&units=imperial'
    fetch(requestForecast)
    .then(response => {          
        return response.json();
    })
    .then(data => {
        for (var i = 0; i < data.list.length; i += 8) {
            temp.push(data.list[i].main.temp);
            wind.push(data.list[i].wind.speed);
            humidity.push(data.list[i].main.humidity);
            date.push(data.list[i].dt_txt);

        }
        renderAPI();
    });
}

function renderAPI() {
    
}

searchButton.on('click', searchButtonHandler);