import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Card from "../components/Card";

export default function () {
  const [search, setsearch] = useState("")
  const [foodItems, setfoodItems] = useState([]);
  const [foodCategory, setfoodCategory] = useState([]);

  const loadData = async () => {
    try {
      let response = await fetch("http://localhost:5000/api/foodData", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });
      response = await response.json();
      setfoodItems(response[0]);
      setfoodCategory(response[1]);
      //console.log(response[0],response[1]);
    } catch (error) {
      console.log("failed to load data from backend");
    }
  };
  useEffect(() => { loadData(); }, []);

  return (
    <div>
      <div><Navbar /></div>
      {/* Carousel */}
      <div id="carouselExampleFade" className="carousel slide carousel-fade " data-bs-ride="carousel" style={{objectFit:"contain !important"}}>
        <div className="carousel-inner " id='carousel'>
            <div className=" carousel-caption  " style={{ zIndex: "9" }}>
                <div className=" d-flex justify-content-center">  
                    <input className="form-control me-2 w-75 bg-white text-dark" type="search" placeholder="Type in..." aria-label="Search" value={search} onChange={(e)=>{setsearch(e.target.value)}}/>
                    {/* <button className="btn text-white bg-success" type="submit">Search</button> */}
                </div>
            </div>
            <div className="carousel-item active" >
                <img src="https://source.unsplash.com/random/900x700/?burger" className="d-block w-100  " style={{ filter: "brightness(30%)" }} alt="..." />
            </div>
            <div className="carousel-item">
                <img src="https://source.unsplash.com/random/900x700/?pastry" className="d-block w-100 " style={{ filter: "brightness(30%)" }} alt="..." />
            </div>
            <div className="carousel-item">
                <img src="https://source.unsplash.com/random/900x700/?barbeque" className="d-block w-100 " style={{ filter: "brightness(30%)" }} alt="..." />
            </div>
        </div>
        <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="prev">
            <span className="carousel-control-prev-icon" aria-hidden="true"></span>
            <span className="visually-hidden">Previous</span>
        </button>
        <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="next">
            <span className="carousel-control-next-icon" aria-hidden="true"></span>
            <span className="visually-hidden">Next</span>
        </button>
    </div>
      {/* Cards */}
      <div className="container"> {
        foodCategory !== [] 
        ?foodCategory.map(data => {
          return (
            <div className="row mb-3">
              <div key={data._id} className="fs-3 m-3">{data.CategoryName}</div>
              <hr />
              {
                foodItems !== [] 
                ?foodItems.filter((item) => (item.CategoryName === data.CategoryName) && (item.name.toLowerCase().includes(search.toLocaleLowerCase()))).map(filterItems => {
                  return (
                    <div key={filterItems._id} className="col-12 col-md-6 col-lg-3">
                      <Card foodName={filterItems.name}
                        options={filterItems.options[0]}
                        imgSrc={filterItems.img}
                      ></Card>
                    </div>)})
                :<div>Items data loading</div>
              }
            </div>
          )}):<div>Category data Loading</div>
      }</div>
      <div><Footer/></div>
    </div>
  )
}
