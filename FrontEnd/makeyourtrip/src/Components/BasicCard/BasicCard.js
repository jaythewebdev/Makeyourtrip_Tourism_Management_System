import "../LandingPage/LandingPage.css";
import kenya from "../images/kenya.jpg";
import london from "../images/london.jpg";
import paris from "../images/paris.jpg";
import newyork from "../images/new york.jpg";
import { LiaMapSolid } from "react-icons/lia";

function BasicCard() {
  return (
    <div class="section-center tours-center">
        {/* <!-- single card --> */}
        <article class="tour-card">
          <div class="tour-img-container">
            <img src={london} class="tours-img" alt="london" />
            <p>26th August,2021</p>
          </div>
          <div class="tours-info">
            <h4 class="tours-info-title">explore london</h4>
            <p class="tours-info-text">
              Lorem, ipsum dolor sit amet consectetur adipisicing elit. Dolor
              exercitationem repudiandae repellendus ratione animi commodi
              assumenda eveniet minima odio corporis!
            </p>
            <div class="tours-footer">
              <p>
                <span>
                  <LiaMapSolid></LiaMapSolid>
                  london
                </span>
              </p>
              <p>6days</p>
              <p>from ₹75000</p>
            </div>
          </div>
        </article>
        {/* <!-- end single card -->
<!-- single card --> */}
        <article class="tour-card">
          <div class="tour-img-container">
            <img src={kenya} class="tours-img" alt="kenya" />
            <p>30th August,2021</p>
          </div>
          <div class="tours-info">
            <h4 class="tours-info-title">wild kenya</h4>
            <p class="tours-info-text">
              Lorem, ipsum dolor sit amet consectetur adipisicing elit. Dolor
              exercitationem repudiandae repellendus ratione animi commodi
              assumenda eveniet minima odio corporis!
            </p>
            <div class="tours-footer">
              <p>
                <span>
                  <LiaMapSolid></LiaMapSolid>
                  kenya
                </span>
              </p>
              <p>4days</p>
              <p>from ₹45000</p>
            </div>
          </div>
        </article>
        {/* <!-- end single card -->
<!-- single card --> */}
        <article class="tour-card">
          <div class="tour-img-container">
            <img src={paris} class="tours-img" alt="paris" />
            <p>4th september,2021</p>
          </div>
          <div class="tours-info">
            <h4 class="tours-info-title">lovely paris</h4>
            <p class="tours-info-text">
              Lorem, ipsum dolor sit amet consectetur adipisicing elit. Dolor
              exercitationem repudiandae repellendus ratione animi commodi
              assumenda eveniet minima odio corporis!
            </p>
            <div class="tours-footer">
              <p>
                <span>
                  <LiaMapSolid></LiaMapSolid>
                  Paris
                </span>
              </p>
              <p>7days</p>
              <p>from ₹95000</p>
            </div>
          </div>
        </article>
        {/* <!-- end single card -->
<!-- single card --> */}
        <article class="tour-card">
          <div class="tour-img-container">
            <img src={newyork} class="tours-img" alt="new york" />
            <p>13th october,2021</p>
          </div>

          <div class="tours-info">
            <h4 class="tours-info-title">newyork nightlife</h4>
            <p class="tours-info-text">
              Lorem, ipsum dolor sit amet consectetur adipisicing elit. Dolor
              exercitationem repudiandae repellendus ratione animi commodi
              assumenda eveniet minima odio corporis!
            </p>
            <div class="tours-footer">
              <p>
                <span>
                  <LiaMapSolid></LiaMapSolid>
                  New york
                </span>
              </p>
              <p>3days</p>
              <p>from ₹90000</p>
            </div>
          </div>
        </article>
    </div>
  );
}

export default BasicCard;
