const app = {
    init: () => {
        document
        // EVENT LISTENER FOR BUTTON
            .getElementById('btnGet')
            // CALLS FETCHWEATHER FUNCTION
            .addEventListener('click', app.fetchWeather);
        document
        // EVENT LISTENER FOR BUTTON
            .getElementById('btnCurrent')
            // CALLS FETCHWEATHER FUNCTION
            .addEventListener('click', app.getLocation);
    },
    fetchWeather: (ev) => {
        // USE THE VALUES FROM LATITUDE AND LONGITUDE TO FETCH THE WEATHER
        let lat = document.getElementById('latitude').value;
        let long = document.getElementById('longitude').value;
        let key = 'a062419f12b0eace43e957d3ea3afb84'; //API KEY
        let lang = 'en'; // SETS LANGUAGE
        let units = 'metric'; // SETS UNITS 
        let url = `http://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&appid=${key}&units=${units}&lang=${lang}`
        // FETCH THE WEATHER
        fetch(url)
            .then(resp => {
                if(!resp.ok) throw new Error(resp.statusText)
            })
            .then()
            .catch(console.err);
    },
    getLocation: (ev) => {
        let opts = {
            enableHighAccuracy: true,
            timeout: 1000 * 10,
            maximumAge: 1000* 60 * 5,
        };
        // CALL GEOLOCATION.GETCURRENTPOSITION METHOD
        // THIS IS BUILT INTO BROWSER
        navigator.geolocation.getCurrentPosition(app.ftw, app.wtf, opts);
    },
    ftw: (position) => {
        // ON SUCCESS, FILL IN FORM
        // SETS LATITUDE AND LONGITUDE TO 2 DECIMAL PLACES
        document.getElementById('latitude').value = position.coords.latitude.toFixed(2);
        codument.getElementById('longitude').value = position.coords.longitude.toFixed(2);
    },
    wtf: (err) => {
        // WRITES IN THE CONSOLE THAT THERE IS AN ERROR IF FAILS
        console.error(err);
    },
    showWeather: (resp) => {
        console.log(resp);
        let row = document.querySelector('.weather.row');
        // CLEAR OUT THE OLD WEATHER AND ADD THE NEW
        // row.innerHTML = '';

        row.innerHTML = 
    },
};

app.init();