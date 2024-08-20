export const fetchWeatherReport  = (lat:string,lon:string) => {
    try {
        const weatherKey = `1d099cc58c98c626e6c2d0c6679f0a3f`;
          return fetch(`http://localhost:8000/api/getweatherreport/`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              Authorization: 'Bearer ' + weatherKey,
            },
            body: JSON.stringify({ lat: lat, lon: lon }),
          })
            .then((response) => response.json())
            .then((data) => {
              console.log('DATA FETCHED', data);
              return data;
             
            })
            .catch((error) => {
              console.log(error);
            });
    } catch (e) {
      console.log(e);
    }
  };

//   this.humidity = data.main.humidity;
//   this.temperature = data.main.temp;
//   this.pressure = data.main.pressure;
//   this.weather_description=data.weather[0].description;
  