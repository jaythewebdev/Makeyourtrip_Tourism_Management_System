import React, { useState } from "react";
import "./IndianStates.css";
import "../CountriesSlider/Slider.css"
import "../LandingPage/LandingPage.css"
import { Link } from "react-router-dom";

const IndianStates = () => {
  const [activePanelIndex, setActivePanelIndex] = useState(0);

  const panelsData = [
    {
      backgroundImage:
        'url("https://images.unsplash.com/photo-1558979158-65a1eaa08691?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80")',
      title: "Explore The World",
    },
    {
      backgroundImage:
        'url("https://images.unsplash.com/photo-1572276596237-5db2c3e16c5d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80")',
      title: "Wild Forest",
    },
    {
      backgroundImage:
        'url("https://images.unsplash.com/photo-1507525428034-b723cf961d3e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1353&q=80")',
      title: "Sunny Beach",
    },
    {
      backgroundImage:
        'url("https://images.unsplash.com/photo-1551009175-8a68da93d5f9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1351&q=80")',
      title: "City on Winter",
    },
    {
      backgroundImage:
        'url("https://images.unsplash.com/photo-1549880338-65ddcdfd017b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80")',
      title: "Mountains - Clouds",
    },
  ];

  const handlePanelClick = (index) => {
    setActivePanelIndex(index);
  };

  return (
    <div>
        <div className="states-slider-header">
        <span style={{textTransform:"uppercase"}}>Top states</span>
        <h1>Popular Indian Destinations</h1>
        <p>
          We are a team of humans with the strategy, tools, and solutions and
          digital products.
        </p>
      </div>
      <div className="section-center states-container">
      {panelsData.map((panel, index) => (
        <div
          key={index}
          className={`panel ${activePanelIndex === index ? "active" : ""}`}
          style={{ backgroundImage: panel.backgroundImage }}
          onClick={() => handlePanelClick(index)}
        >
          <h3>{panel.title}</h3>
        </div>
      ))}
    </div>
    <div class="tour-btn" style={{marginTop:"2rem"}}>
    <Link to="/searchPage" class="my-btn">
          Explore India
    </Link>
</div>
    </div>
  );
};

export default IndianStates;
