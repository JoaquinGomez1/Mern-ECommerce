import React, { useState, useEffect } from "react";
import { Grid } from "@material-ui/core";
import Pagination from "./Pagination";
import useFetch from "../hooks/useFetch";
import ProductCard from "./ProductCard";
import { useHistory } from "react-router-dom";
import LoadingComponent from "./LoadingComponent";
import CategoryCard from "./CategoryCard";
import { HEADERS_GET } from "../headers";

export default function CategoriesPage() {
  const url = process.env.REACT_APP_FETCH_LOCATION
    ? process.env.REACT_APP_FETCH_LOCATION + "/categories"
    : "/categories";
  const { data, setData, isLoading, setIsLoading } = useFetch(url, HEADERS_GET);
  const [wasFetched, setWasFetched] = useState(false);

  const history = useHistory();

  const lookForCategory = async (categoryName) => {
    setIsLoading(true);
    const url = `/categories/search?search=${categoryName}`;
    const req = await fetch(url, HEADERS_GET);
    const res = await req.json();
    setWasFetched(true);
    res && setData(res);
    setIsLoading(false);
  };

  const redirecTo = (id) => {
    const url = `/products/${id}`;
    history.push(url);
  };

  // Make sure the wasFetched state variable is reset every time this page re renders
  useEffect(() => {
    setWasFetched(false);
  }, []);

  return (
    <Grid container direction="column" alignItems="center">
      <h1>View Our Categories</h1>
      <Grid container justify="center">
        <Pagination data={data} setData={setData} url={url}>
          {!isLoading &&
            data?.results?.map((each) => {
              return !wasFetched ? (
                <CategoryCard
                  key={each.name}
                  onClick={() => lookForCategory(each.name)}
                  name={each.name}
                />
              ) : (
                <ProductCard
                  key={each._id}
                  _id={each._id}
                  itemObject={each}
                  onCardAreaClick={() => redirecTo(each._id)}
                />
              );
            })}
          {isLoading && <LoadingComponent />}
          {!isLoading && data && data.results.length < 1 && (
            <h2>Nothing Found</h2>
          )}
        </Pagination>
      </Grid>
    </Grid>
  );
}
