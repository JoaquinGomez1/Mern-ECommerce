import React from "react";
import ProductCard from "./ProductCard";
import { Grid, Button } from "@material-ui/core";
import Pagination from "./Pagination";
import useFetch from "../hooks/useFetch";
import { useHistory, Link } from "react-router-dom";
import "../static/css/ProductListing.css";

export default function ProductsListing({ location }) {
  let url = "/products";
  if (location.search) url += location.search;
  const { data, setData, isLoading } = useFetch(url);

  const history = useHistory();

  const redirecTo = (id) => {
    history.push(`/products/${id}`);
  };

  return (
    <Grid container direction='column' alignItems='center'>
      <h1>View Our PC Products</h1>
      <Grid container direction='row' justify='center'>
        <Pagination data={data} setData={setData} url={url}>
          {!isLoading &&
            data &&
            data.results &&
            data.results.map((each) => (
              <ProductCard
                key={each._id}
                _id={each._id}
                title={each.name}
                subtitle={each.price}
                image={each.img}
                qty={each.qty}
                isInStock={each.isInStock}
                onCardAreaClick={() => redirecTo(each._id)}
              />
            ))}
          {isLoading && <h2>Loading</h2>}
          {!isLoading && data && data.results.length < 1 && (
            <div>
              <h2>Nothing Found</h2>
              <Link to='/' style={{ textDecoration: "none" }}>
                <Button variant='contained' color='secondary'>
                  Go back Home
                </Button>
              </Link>
            </div>
          )}
        </Pagination>
      </Grid>
    </Grid>
  );
}
