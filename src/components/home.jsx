import React from "react";
import ToDo from "./toDo";
import WeatherBox from "./weather";
const Home = () => {
  return (
    <div className="home_container">
      <WeatherBox />
      <ToDo />
    </div>
  );
};

export default Home;
