import React, { useContext } from "react";
import { Grid } from "@material-ui/core";
import { useHistory } from "react-router-dom";

import Slideshow from "./SlideShow";
import ProductCard from "./ProductCard";
import FeaturedProducts from "./FeaturedProducts";
import SearchBar from "./SearchBar";

import "../transition.css";

import { MainProductsListContext } from "../context/MainProductsContext";

export default function Landing() {
  const [products] = useContext(MainProductsListContext);
  const history = useHistory();

  const redirecTo = (id) => {
    history.push(`/products/${id}`);
  };

  return (
    <div className="componentTransition">
      <Grid container justify="center" style={{ margin: "1rem 0" }}>
        <SearchBar />
      </Grid>
      <Grid container justify="center" style={{ overflow: "hidden" }}>
        <Slideshow duration={5000}>
          {products.map((product) => (
            <ProductCard
              key={product._id}
              className="transition"
              itemObject={product}
              onCardAreaClick={() => redirecTo(product._id)}
            />
          ))}
        </Slideshow>
      </Grid>
      <FeaturedProducts style={{ margin: "0 auto" }} />
    </div>
  );
}
