import "../LandingPage/LandingPage.css";
import bg1 from "../images/bg1.jpg";
import bg2 from "../images/bg2.jpg";
import Search from "../Search/Search";
import { Link } from "react-router-dom";

function Hero() {
  return (
    <div class="hero-container">
      <div class="content">
        <div class="carousel-content">
          <div class="hero-banner" >
          <h1>indonesia</h1>
          <p>Perfect travel with awesome experience.</p>
            <Link to="/searchPage" class="my-btn hero-btn scroll-link">
              Explore Tours
            </Link>
          </div>
        </div>
        <div class="slideshow">
          {/* <div className="slide-btn-container">
          <button class="slide-btn slide-btn-1"></button>
          <button class="slide-btn slide-btn-2"></button>
          <button class="slide-btn slide-btn-3"></button>
          <button class="slide-btn slide-btn-4"></button>
          <button class="slide-btn slide-btn-5"></button>
          </div> */}
          <div class="slideshow-wrapper" style={{borderBottom:"5px solid #fe5c24"}}>
            <div class="slide">
              <img class="slide-img" src={bg1} style={{background:"linear-gradient(rgb(44, 174, 186, 0.5), rgba(0, 0, 0, 0.7)),center/cover no-repeat"}}/>
            </div>
            <div class="slide">
              <img class="slide-img" src={bg2} />
            </div>
            <div class="slide">
              <img class="slide-img" src={bg1} />
            </div>
            <div class="slide">
              <img class="slide-img" src={bg2} />
            </div>
            <div class="slide">
              <img class="slide-img" src={bg1} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Hero;
