import React, { useContext } from "react";
import ProductCard from "./ProductCard";

import { MainProductsListContext } from "../context/MainProductsContext";
import { mySlideshowContext } from "../context/SlideshowContext.js";

import "../static/css/ProductCarousel.css";

export default function ProductsCaroursel() {
  const [products, setProducts] = useContext(MainProductsListContext);
  const [slideShow, setSlideshow] = useContext(mySlideshowContext);

  const setCurrentSliderElement = (index) => {
    console.log("clicked");
    setSlideshow({ ...slideShow, current: index });
  };

  return (
    <div
      className="productsCarousel"
      style={{
        width: "100vw",
        display: "flex",
        maxHeight: "280px",
        padding: "10px",
        marginTop: "30px",
        justifyContent: "center",
      }}
    >
      {products.map((product, index) => (
        <img
          style={{
            width: "310px",
            height: "210px",
            cursor: "pointer",
            margin: "10px",
            borderRadius: "5px",
            boxShadow: "2px 2px 4px rgba(0,0,0,.2)",
          }}
          onClick={() => {
            setCurrentSliderElement(index);
          }}
          src={product.img}
        ></img>
      ))}
    </div>
  );
}
