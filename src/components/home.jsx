import React from "react";
import ToDo from "./toDo";
import WeatherBox from "./weatherBox";
const Home = () => {
  return (
    <div className="home_container">
      <WeatherBox />
      <ToDo />
    </div>
  );
};

export default Home;
