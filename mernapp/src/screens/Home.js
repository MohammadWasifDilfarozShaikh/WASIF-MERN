import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Card from "../components/Card";
// import Cart from '../screens/Cart'
import image1 from "../images/Burger.avif";
import image2 from "../images/momos.avif";
import image3 from "../images/Pizza.avif";

const Home = () => {
  const [foodCat, setFoodCat] = useState([]);
  const [foodItems, setFoodItem] = useState([]);
  const [search, setSearch] =useState("");

  const loadData = async () => {
    let response = await fetch("http://localhost:5000/api/foodData", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
    });
    response = await response.json();
    setFoodItem(response[0]);
    setFoodCat(response[1]);
  };

  useEffect(() => {
    loadData();
  }, []);

  return (
    <div>
      <div>
        {" "}
        <Navbar />{" "}
      </div>

      <div>
        {" "}
        <div
          id="carouselExampleFade"
          className="carousel slide carousel-fade"
          data-bs-ride="carousal"
          style={{ objectFit: "cover !important" }}
        >
          <div className="carousel-inner" id="carousel">
            <div className="carousel-caption " style={{ zIndex: "10" }}>
              <div className="d-flex justify-content-center" >
                <input
                  className="form-control me-2 bg-dark border border-success text-white"
                  type="search"
                  placeholder="Search"
                  aria-label="Search"
                  value={search}
                  onChange={(e)=>{setSearch(e.target.value)}}
                />
                <button className="btn  text-white bg-success" type="submit">
                  Search
                </button>
              </div>
            </div>

            <div className="carousel-item active">
              <img
                src={image1}
                className="d-block w-100"
                style={{ filter: "brightness(30%)" }}
                alt="..."
              />
            </div>
            <div className="carousel-item">
              <img
                src={image2}
                className="d-block w-100"
                style={{ filter: "brightness(30%)" }}
                alt="..."
              />
            </div>
            <div className="carousel-item">
              <img
                src={image3}
                className="d-block w-100"
                style={{ filter: "brightness(30%)" }}
                alt="..."
              />
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
        </div>{" "}
      </div>

      <div className="container">
        {foodCat != []
          ? foodCat.map((data) => {
              return (
                <div className="row mb-3">
                  <div key={data._id} className="fs-3 m-3">
                    {data.CategoryName}
                  </div>
                  <hr />

                  {foodItems
                    .filter((item) => item.CategoryName === data.CategoryName && (item.name.toLowerCase().includes(search.toLowerCase()))) 
                    .map((filterItems) => {
                      return (
                        <div
                          className="col-12 col-md-6 col-lg-3"
                          key={filterItems._id}
                        >
                          <Card
                            foodItem = {filterItems}
                            options={filterItems.options[0]}
                            ImgSrc={filterItems.img}
                          ></Card>
                        </div>
                      );
                    })}
                </div>
              );
            })
          : "No Data"}
      </div>

      <div>
        {" "}
        <Footer />{" "}
      </div>
    </div>
  );
};

export default Home;
