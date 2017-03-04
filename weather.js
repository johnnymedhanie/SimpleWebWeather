class WeatherApp {
    constructor() {
        // TODO: 1: Create a data structure that stores the current weather and forecast for all cities
        this.cityWeather = {};
        // TODO: 2 Listen when a dropdown list is changed
        const cityDropDownE = document.getElementById('cityDropdown');
        console.log(cityDropDownE);
        cityDropDownE.addEventListener('change', this.selectCity.bind(this), false);
        // TODO: 3 Fetch data for the current selected city
        const selectedCity = cityDropDownE.value;
        this.sendRequest(selectedCity);
    }

    selectCity(event) {
        // TODO: 2-1: Display value

        //console.log('select value');
        //console.log(event.target.value);

        // TODO: 11: Get the city weather info or display it

        //console.log(this.cityWeather)
        const city = event.target.value;

        if(!this.cityWeather[city]) {
          this.sendRequest(city);
        }
        else {
          this.displayCurrentWeather(city);
        }

    }

    sendRequest(city) {
        // TODO: 4: Build query string to get weather information using Yahoo API
        const format ='%22)&format=json'
        const base_uri = `https://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20weather.forecast%20where%20woeid%20in%20(select%20woeid%20from%20geo.places(1)%20where%20text%3D%22${city}${format}`

        // TODO: 5: Fetch data using getJSON
        $.getJSON(base_uri)
          .done((json) => {
            this.processResponse(city,json);
          })
          .fail((jqxhr, testStatus, error) => {
            const err = textStatus + "," + error;
            console.log("Request faied:" + err);
          })
    }

    processResponse(city, json) {
        // TODO: 6: access the weather information
        const item = json.query.results.channel.item;
        //console.log('#6')
        //console.log(item);
        // TODO: 7: store in the cityWeather object in our memory
        if (item) {
          // add current weather
          this.cityWeather[city] = {} // {Vancouver: {}}
          this.cityWeather[city].current = item['condition'];
          this.cityWeather[city].forecast = item['forecast'];

          //console.log('current weather');
          //console.log(item);

          // display current weather
          this.displayCurrentWeather(city);
        }
    }

    displayCurrentWeather(city) {
        // TODO: 8 Display weather in the DOM
        if (this.cityWeather[city]) {
          const cityE = document.querySelector('.current .city');
          const dateE = document.querySelector('.current .date');
          const tempE = document.querySelector('.current .temp');
          const descriptionE = document.querySelector('.current .description');

          //console.log('What is cityE');
          //console.log(cityE);

          cityE.textContent = city;
          dateE.textContent = this.cityWeather[city].current.date;
          tempE.textContent = this.cityWeather[city].current.temp + 'F';
          descriptionE.textContent = this.cityWeather[city].current.text;

          this.displayForecast(this.cityWeather[city].forecast);

        }
    }

    displayForecast(forecastArray) {
        // TODO: 12: get forecast element from the DOM
        const forecastElements = document.querySelectorAll('.forecast .item');
        // TODO: 13: Display 1 day forecast

        for(let i = 0; i < 10; i++) {

          let dateE = forecastElements[i].querySelector('.date');
          let highE = forecastElements[i].querySelector('.hightemp');
          let lowE = forecastElements[i].querySelector('.lowtemp');
          let descriptionE = forecastElements[i].querySelector('.description');

          dateE.textContent = forecastArray[i].day + ", " + forecastArray[i].date;
          highE.textContent = forecastArray[i].high+ "F";
          lowE.textContent = forecastArray[i].low + "F";
          descriptionE.textContent = forecastArray[i].text;

      }

    }
}

// Instantiate the weather app
const weatherApp = new WeatherApp()
