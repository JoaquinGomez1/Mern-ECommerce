import React, { useState } from "react";
import { Avatar, TextField, Button } from "@material-ui/core";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";

export default function EditProductItem({
  product,
  detailsRef,
  onEditClick,
  onRemoveClick,
}) {
  const [fields, setFields] = useState({
    _id: product._id,
    name: "",
    img: "",
    price: undefined,
    qty: undefined,
    category: "",
  }); // Remember to parse qty as an int in the server
  const [response, setResponse] = useState({ message: "Edit", status: null });

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    if (name === "price" || name === "qty")
      setFields({ ...fields, [name]: parseInt(value) });
    else setFields({ ...fields, [name]: value });
  };

  const sendUpdateRequest = async () => {
    if (!product._id) return console.log("No product Id provided"); // Debuging only

    const reqHeaders = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ fields }),
    };
    const req = await fetch("/products/modify", reqHeaders);
    const res = await req.json();
    if (req.status === 200)
      setResponse({ message: "Succesfully Updated", status: true });
    else setResponse({ message: res.message, status: false });
  };

  return (
    <details ref={detailsRef} className="edit-product-item-container">
      <summary className="edit-product-item-summary">
        <Avatar
          className={product.qty < 1 || !product.isInStock ? "notInStock" : ""}
          src={product?.img}
          alt={product?.title}
        />
        <h3
          className={product.qty < 1 || !product.isInStock ? "notInStock" : ""}
        >
          {product.name}
        </h3>

        <div className="edit-product-icons">
          <EditIcon className="edit-icon icon" onClick={onEditClick} />
          <DeleteIcon className="remove-icon icon" onClick={onRemoveClick} />
        </div>
      </summary>
      <div className="flex justify-between" style={{ padding: "1.5rem" }}>
        <h4>Price: {product.price}</h4>
        <h4>Qty: {product.qty}</h4>
        <h4>Category: {product.category}</h4>
      </div>
      <form
        onChange={handleFormChange}
        className="flex d-column edit-products-textField"
      >
        <TextField
          name="name"
          className="textField-item"
          label={`Name: ${product.name}`}
        />
        <TextField name="img" className="textField-item" label={`Image Url:`} />
        <TextField
          name="price"
          className="textField-item"
          label={`Price: ${product.price}`}
          type="number"
        />
        <TextField
          type="number"
          name="qty"
          className="textField-item"
          label={`Qty:`}
        />
        <TextField
          name="category"
          className="textField-item"
          label={`Category: ${product.category}`}
        />
        <Button
          onClick={sendUpdateRequest}
          className="textField-item"
          color={
            response.status
              ? response.status === true
                ? "primary"
                : "secondary"
              : "default"
          }
          variant="contained"
        >
          {response.message}
        </Button>
      </form>
    </details>
  );
}
