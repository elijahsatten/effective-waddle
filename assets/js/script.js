var searchButton = $('#search-btn');
var searchInput = $('#searchInput');
var recentHistory = $('#recentHistory');
var cardRow = $('#cardRow');
var cityName = '';
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
    var requestURL = 'http://api.openweathermap.org/geo/1.0/direct?q=' + inputString + '&limit=1&appid=074a9a3f7e74b09b7c2d304b506e1f48';

    fetch(requestURL)
    .then(response => {          
        return response.json();
    })
    .then(data => {
        cityName = data[0];
        lat = data[0];
        lon = data[0];
        getAPI();
    });
}

function getAPI() {
    var requestForecast = 'http://api.openweathermap.org/data/2.5/forecast?lat=' + lat + '&lon=' + lon + '&appid=074a9a3f7e74b09b7c2d304b506e1f48&units=imperial'
    fetch(requestForecast)
    .then(response => {          
        return response.json();
    })
    .then(data => {
        for (var i = 0; i < data.list; i += 8) {
            temp.push(data.list[i].main.temp);
            wind.push(data.list[i].wind.speed);
            humidity.push(data.list[i].main.humidity);
            date.push(data.list[i].dt_txt);

        }
    });
}
searchButton.on('click', searchButtonHandler);