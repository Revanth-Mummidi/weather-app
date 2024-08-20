export const fetchCoordinates  = (place:string) => {
  try {
    return fetch(`http://localhost:8000/api/getcoordinates/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization:
          "Bearer " +
          "pk.eyJ1IjoiYWRpdHlhbmFsbGEwNyIsImEiOiJjbGlldGQ4ZmYwOHUyM2R0NGIzOXo2eGN3In0.tA-3eTjgg3kk2jIza4W_-A",
      },
      body: JSON.stringify({ place: place }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("DATA FETCHED", data);
        const lat = data.features[0].geometry.coordinates[1];
        const lon = data.features[0].geometry.coordinates[0];
        console.log("Latitude:", lat);
        console.log("Longitude:", lon);
        const res = { lat: lat, lon: lon };
        console.log("Result:", res);
        return res;
      })
      .catch((error) => {
        console.log(error);
        return error;
      });
  } catch (e) {
    console.log(e);
    return e;
  }
};
