import React, { useState } from "react";
import axios from "axios";




function App() {

  const [data  , setData] = useState({})
  const [location , setLocation] = useState("")

  const geoUrl =`https://api.openweathermap.org/geo/1.0/direct?q=${location}&limit=1&appid=48e23cf83075d48b0f5f4066c668383a`


  const searchLocation = (event) => {
    if (event.key==='Enter') {
      axios.get(geoUrl).then((response) => {
        if (response.data.length > 0) {
          const { lat, lon } = response.data[0];
          getWeather(lat, lon);
        } else {
          console.log("Location not found");
        }
      });
    setLocation("")
    }
  }


  const getWeather = (lat, lon) => {
    const weatherUrl = `https://api.openweathermap.org/data/3.0/onecall?lat=${lat}&lon=${lon}&appid=48e23cf83075d48b0f5f4066c668383a`
    axios.get(weatherUrl).then((response) => {
      setData(response.data);
      console.log(response.data);
    });
  };

  return (
    <div className="app">
      <div className="search">
        <input
        type="text"
        onChange={event=>setLocation(event.target.value)}
        value={location}
        placeholder="Enter Location"
        onKeyDown={searchLocation}
        />
      </div>
     <div className="container">
        <div className="top">
          <div className="location">
            <p>{data.name}</p>
          </div>
          <div className="temp">
              <h1>65° F</h1>
          </div>
          <div className="description">
            <p>Clouds</p>
          </div>
        </div>
        <div className="bottom">
          <div className="feels">
            <p className="bold">65° F</p>
            <p>Feels Like</p>
          </div>
          <div className="humidity">
          <p className="bold">20%</p>
          <p>Humidity</p>
          </div>
          <div className="wind">
              <p className="bold">12 MPH</p>
              <p>Wind speed</p>
          </div>
        </div>
     </div>
    </div>
  );
}

export default App;
