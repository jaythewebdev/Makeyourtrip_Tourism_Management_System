import React from 'react';
import './LandingPage.css'; // Import the CSS file if you have any styles.
import Navbar from '../Navbar/Navbar';
import Hero from '../Hero/Hero';
import Search from '../Search/Search';
import Footer from '../Footer/Footer';
import LatestInfo from '../LatestInfo/LatestInfo';
import Gallery from '../Gallery/Gallery';
import Destination from '../Destination/Destination';
import MainSlider from '../CountriesSlider/MainSlider';
import IndianStates from '../IndianStates/IndianStates';


const LandingPage = () => {
  return (
    <div>
      {/* Header */}
      {/* <header id="header"> */}
        <Navbar/>
        <Hero/>
      {/* </header> */}
      {/* ... */}
      <Search/>
      <IndianStates/>
      <MainSlider/>
      <Destination/>
      <LatestInfo/>
      <Gallery/>
    <Footer/>

      {/* About Section */}
      {/* ... */}

      {/* Services Section */}
      {/* ... */}

      {/* Tours Section */}
      {/* ... */}

      {/* Contact Section */}
      {/* ... */}

      {/* Gallery Section */}
      {/* ... */}

      {/* Footer */}
      {/* ... */}
    </div>
  );
};

export default LandingPage;
