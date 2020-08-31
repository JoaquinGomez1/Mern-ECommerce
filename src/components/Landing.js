import React, { useContext } from "react";
import { Grid } from "@material-ui/core";

import Slideshow from "../SlideShow";
import ProductCard from "./ProductCard";
import ProductCarousel from "./ProductsCaroursel";
import SearchBar from "./SearchBar";

import "../transition.css";

import { MainProductsListContext } from "../context/MainProductsContext";

export default function Landing() {
  const [products] = useContext(MainProductsListContext);

  return (
    <div className="componentTransition">
      <Grid container justify="center">
        <SearchBar />
      </Grid>
      <Grid container justify="center" style={{ overflow: "hidden" }}>
        <Slideshow duration={5000}>
          {products.map((product) => (
            <ProductCard
              key={product.id}
              className="transition"
              id={product.id}
              title={product.name}
              subtitle={product.price}
              image={product.img}
              isInStock={product.isInStock}
              qty={product.qty}
            ></ProductCard>
          ))}
        </Slideshow>

        <ProductCarousel></ProductCarousel>
      </Grid>
    </div>
  );
}
