import React from "react";
import image1 from "../images/Burger.avif";
import image2 from "../images/momos.avif";
import image3 from "../images/Pizza.avif";

const Carousal = () => {
  return (
    <div>
      <div>
      <div id="carouselExampleFade" className="carousel slide carousel-fade" data-bs-ride='carousal' style={{objectFit:"cover !important"}}>
        <div className="carousel-inner" id="carousel">
        
        <div className="carousel-caption " style={{zIndex:"10"}}>
          <form className="d-flex " role="search">
          <input className="form-control me-2 bg-dark border border-success text-white" type="search" placeholder="Search" aria-label="Search"/>
          <button className="btn  text-white bg-success" type="submit">Search</button>
          </form>
        </div>

          <div className="carousel-item active">
            <img src={image1} className="d-block w-100" style={{filter: "brightness(30%)"}} alt="..." />
          </div>
          <div className="carousel-item">
            <img src={image2} className="d-block w-100" style={{filter: "brightness(30%)"}} alt="..." />
          </div>
          <div className="carousel-item">
            <img src={image3} className="d-block w-100" style={{filter: "brightness(30%)"}} alt="..." />
          </div>
        </div>
        <button
          className="carousel-control-prev"
          type="button"
          data-bs-target="#carouselExampleFade"
          data-bs-slide="prev"
        >
          <span
            className="carousel-control-prev-icon"
            aria-hidden="true"
          ></span>
          <span className="visually-hidden">Previous</span>
        </button>
        <button
          className="carousel-control-next"
          type="button"
          data-bs-target="#carouselExampleFade"
          data-bs-slide="next"
        >
          <span
            className="carousel-control-next-icon"
            aria-hidden="true"
          ></span>
          <span className="visually-hidden">Next</span>
        </button>
      </div>
      </div>
    </div>
  );
};

export default Carousal;
