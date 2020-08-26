import React, { useContext } from "react";

import { MainProductsListContext } from "../context/MainProductsContext";
import { mySlideshowContext } from "../context/SlideshowContext.js";

import "../static/css/ProductCarousel.css";

export default function ProductsCaroursel() {
  const [products] = useContext(MainProductsListContext);
  const [slideShow, setSlideshow] = useContext(mySlideshowContext);

  const setCurrentSliderElement = (index) => {
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
      {products.slice(0, 4).map((product, index) => (
        <img
          key={product.id}
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
          alt={product.title}
        ></img>
      ))}
    </div>
  );
}
