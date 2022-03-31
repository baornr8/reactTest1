import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectCurrentWeather, setCurrentWeather } from "../store/toDo";
import DoubleArrowIcon from "@mui/icons-material/DoubleArrow";
import { IconButton } from "@mui/material";
import { useNavigate } from "react-router-dom";
const WeatherBox = (props) => {
  const [lat, setLat] = useState(null);
  const [lon, setLon] = useState(null);
  const [status, setStatus] = useState(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const getCurrentWeather = useSelector(selectCurrentWeather);
  const getLocation = () => {
    if (!navigator.geolocation) {
      setStatus("Geolocation is not supported by your browser");
    } else {
      setStatus("Locating...");
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLat(position.coords.latitude);
          setLon(position.coords.longitude);
          setStatus(true);
        },
        () => {
          setStatus("Unable to retrieve your location");
        }
      );
    }
  };

  useEffect(() => {
    getLocation();
  }, []);
  useEffect(() => {
    if (status === true) {
      dispatch(setCurrentWeather({ lat, lon }));
    }
  }, [status]);
  return (
    <div className="Weather_container">
      {getCurrentWeather.name && <p>{getCurrentWeather.name}</p>}
      {getCurrentWeather.weather && (
        <img
          src={`http://openweathermap.org/img/w/${getCurrentWeather.weather[0].icon}.png`}
          alt=""
        />
      )}
      {getCurrentWeather.main && (
        <p>temp: {Math.round(getCurrentWeather.main.temp)} &#8451; </p>
      )}
      {getCurrentWeather.wind && (
        <p>Wind Speed:{getCurrentWeather.wind.speed}</p>
      )}

      {getCurrentWeather.name && (
        <IconButton
          sx={{ alignSelf: "flex-end", margin: "2vh" }}
          children={<DoubleArrowIcon />}
          onClick={() => navigate("/weather")}
        />
      )}
    </div>
  );
};

export default WeatherBox;
