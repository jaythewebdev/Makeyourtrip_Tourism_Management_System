import React from "react";
import "../LandingPage/LandingPage.css"; // Import the CSS file if you have any styles.
import Navbar from "../Navbar/Navbar";
import Hero from "../Hero/Hero";
import Search from "../Search/Search";
import Footer from "../Footer/Footer";
import LatestInfo from "../LatestInfo/LatestInfo";
import Gallery from "../Gallery/Gallery";
import Destination from "../Destination/Destination";
import MainSlider from "../CountriesSlider/MainSlider";
import IndianStates from "../IndianStates/IndianStates";
import SearchHero from "../SearchHero/SearchHero";
import "./SearchPage.css";
import { Checkbox} from "antd";
import { SearchOutlined } from "@ant-design/icons";

import { useState, useEffect } from "react";
import { Select, Button, Radio } from "antd";
import { Link } from "react-router-dom";
import { Card, CardGroup } from "react-bootstrap";
// import DatePicker from 'react-bootstrap-date-picker';
// import 'react-bootstrap-date-picker/dist/react-bootstrap-date-picker.css';

const { Option } = Select;

const priceRangeOptions = [
  { label: "Between $1000 - $ 2000", value: [1000, 2000] },
  { label: "Between $2000 - $ 5000", value: [2000, 5000] },
  { label: "Between $5000 - $ 10000", value: [5000, 10000] },
  { label: "Above $10000", value: [10000, 10000000] },

  // ... other price range options
];

const imageStyle = {
  width: '300px',
  height: 'auto',
  margin:'1.5rem',
};

