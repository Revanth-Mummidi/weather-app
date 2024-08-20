import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, FormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title: string = 'my-app';
  address: string = '';
  humidity: number = 0;
  temperature: number = 0;
  pressure: number = 0;
  weather_description: string = '';
  getLatLong() {
    try {
      alert("Submitted");
      fetch(`http://localhost:8000/api/getcoordinates/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization:
            'Bearer ' +
            'pk.eyJ1IjoiYWRpdHlhbmFsbGEwNyIsImEiOiJjbGlldGQ4ZmYwOHUyM2R0NGIzOXo2eGN3In0.tA-3eTjgg3kk2jIza4W_-A',
        },
        body: JSON.stringify({ place: this.address }),
      })
        .then((response) => response.json())
        .then((data) => {
          console.log('DATA FETCHED', data);
          const lat = data.features[0].geometry.coordinates[1];
          const lon = data.features[0].geometry.coordinates[0];
          const weatherKey = `1d099cc58c98c626e6c2d0c6679f0a3f`;
          fetch(`http://localhost:8000/api/getweatherreport/`, {
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
              this.humidity = data.main.humidity;
              this.temperature = data.main.temp;
              this.pressure = data.main.pressure;
              this.weather_description=data.weather[0].description;
            })
            .catch((error) => {
              console.log(error);
            });
        });
    } catch (e) {
      console.log(e);
    }
  }
}
