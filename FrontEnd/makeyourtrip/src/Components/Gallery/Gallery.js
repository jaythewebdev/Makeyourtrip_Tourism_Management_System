import "../LandingPage/LandingPage.css";
import img1 from '../images/img1.jpg'
import img4 from '../images/img4.jpg'
import img5 from '../images/img5.jpg'
import img6 from '../images/img6.jpg'
import img7 from '../images/img7.jpg'
import img8 from '../images/img8.jpg'




import { FiSearch } from "react-icons/fi";
import { Link } from "react-router-dom";
import { useEffect ,useState} from "react";


function Gallery() {
const [images, setImages] = useState([]);



const getImageInfo = () => {
  fetch("http://localhost:5133/api/TripImage", {
    method: "GET",
    headers: {
      accept: "application/json",
    },
  })
    .then(async (response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const imageData = await response.json();
      setImages(imageData);
    })
    .catch((error) => {
      console.error("Error fetching image data:", error);
    });
};

useEffect(() => {
  getImageInfo();
}, []);

const filteredImages = images.filter((image) => image.categoryId === 2);
console.log(filteredImages);

  return (
    <section id="gallery">
    <div class="gallery-center">

{/* {filteredImages.slice(0, 2).map((image, index) => (
          <article key={index} className="gallery-img-container">
            {image.imageUrl && (
              <img src={image.imageUrl} alt="" className="gallery-img" />
            )}
            <Link to="/searchPage" className="gallery-icon">
              <FiSearch />
            </Link>
          </article>
        ))} */}
{filteredImages.slice(Math.max(filteredImages.length - 2, 0)).map((image, index) => (
  <article key={index} className="gallery-img-container">
    {image.imageUrl && (
      <img src={image.imageUrl} alt="" className="gallery-img" />
    )}
    <Link to="/searchPage" className="gallery-icon">
      <FiSearch />
    </Link>
  </article>
))}



     <article class="gallery-img-container">
     <img src={img4} alt="" class="gallery-img"/>
       <Link to="/searchPage"  class="gallery-icon">
       <FiSearch></FiSearch>
       </Link>
     </article>

     <article class="gallery-img-container">
     <img src={img5} alt="" class="gallery-img"/>
       <Link to="/searchPage"  class="gallery-icon">
       <FiSearch></FiSearch>
       </Link>
     </article>

     {/* <!-- end single img gallery -->
     <!-- single img gallery --> */}
     <article class="gallery-img-container">
     <img src={img6} alt="" class="gallery-img"/>
       <Link to="/searchPage"  class="gallery-icon">
       <FiSearch></FiSearch>
       </Link>
     </article>
     {/* <!-- end single img gallery -->
     <!-- single img gallery --> */}
     <article class="gallery-img-container">
     <img src={img7} alt="" class="gallery-img"/>
       <Link to="/searchPage"  class="gallery-icon">
       <FiSearch></FiSearch>
       </Link>
     </article>
     {/* <!-- end single img gallery -->
     <!-- single img gallery --> */}
     <article class="gallery-img-container">
     <img src={img8} alt="" class="gallery-img"/>
       <Link to="/searchPage"  class="gallery-icon">
       <FiSearch></FiSearch>
       </Link>
     </article>
     {/* <!-- end single img gallery -->
     <!-- single img gallery --> */}
     <article class="gallery-img-container">
     <img src={img1} alt="" class="gallery-img"/>
       <Link to="/searchPage"  class="gallery-icon">
       <FiSearch></FiSearch>
       </Link>
     </article>
     {/* <!-- end single img gallery --> */}
    </div>
  </section>
  );
}

export default Gallery;


