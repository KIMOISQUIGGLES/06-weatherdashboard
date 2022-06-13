var searchHistory = JSON.parse(localStorage.getItem("searchHistory")) || []
// var searchItem = document.querySelector(`.searchCity`);

// searchItem.addEventListener("click", function(){
//     console.log("this works");
//     // USES THE VALUES FROM SEARCH TO FETCH WEATHER
//     // THIS API CALL WILL SEARCH USING THE CITY
//     let city = resp;
//     let key = 'a062419f12b0eace43e957d3ea3afb84';
//     let lang = 'en';
//     let units = 'metric';
//     let url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${key}&units=${units}&lang=${lang}`;
//     // FETCH THE WEATHER
//     fetch(url)
//         .then(resp => {
//             if(!resp.ok) throw new Error(resp.statusText);
//             return resp.json();
//         })
//         .then(data=>{
//             // CALLS SHOWWEATHER TO DISPLAY DATA TO USER
//             app.showWeather(data);
//             // CALLS FETCH FORECAST TO MAKE A SECOND API CALL WITH LAT / LON
//             app.fetchForecast(data);
//         })
//         .catch(console.err);
// })

const app = {
    init: () => {
        document
            // SEARCHES BY CITY 
            .getElementById('btnGet')
            .addEventListener('click', app.fetchWeather);
        app.populateHistory();


    },
    fetchWeather: (ev) => {
        // USES THE VALUES FROM SEARCH TO FETCH WEATHER
        // THIS API CALL WILL SEARCH USING THE CITY
        console.log(document.getElementById('searchInput').value);
        let city = document.getElementById('searchInput').value;
        let key = 'a062419f12b0eace43e957d3ea3afb84';
        let lang = 'en';
        let units = 'metric';
        let url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${key}&units=${units}&lang=${lang}`;
        // FETCH THE WEATHER
        fetch(url)
            .then(resp => {
                if(!resp.ok) throw new Error(resp.statusText);
                return resp.json();
            })
            .then(data=>{
                // CALLS SHOWWEATHER TO DISPLAY DATA TO USER
                app.showWeather(data);
                // CALLS FETCH FORECAST TO MAKE A SECOND API CALL WITH LAT / LON
                app.fetchForecast(data);
                app.addSearch(data);
            })
            .catch(console.err);
    },
    showWeather: (resp) => {
        //DISPLAYS WEATHER FOR CURRENT DAY IN SEARCHED CITY
        console.log(resp);
        let row = document.querySelector('#currentCity');

        row.innerHTML =  `<div class="weatherCard">
                    <h3 class="weatherTitle">${resp.name}</h3>
                    <img
                        src="http://openweathermap.org/img/wn/${resp.weather[0].icon}.png"
                        class="weatherImage"
                        alt="${resp.weather[0].description}"
                    />
                    <div class="weatherBody">
                        <p>Temp: ${resp.main.temp}</p>
                        <p>Wind: ${resp.wind.speed} MPH</p>
                        <p>Humidity: ${resp.main.humidity} %</p>
                        <p>UV Index</p>
                    </div>
                </div>`;

    },
    fetchForecast: (resp) => {
        // USES THE LAT AND LON FROM FIRST API CALL TO MAKE SECOND API CALL
        let lat = resp.coord.lat;
        let lon = resp.coord.lon;
        let lang = 'en';
        let units = 'metric';
        let key = 'a062419f12b0eace43e957d3ea3afb84';
        let url = `http://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&appid=${key}&units=${units}&lang=${lang}`;
        
        fetch(url)
            .then(resp => {
                if(!resp.ok) throw new Error(resp.statusText);
                return resp.json();
            })
            .then(data=>{
                app.showForecast(data);
            })
            .catch(console.err);
    },
    showForecast: (resp) => {
        console.log(resp);
        let row = document.querySelector('#forecastSection');

        row.innerHTML = resp.daily.map((day, idx) => {
            if (idx <= 4){
                let date = new Date(day.dt * 1000);
                return `<div class="forecastCard">
                <h4>${date.toDateString()}</h4>
                <img
                    src="http://openweathermap.org/img/wn/${day.weather[0].icon}.png"
                    class="forecastImage"
                    alt="${day.weather[0].description}"
                />
                <p>Temp: ${day.temp.day}</p>
                <p>Wind: ${day.wind_speed} MPH</p>
                <p>Humidity: ${day.humidity} %</p>
            </div>`
            }
        }).join(' ');

        

    },
    addSearch: (resp) => {
        var citySearch = {
            name: resp.name
        }
        searchHistory.push(citySearch)
        localStorage.setItem("searchHistory", JSON.stringify(searchHistory))
    },
    populateHistory() {
        for (i=0; i<searchHistory.length;i++){
            var cityEl = document.createElement('p');
            cityEl.className = "searchCity";
            cityEl.textContent = searchHistory[i].name;
            console.log(searchHistory[i].name)
            var element = document.getElementById("cityFolder");
            element.appendChild(cityEl);
        }
    },

};

app.init();

