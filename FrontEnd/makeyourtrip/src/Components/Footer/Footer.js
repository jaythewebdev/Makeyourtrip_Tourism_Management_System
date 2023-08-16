import "../LandingPage/LandingPage.css";
import { BsFacebook } from "react-icons/bs";
import { AiFillTwitterCircle } from "react-icons/ai";
import { AiFillInstagram } from "react-icons/ai";
import { Link } from "react-router-dom";

function Footer() {
  return (
   <footer className="footer general-section">
         <ul className="footer-list">
         <li>
          <Link to="/"
            style={{ textDecoration: "none" }}
           
            className="footer-links scroll-link"
          >
            home
          </Link>
        </li>
        <li>
          <Link to="/about" className="footer-links scroll-link">
            about
          </Link>
        </li>
        <li>
          <Link to="/searchPage" className="footer-links scroll-link">
            Tours
          </Link>
        </li>
        {/* <li>
          <Link to="/profile" className="my-navbar-links scroll-link">
            Profile
          </Link>
        </li> */}
        <li>
          <a href="#gallery" className="footer-links scroll-link">
            gallery
          </a>
        </li>
          </ul>

        <div className="social-icons">
          <span>
            <a href="https://twitter.com/i/flow/login" className="footer-links-icon"><AiFillTwitterCircle></AiFillTwitterCircle></a>
          </span>
          <span>
            <a href="https://www.facebook.com/campaign/landing.php?&campaign_id=15316858002&extra_1=s%7Cc%7C563139538292%7Cb%7Cfacebook%27%7C&placement=&creative=563139538292&keyword=facebook%27&partner_id=googlesem&extra_2=campaignid%3D15316858002%26adgroupid%3D130780223675%26matchtype%3Db%26network%3Dg%26source%3Dnotmobile%26search_or_content%3Ds%26device%3Dc%26devicemodel%3D%26adposition%3D%26target%3D%26targetid%3Dkwd-327090827491%26loc_physical_ms%3D1007809%26loc_interest_ms%3D%26feeditemid%3D%26param1%3D%26param2%3D&gclid=Cj0KCQjwrMKmBhCJARIsAHuEAPRAYWYfl2ZkeYQplMAUhnFXTnQx01b0KQ05WMm0b2T1qlBrLcA4-jQaAhy5EALw_wcB" className="footer-links-icon"><BsFacebook></BsFacebook></a>
          </span>
          <span>
            <a href="https://www.instagram.com/sem/campaign/emailsignup/?campaign_id=13530338610&extra_1=s%7Cc%7C547419127631%7Ce%7Cinstagram%20%27%7C&placement=&creative=547419127631&keyword=instagram%20%27&partner_id=googlesem&extra_2=campaignid%3D13530338610%26adgroupid%3D126262414014%26matchtype%3De%26network%3Dg%26source%3Dnotmobile%26search_or_content%3Ds%26device%3Dc%26devicemodel%3D%26adposition%3D%26target%3D%26targetid%3Dkwd-1321618851291%26loc_physical_ms%3D1007809%26loc_interest_ms%3D%26feeditemid%3D%26param1%3D%26param2%3D&gclid=Cj0KCQjwrMKmBhCJARIsAHuEAPSW58vvJX41nyk2AdLmf4zpG8YVR4brg8bS3-dyC6AX-De0-F2rf8EaAmkcEALw_wcB" className="footer-links-icon"><AiFillInstagram></AiFillInstagram></a>
          </span>
        </div>
        <div className="copyright">
          <p>copyright &copy; makeyourtrip tour company <span id="date">2023</span> all rights reserved</p>
        </div>
   </footer>
  );
}

export default Footer;


