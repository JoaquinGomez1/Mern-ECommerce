import React, { useState } from "react";
import { Button, Modal, TextareaAutosize, TextField } from "@material-ui/core";
import { Link } from "react-router-dom";
import "../static/css/ModalForm.css";
import CloseIcon from "@material-ui/icons/Close";

export default function AdminPanel() {
  const [open, setOpen] = useState(false);
  const [product, setProduct] = useState({});
  const [message, setMessage] = useState();

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const handleSubmit = async () => {
    const reqHeaders = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ product }),
    };
    const req = await fetch("/products/add", reqHeaders);
    const res = await req.json();

    setMessage(res);
    setOpen(false);
  };

  const handleFormChange = (event) => {
    const { name, value } = event.target;
    setProduct({ ...product, [name]: value });
  };

  return (
    <div className="componentTransition">
      <h2>Admin Panel</h2>

      <div className="flex d-column admin-buttons-container">
        <Button
          variant="contained"
          color="secondary"
          fullWidth
          onClick={handleOpen}
        >
          Add Product
        </Button>
        <AddProductAdminModal
          open={open}
          handleClose={handleClose}
          handleSubmit={handleSubmit}
          message={message}
          onFormChange={handleFormChange}
        />

        <Link to="/user/admin/edit-products">
          <Button variant="contained" fullWidth color="secondary">
            Edit Products
          </Button>
        </Link>
      </div>
    </div>
  );
}

const AddProductAdminModal = ({
  open,
  handleClose,
  handleSubmit,
  message,
  onFormChange,
}) => (
  <Modal open={open} onClose={handleClose}>
    <form onChange={onFormChange} className="add-product-form transition">
      <Button
        variant="contained"
        color="secondary"
        className="form-close-btn"
        size="small"
        onClick={handleClose}
      >
        <CloseIcon />
      </Button>

      <h3 className="add-product-title">Add A Product</h3>
      <div className="form-content">
        <TextField name="name" id="product-name" label="Product Name" />
        <TextField name="img" id="product-image" label="Image url" />

        <div className="add-product-divider">
          <TextField name="qty" id="product-qty" label="Available units" />
          <TextField name="price" id="product-price" label="Price" />
        </div>

        <TextField name="category" id="product-category" label="Category" />
        <TextField name="brand" id="product-brand" label="Brand" />

        <TextareaAutosize
          className="product-form-textarea"
          rowsMin={4}
          name="description"
          placeholder="Description"
        />
      </div>

      <Button variant="contained" color="secondary" onClick={handleSubmit}>
        Add
      </Button>
      {message && <h4>{message.message}</h4>}
    </form>
  </Modal>
);
