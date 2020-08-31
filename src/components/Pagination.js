import React, { useState, useEffect } from "react";
import useFetch from "../hooks/useFetch";
import { Button, Grid, Container } from "@material-ui/core";
import ProductCard from "./ProductCard";

export default function Pagination() {
  const { data, setData, isLoading } = useFetch(
    "http://192.168.0.8:3100/products"
  );
  const [currentPage, setCurrentPage] = useState(1);
  const [nextPage, setNextPage] = useState();
  const [prevPage, setPrevPage] = useState();

  useEffect(() => {
    if (data) {
      setNextPage(data.nextPage);
      setPrevPage(data.prevPage);
    }
  }, [setNextPage, setPrevPage, data]);

  const NewFetch = async (param) => {
    if (param === "next") {
      if (nextPage) {
        const req = await fetch(
          `http://192.168.0.8:3100/products?page=${currentPage + 1}`
        );
        const data = await req.json();
        setCurrentPage(currentPage + 1);
        setData(data);
      }
    } else if (prevPage) {
      const req = await fetch(
        `http://192.168.0.8:3100/products?page=${currentPage - 1}`
      );
      const data = await req.json();
      setCurrentPage(currentPage - 1);
      setData(data);
    }
  };

  return (
    <Container style={{ minWidth: "90%" }}>
      <Grid container justify="space-between">
        <Button
          color="secondary"
          variant="contained"
          disabled={prevPage ? false : true}
          onClick={NewFetch}
        >
          Previous
        </Button>
        <Button
          color="secondary"
          variant="contained"
          disabled={nextPage ? false : true}
          onClick={() => NewFetch("next")}
        >
          Next
        </Button>
      </Grid>
      <Grid container justify="center">
        {!isLoading &&
          data.results.map((each) => (
            <ProductCard
              id={each.id}
              title={each.name}
              subtitle={each.price}
              image={each.img}
              qty={each.qty}
              isInStock={each.isInStock}
            />
          ))}
      </Grid>
    </Container>
  );
}