const SearchPage = () => {
  const [categories, setCategories] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedPriceRanges, setSelectedPriceRanges] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [sortType, setSortType] = useState("");
  const [sortOrder, setSortOrder] = useState("asc"); // 'asc' or 'desc'
  const [searchTerm, setSearchTerm] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [searchButtonClicked, setSearchButtonClicked] = useState(false);
  const [tourDetails, settourDetails] = useState([]);
  const [destinations, setdestinations] = useState([]);


  // const userId = 3;
  var GetAllTours = () => {
    fetch("http://localhost:5246/api/TourDetails", {
      method: "GET",
      headers: {
        accept: "text/plain",
        // Authorization: "Bearer " + localStorage.getItem("Token"),
      },
    }).then(async (data) => {
      var myData = await data.json();
      console.log(myData);
      //   const filtered = myData.filter(booking => booking.userId === userId);
      //   console.log(filtered);
      settourDetails(myData);
      const tourTypesSet = new Set(tourDetails.map((tour) => tour.tourtype));
      const distinctTypesArray = Array.from(tourTypesSet);
  
      setCategories(distinctTypesArray);
    });
  };
  useEffect(()=>{
    GetAllTours();
  },[tourDetails])

  var GetAllDestinations = () => {
    fetch("http://localhost:5246/api/Destinations", {
      method: "GET",
      headers: {
        accept: "text/plain",
        // Authorization: "Bearer " + localStorage.getItem("Token"),
      },
    }).then(async (data) => {
      var myData = await data.json();
      console.log(myData);
      //   const filtered = myData.filter(booking => booking.userId === userId);
      //   console.log(filtered);
      setdestinations(myData);
    });
  };
  useEffect(()=>{
    GetAllDestinations();
  },[destinations])

  console.log(startDate, endDate);

  // useEffect(() => {
  //   // Simulating fetching categories from an API
  //   fetchCategoriesFromAPI()
  //     .then((categories) => setCategories(categories))
  //     .catch((error) => console.error("Error fetching categories:", error));

  //   // Simulating fetching all products from an API
  //   setFilteredProducts(tourDetails);
  // }, []);

  useEffect(() => {
    applyFiltersAndSort();
  }, [selectedCategories, selectedPriceRanges, sortType, sortOrder]);

  // const fetchCategoriesFromAPI = async () => {
  //   // Replace with your API call to fetch categories
  //   return ["Adventure", "Historical", "Beach", "Cultural"];
  // };

  const handleCategoryChange = (selected) => {
    setSelectedCategories(selected);
  };

  const handlePriceRangeChange = (selected) => {
    setSelectedPriceRanges(selected);
  };
  const applyFiltersAndSort = () => {
    let filteredProducts = tourDetails;
    if (searchButtonClicked && (searchTerm || startDate || endDate)) {
      const destinationQuery = searchTerm.toLowerCase();

      const filteredTours = tourDetails.filter((tour) => {
        const tourDate = new Date(tour.departureDate);
        if (startDate && endDate) {
          const searchStartDate = new Date(startDate);
          const searchEndDate = new Date(endDate);
          if (tourDate < searchStartDate || tourDate > searchEndDate) {
            return false;
          }
        }

        if (destinationQuery) {
          const destinationObj = destinations.find(
            (dest) =>
              dest.destinationCityName
                .toLowerCase()
                .includes(destinationQuery) ||
              dest.country.toLowerCase().includes(destinationQuery)
          );
          if (
            !destinationObj ||
            tour.tourDestination.every(
              (td) => td.destinationId !== destinationObj.destinationId
            )
          ) {
            return false;
          }
        }

        return true;
      });
      console.log(filteredTours);
      filteredProducts = filteredTours;
    }
    filteredProducts = filteredProducts.filter((product) => {
      const matchesCategory =
        selectedCategories.length === 0 ||
        selectedCategories.includes(product.tourtype);

      return matchesCategory;
    });

    if (selectedPriceRanges.length > 0) {
      filteredProducts = filteredProducts.filter((product) => {
        return selectedPriceRanges.some(
          (range) =>
            product.tourPrice >= range[0] && product.tourPrice <= range[1]
        );
      });
    }

    if (sortType) {
      filteredProducts.sort((a, b) => {
        if (sortType === "price") {
          return sortOrder === "asc"
            ? a.tourPrice - b.tourPrice
            : b.tourPrice - a.tourPrice;
        } else if (sortType === "days") {
          return sortOrder === "asc"
            ? a.durationInDays - b.durationInDays
            : b.durationInDays - a.durationInDays;
        }
        return 0;
      });
    }

    setFilteredProducts(filteredProducts);
  };

  const resetFilters = () => {
    setSelectedCategories([]);
    setSelectedPriceRanges([]);
    // setSearchTerm('');
    setStartDate("");
    setEndDate("");
    // setSearchButtonClicked(false);
    setSortType("");
    setSortOrder("asc");
    setFilteredProducts(tourDetails);
  };

  const handleSearch = () => {
    setSearchButtonClicked(true);
    applyFiltersAndSort();
  };

  const handlebooknow =(id)=>{
    localStorage.removeItem("tourId");
    localStorage.setItem("tourId",id);
  }
  return (
    <div style={{backgroundColor: "#F5F5F5"
    }}>
      <headers>
        <Navbar />
        <SearchHero />
      </headers>

      <section
        id="mySearch"
        style={{
          background: "#2493e0",
          width: "90%",
          margin: "auto",
          borderBottomLeftRadius: "10px",
          borderBottomRightRadius: "10px",
        }}
      >
        <div class="cards" style={{ padding: "2rem", marginBottom: "3.5rem" }}>
          <div class="row" style={{}}>
            <div class="col-md-3">
              {" "}
              <label>Start Date</label>{" "}
              <input
              style={{height:"3rem"}}
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                class="form-control"
              />{" "}
            </div>
            <div class="col-md-3">
              {" "}
              <label>End Date</label>{" "}
              <input
              style={{height:"3rem"}}
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                class="form-control"
              />{" "}
            </div>
            <div class="col-md-3" >
              <label>Destination</label>{" "}
              <input
              style={{height:"3rem"}}
                type="type"
                placeholder="Your favourite City or Country.."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                class="form-control"
              />{" "}
            </div>
            <div class="col-md-3">
              {/* <label>Search</label> */}
              <button
                class="my-btn w-100"
                style={{ marginTop: "2.35rem",height:"3rem", paddingTop: "10px",borderRadius:"0.5rem" }}
                onClick={handleSearch}
              >
                <h5>Search</h5>
              </button>{" "}
            </div>
          </div>
        </div>
      </section>
      <div className="search-main-pan">
        <div className="main-div-1">
          <div className="main-div-1-filter-1">
            <div style={{marginBottom:"1rem",paddingTop:"1rem",paddingBottom:"0.45rem",paddingLeft:"1rem",borderBottom:"3px solid #f1f5f8"}}>
              <h4 style={{fontWeight:"1000"}}>Filter</h4>
            </div>
          <span style={{ margin: "1rem",fontWeight:"600" }}>Type</span>
            <div className="search-filter-fields" style={{marginTop: "0.67rem"}}>
              <Select
              
                mode="multiple"
                placeholder="Select categories"
                onChange={handleCategoryChange}
                value={selectedCategories} // Set value prop to reset selected categories
                style={{ width: "200px", marginRight: "16px",marginBottom:"1.2rem" }}
              >
                {categories.map((category) => (
                  <Option key={category} value={category}>
                    {category}
                  </Option>
                ))}
              </Select>
            </div>

            {/* <div className="search-filter-fields" style={{ marginBottom: '16px' }}>
          <span>Price Range:</span>
          <Radio.Group
            value={selectedPriceRanges[0]} // Only support single selection with radio buttons
            onChange={(e) => handlePriceRangeChange([e.target.value])}
          >
            {priceRangeOptions.map(option => (
              <Radio.Button  style={{ marginLeft: '0.60rem',marginRight: '0.60rem' }}
              key={option.label} value={option.value}>
                {option.label}
              </Radio.Button>
            ))}
          </Radio.Group>
          </div> */}
            {/* <div className="search-filter-fields" style={{ marginBottom: '16px' }}>
  <span>Price Range:</span>
  <Checkbox
    checked={selectedPriceRanges[0]} // Use a boolean value for single selection
    onChange={(e) => handlePriceRangeChange([e.target.checked])}
    style={{ marginLeft: '8px' }}
  >
    {priceRangeOptions[0].label}
  </Checkbox>
</div> */}
              <span style={{ margin: "1rem",fontWeight:"600" }}>Price</span>

            <div
              className="search-filter-fields"
              style={{ marginTop:"0.67rem" }}
            >
              <Checkbox.Group
                value={selectedPriceRanges} // Support multiple selection with checkboxes
                onChange={handlePriceRangeChange}
                style={{ marginLeft: "8px", marginBottom: "1rem" }}
              >
                {priceRangeOptions.map((option) => (
                  <Checkbox key={option.label} value={option.value}>
                    {option.label}
                  </Checkbox>
                ))}
              </Checkbox.Group>
            </div>
            <span style={{ margin: "1.16rem",fontWeight:"600" }}>Sort by</span>
            <div className="search-filter-fields" style={{ marginTop: "8px" }}>
              <div style={{marginTop:"0.67rem"}}>
              <Radio.Group
                value={sortType}
                onChange={(e) => setSortType(e.target.value)}
                style={{ marginLeft: "8px", marginBottom: "1rem" }}
              >
                <Radio.Button value="price">Price</Radio.Button>
                <Radio.Button value="days">Days</Radio.Button>
              </Radio.Group>
              </div>
              <span style={{ marginLeft: "0.2rem",fontWeight:"600"}}>Order by</span>
              <div>
              <Radio.Group
                value={sortOrder}
                onChange={(e) => setSortOrder(e.target.value)}
                style={{ marginLeft: "8px", marginBottom: "1rem",marginTop:"0.67rem" }}
              >
                <Radio.Button value="asc">Ascending</Radio.Button>
                <Radio.Button value="desc">Descending</Radio.Button>
              </Radio.Group>
              </div>
            </div>
            <div
              style={{
                width: "100%",
                display: "flex",
                justifyContent: "center",
                alignItems:"center"
              }}
            >
              <Button
                className="my-btn"
                style={{ width: "90%",height:"2.5rem",padding:"0.15rem",marginBottom:"1rem"}}
                onClick={resetFilters}
              >
                <h7>Reset Filters</h7>
              </Button>
            </div>
          </div>
          <div className="main-div-1-filter-2" style={{marginTop:"2rem"}}>{/* <Search/> */}</div>
        </div>
        <div className="main-div-2">
          <div style={{ display: "flex",alignItems:"center", flexWrap: "wrap",justifyContent:"center" }}>
            {/* {filteredProducts.map((product) => (
              <Card
                key={product.tourId}
                title={product.tourName}
                style={{ width: 300, margin: "16px" }}
              >
                <p>Category: {product.tourtype}</p>
                <p>Price: ${product.tourPrice}</p>
                <p>Days: {product.durationInDays}</p>
                <p>Days: {product.departureDate}</p>
                <p>Days: {product.returnDate}</p>
              </Card>
            ))} */}
     {/* {filteredProducts.map((product) => (
        <div key={product.tourId} className="card mb-3" style={{ maxWidth: '740px'}}>
          <div className="row g-0">
            <div className="col-md-4">
              <img src={product.imageUrl} className="img-fluid rounded-start" alt={product.tourName} 
                style={{ width: '100%', Height: '100%', objectFit:'cover' }}
                />
            </div>
            <div className="col-md-8">
              <div className="card-body">
                <h5 className="card-title">{product.tourName}</h5>
                <p className="card-text">Category: {product.tourType}</p>
                <p className="card-text">Price: ${product.tourPrice}</p>
                <p className="card-text">Days: {product.durationInDays}</p>
                <p className="card-text">Departure Date: {product.departureDate}</p>
                <p className="card-text">Return Date: {product.returnDate}</p>
                <p className="card-text"><small className="text-muted">Last updated 3 mins ago</small></p>
              </div>
            </div>
          </div>
        </div>
      ))} */}
      {filteredProducts.map((product) => (
        <a href="#0" className="banner" aria-label="Shop now" key={product.tourId}>
          <div className="banner__grid">
            <div aria-hidden="true">
              <figure
                className="banner__figure"
                style={{ backgroundImage: `url(${product.imageUrl})` }}
              ></figure>
            </div>

            <div className="banner__text">
              <h2>{product.tourName}</h2>
              <h6>
                {product.tourtype}
                <br></br>
                <br />
                 {product.durationInDays} Days
                 <br />
                Price: ${product.tourPrice}
              </h6>

              <Link to="/tourpage">
              <p className="banner__link-wrapper">
                <span className="banner__link">
                  <i onClick={() => handlebooknow(product.tourId)}>Book Now</i>
                </span>
              </p>
              </Link>
            </div>
          </div>
        </a>
      ))}
          </div>
        </div>
      </div>
      <footer style={{ marginTop: "3rem" }}>
        <Footer />
      </footer>
    </div>
  );
};

export default SearchPage;
