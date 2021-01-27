import React, { useState, useLayoutEffect } from "react";

export const MainProductsListContext = React.createContext();

export default function MainProductsContext(props) {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const url = process.env.REACT_APP_FETCH_LOCATION
    ? process.env.REACT_APP_FETCH_LOCATION + "/products"
    : "/products";

  console.log(url, process.env.REACT_APP_FETCH_LOCATION);

  const fetchData = async () => {
    setIsLoading(true);
    const req = await fetch(url);
    const data = await req.json();
    setProducts(data.results);
    setIsLoading(false);
  };

  useLayoutEffect(() => {
    fetchData();
    //eslint-disable-next-line
  }, []);

  return (
    <MainProductsListContext.Provider
      value={{ products, setProducts, isLoading }}
      {...props}
    />
  );
}
