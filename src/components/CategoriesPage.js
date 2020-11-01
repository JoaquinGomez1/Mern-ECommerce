import React from "react";
import { Grid } from "@material-ui/core";
import Pagination from "./Pagination";
import useFetch from "../hooks/useFetch";
import ProductCard from "./ProductCard";
import { useHistory } from "react-router-dom";

export default function CategoriesPage() {
  const url = "http://192.168.0.8:3100/categories";
  const { data, setData, isLoading } = useFetch(url);

  const history = useHistory();

  const redirecTo = async (categoryName) => {
    const url = `/categories/${categoryName}`;
    history.push(url);
    const req = await fetch(url);
    const res = await req.json();
    console.log(res);
    setData(res);
  };

  return (
    <Grid container direction='column' alignItems='center'>
      <h1>View Our PC Products</h1>
      <Grid container direction='row' justify='center'>
        <Pagination data={data} setData={setData} url={url}>
          {!isLoading &&
            data.results &&
            data.results.map((each) => (
              <ProductCard
                _id={each._id}
                title={each.name}
                onCardAreaClick={() => redirecTo(each.name)}
              />
            ))}
          {isLoading && <h2>Loading</h2>}
          {!isLoading && data.results.length < 1 && <h2>Nothing Found</h2>}
        </Pagination>
      </Grid>
    </Grid>
  );
}
