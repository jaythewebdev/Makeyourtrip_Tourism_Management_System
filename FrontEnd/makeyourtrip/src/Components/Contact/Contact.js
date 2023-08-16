import React from 'react';
import aboutus from "../images/about.jpg"
import Navbar from '../Navbar/Navbar';
import Footer from '../Footer/Footer';
import "../Contact/Contact.css"

const Contact = () => {
  return (
    <div>
        <div style={{marginTop:"5rem"}}>
            <Navbar/>
        </div>
      {/* About Section */}
      <section className="general-section" id="about">
        <div className="section-title">
          <h2>about <span>us</span></h2>
        </div>
        <div className="section-center about-center">
          <article className="about-img">
            <img src={aboutus} className="about-photo" alt="about-img" />
          </article>
          <article className="about-info">
            <h3>explore the difference</h3>
            <p>
              Lorem ipsum dolor sit amet consectetur, adipisicing elit. Sunt
              excepturi quibusdam minima, quis accusantium delectus eligendi illo,
              maiores, nisi iusto ratione magni. Consequatur.
            </p>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Doloribus excepturi corporis, enim labore iure ex, non deleniti maiores eum quae iste neque hic rerum.</p>
            <a href="#" className="btn">read more</a>
          </article>
        </div>
      </section>

      {/* Services Section */}
      <section className="general-section services" id="services">
        <div className="section-title">
          <h2>our <span>services</span></h2>
        </div>
        <div className="section-center services-center">
          <article className="service">
            <span className="service-icon">
              <i className="fas fa-plane-departure"></i>
            </span>
            <div className="service-info">
              <h4 className="service-title">comfortable journey</h4>
              <p className="service-text">
                Lorem ipsum dolor sit amet consectetur, adipisicing elit. Exercitationem, sequi sunt! Ipsum temporibus earum illo.
              </p>
            </div>
          </article>
          <article className="service">
            <span className="service-icon">
              <i className="fas fa-globe-americas"></i>
            </span>
            <div className="service-info">
              <h4 className="service-title">travel guide</h4>
              <p className="service-text">
                Lorem ipsum dolor sit amet consectetur, adipisicing elit. Exercitationem, sequi sunt! Ipsum temporibus earum illo.
              </p>
            </div>
          </article>
          <article className="service">
            <span className="service-icon">
              <i className="fas fa-solid fa-hotel"></i>
            </span>
            <div className="service-info">
              <h4 className="service-title">luxurious hotels</h4>
              <p className="service-text">
                Lorem ipsum dolor sit amet consectetur, adipisicing elit. Exercitationem, sequi sunt! Ipsum temporibus earum illo.
              </p>
            </div>
          </article>
        </div>
      </section>
      <div className='map-container'>
        <div className='map-divison child-container'>
        <iframe
      src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d15555.889200430796!2d80.2209664!3d12.909501849999998!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sen!2sin!4v1691578170995!5m2!1sen!2sin"
      width="400"
      height="300"
      style={{ border: 0 }}
      allowFullScreen=""
      loading="lazy"
      referrerPolicy="no-referrer-when-downgrade"
    />
          </div>  
      </div>
      <div style={{marginTop:"5rem"}}>
            <Footer/>
        </div>
    </div>
  );
}

export default Contact;
