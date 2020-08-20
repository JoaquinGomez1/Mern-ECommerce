import React, { useContext, useEffect } from "react";
import { Grid } from "@material-ui/core";

import Slideshow from "../SlideShow";
import ProductCard from "./ProductCard";
import ProductCarousel from "./ProductsCaroursel";

import "../transition.css";

import { MainProductsListContext } from "../context/MainProductsContext";

export default function Landing() {
  const [mainProducts, setMainProducts] = useContext(MainProductsListContext);

  return (
    <div className="componentTransition">
      <Grid container justify="center" style={{ overflow: "hidden" }}>
        <Slideshow duration={5000}>
          {mainProducts.map((product) => (
            <ProductCard
              className="transition"
              id={product.id}
              title={product.name}
              subtitle={product.price}
              image={product.img}
            ></ProductCard>
          ))}
        </Slideshow>

        <ProductCarousel></ProductCarousel>
      </Grid>
    </div>
  );
}
