import React, { useRef } from "react";
import useFetch from "../hooks/useFetch";
import Pagination from "./Pagination";
import "../static/css/EditProducts.css";
import EditProductItem from "./EditProductItem";

export default function EditProducts() {
  const url = "/products";
  const { data, setData, isLoading } = useFetch(url);
  const detailsRef = useRef();

  const toggleEditView = (e) => {
    e.preventDefault();
    // Select the Details tag (GreatGrandparent of the currentTarget in this case)
    const parentNode = e.currentTarget.parentNode;
    const grandparentNode = parentNode.parentNode;
    const greatGrandParentNode = grandparentNode.parentNode;

    // Make the open atrribute toggeable
    greatGrandParentNode.open = !greatGrandParentNode.open;
  };

  const sendDeleteRequest = async (product) => {
    if (!product._id) return console.log("No product Id provided");

    const reqHeaders = {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ productId: product._id }),
    };
    const req = await fetch("/products/modify", reqHeaders);
    if (req.status === 200) {
      const dataCopy = { ...data };
      // Get the item index in the same object used to store the product.
      // Otherwise this won't work because of how object equality is built in to javascript
      // This done this way so that the product's reference matches the one in the original results array
      const indexOfElement = data.results.indexOf(product);
      dataCopy.results.splice(indexOfElement, 1);

      setData(dataCopy);
    }
  };

  return (
    <div className='componentTransition edit-products-page'>
      <h2>Edit Products</h2>
      <Pagination data={data} setData={setData} url={url}>
        {!isLoading &&
          data &&
          data.results.map((product) => (
            <EditProductItem
              key={product._id}
              product={product}
              detailsRef={detailsRef}
              onEditClick={toggleEditView}
              onRemoveClick={() => sendDeleteRequest(product)}
            />
          ))}
      </Pagination>
    </div>
  );
}
