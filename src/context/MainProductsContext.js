import React, { useState, useLayoutEffect } from "react";

export const MainProductsListContext = React.createContext();

export default function MainProductsContext(props) {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const fetchData = async () => {
    setIsLoading(true);
    const req = await fetch("/products");
    const data = await req.json();
    setProducts(data.results);
    setIsLoading(false);
  };

  useLayoutEffect(() => {
    fetchData();
  }, []);

  return (
    <MainProductsListContext.Provider
      value={{ products, setProducts, isLoading }}
      {...props}
    />
  );
}
