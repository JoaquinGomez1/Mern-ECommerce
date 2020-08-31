import React, { useState, useLayoutEffect } from "react";

export const MainProductsListContext = React.createContext();

export default function MainProductsContext(props) {
  const [mainProducts, setMainProducts] = useState([]);

  const fetchData = async () => {
    const req = await fetch("http://192.168.0.8:3100/products");
    const data = await req.json();
    setMainProducts(data.results);
  };

  useLayoutEffect(() => {
    fetchData();
  }, []);

  return (
    <MainProductsListContext.Provider
      value={[mainProducts, setMainProducts]}
      {...props}
    />
  );
}
