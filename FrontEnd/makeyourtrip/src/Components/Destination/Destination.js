import BasicCard from "../BasicCard/BasicCard";
import "../LandingPage/LandingPage.css";
import { Link } from "react-router-dom";


function Destination() {
  return (
<section class="destination-head"id="featured">
<div class="section-title">
  <h2>destination <span>places</span></h2>
</div>
<BasicCard/>
<div class="tour-btn">
    <Link to="/searchPage" class="my-btn">
          more tours
    </Link>
</div>
</section>
  );
}

export default Destination;




