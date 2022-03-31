import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectWeatherList, setWeatherList } from "../store/toDo";
import moment from "moment";
const Weather = () => {
  const dispatch = useDispatch();
  const [lat, setLat] = useState(null);
  const [lon, setLon] = useState(null);
  const [status, setStatus] = useState(null);
  const getWeatherList = useSelector(selectWeatherList);
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
    if (status === true) dispatch(setWeatherList({ lat, lon }));
  }, [status]);
  return (
    <div className="weatherMain_container">
      <div className="today">
        <div className="today_now">
          {getWeatherList.timezone && (
            <p style={{ alignSelf: "self-start" }}>
              {getWeatherList.timezone}{" "}
            </p>
          )}
          {getWeatherList.current && (
            <img
              src={`http://openweathermap.org/img/w/${getWeatherList.current.weather[0].icon}.png`}
              style={{ width: "4vw", height: "6vh" }}
            />
          )}

          {getWeatherList.current && (
            <p>temp: {Math.round(getWeatherList.current.temp)} &#8451; </p>
          )}
          {getWeatherList.current && (
            <p>
              feels like: {Math.round(getWeatherList.current.feels_like)}{" "}
              &#8451;{" "}
            </p>
          )}
          {getWeatherList.current && (
            <p>
              {moment().utc(getWeatherList.current.dt).format("ddd,MMMM  D")}
            </p>
          )}
        </div>
        <div className="today_later">
          {getWeatherList.hourly &&
            getWeatherList.hourly.map((key, i) => {
              if (i < 5)
                return (
                  <div className="today_houre">
                    {getWeatherList.hourly && (
                      <img
                        src={`http://openweathermap.org/img/w/${
                          getWeatherList.hourly[i + 1].weather[0].icon
                        }.png`}
                      />
                    )}

                    <p>
                      {moment()
                        .utcOffset(getWeatherList.hourly[i + 1].dt / 60)
                        .subtract(11, "hour")
                        .format("LT")}
                    </p>
                    <p>
                      {Math.round(getWeatherList.hourly[i + 1].temp)} &#8451;
                    </p>
                  </div>
                );
            })}
        </div>
      </div>
      <div className="daily">
        {getWeatherList.daily &&
          getWeatherList.daily.map((key, i) => {
            if (i < 5)
              return (
                <div className="day">
                  {getWeatherList.daily && (
                    <img
                      src={`http://openweathermap.org/img/w/${
                        getWeatherList.daily[i + 1].weather[0].icon
                      }.png`}
                    />
                  )}

                  {getWeatherList.daily && (
                    <p>
                      {moment
                        .unix(getWeatherList.daily[i + 1].dt)
                        .format("ddd,MMMM  D")}
                    </p>
                  )}
                  {getWeatherList.daily && (
                    <p>
                      {Math.round(getWeatherList.daily[i + 1].temp.day)} &#8451;
                    </p>
                  )}
                  {getWeatherList.daily && (
                    <p style={{ alignSelf: "flex-end", color: "white" }}>
                      feels like:{" "}
                      {Math.round(getWeatherList.daily[i + 1].feels_like.day)}{" "}
                      &#8451;
                    </p>
                  )}
                </div>
              );
          })}
      </div>
    </div>
  );
};

export default Weather;

/*{getWeatherList.hourly && (
        <div>
          {moment()
            .utcOffset(getWeatherList.hourly[0].dt / 60)
            .add(2, "hours")
            .format("h:mm A")}
        </div>
          )}*/
