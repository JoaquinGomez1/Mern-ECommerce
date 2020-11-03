import React, { useState, useEffect } from "react";
import { Button, Grid, Container, Typography } from "@material-ui/core";

export default function Pagination(props) {
  // This component asumes that the url provided can handle pagination
  const { data, setData } = props;
  const regex = /[?]/;
  let url = regex.exec(props.url) ? props.url + "&page=" : props.url + "?page="; // We look if there is already a query in the url
  const [currentPage, setCurrentPage] = useState(1);
  const [nextPage, setNextPage] = useState();
  const [prevPage, setPrevPage] = useState();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (data) {
      setNextPage(data.nextPage);
      setPrevPage(data.prevPage);
    }
  }, [setNextPage, setPrevPage, data]);

  const NewFetch = async (param) => {
    setIsLoading(true);
    let pageToGo = currentPage;
    if (param === "next") {
      if (nextPage) {
        pageToGo++;
        url = url + pageToGo;
      }
    }
    if (prevPage) {
      pageToGo--;
      url = url + pageToGo;
    }
    const req = await fetch(url);
    const data = await req.json();
    setData(data);
    setCurrentPage(pageToGo);
    setIsLoading(false);
  };

  return (
    <Container style={{ minWidth: "90%" }}>
      <Grid container justify='space-between'>
        <Button
          color='secondary'
          variant='contained'
          disabled={prevPage ? false : true}
          onClick={NewFetch}>
          Previous
        </Button>
        <Typography variant='h6'>Page: {currentPage}</Typography>
        <Button
          color='secondary'
          variant='contained'
          disabled={nextPage ? false : true}
          onClick={() => NewFetch("next")}>
          Next
        </Button>
      </Grid>
      <Grid container justify='center'>
        {!isLoading ? props.children : <h2>Loading...</h2>}
      </Grid>
    </Container>
  );
}
