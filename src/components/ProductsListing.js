import React, { useLayoutEffect, useState } from "react";
import ProductCard from "./ProductCard";
import { Grid } from "@material-ui/core";

export default function ProductsListing() {
  const [products, setProducts] = useState();
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    const req = await fetch("http://192.168.0.8:3100/products");
    const data = await req.json();
    setProducts(data);
    setLoading(false);
  };

  useLayoutEffect(() => {
    fetchData();
  }, []);

  return (
    <Grid container direction="column" alignItems="center">
      <h1>View Our PC Products</h1>
      {loading ? (
        <h2>Loading</h2>
      ) : (
        <Grid container direction="row" justify="center">
          {products.map((each) => (
            <Grid item>
              <ProductCard
                id={each.id}
                title={each.name}
                subtitle={each.price}
                image={each.img}
                qty={each.qty}
              />
            </Grid>
          ))}
        </Grid>
      )}
    </Grid>
  );
}
