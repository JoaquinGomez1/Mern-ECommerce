import React, { useState, useEffect } from "react";
import { Grid } from "@material-ui/core";
import Pagination from "./Pagination";
import useFetch from "../hooks/useFetch";
import ProductCard from "./ProductCard";
import { useHistory } from "react-router-dom";
import LoadingComponent from "./LoadingComponent";
import CategoryCard from "./CategoryCard";

export default function CategoriesPage() {
  const url = "/categories";
  const { data, setData, isLoading, setIsLoading } = useFetch(url);
  const [wasFetched, setWasFetched] = useState(false);

  const history = useHistory();

  const lookForCategory = async (categoryName) => {
    setIsLoading(true);
    const url = `/categories/search?search=${categoryName}`;
    const req = await fetch(url);
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
                  onClick={() => lookForCategory(each.name)}
                  name={each.name}
                />
              ) : (
                <ProductCard
                  _id={each._id}
                  title={each.name}
                  subtitle={each.price}
                  image={each.img}
                  qty={each.qty}
                  isInStock={each.isInStock}
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
