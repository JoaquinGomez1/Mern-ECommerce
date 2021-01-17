import React, { useContext } from "react";

import { MainProductsListContext } from "../context/MainProductsContext";
import { useHistory } from "react-router-dom";

import { useTheme } from "@material-ui/core/styles";
import "../static/css/ProductCarousel.css";

export default function FeaturedProducts() {
  const [products] = useContext(MainProductsListContext);
  const history = useHistory();

  const redirectTo = (id) => {
    history.push(`/products/${id}`);
  };

  return (
    <div>
      <h3>Featured Products</h3>
      <div className="productsCarousel">
        {products.slice(0, 4).map((product) => (
          <FeaturedCard
            onClick={() => redirectTo(product._id)}
            key={product._id}
            image={product.img}
            title={product.name}
            price={product.price}
          />
        ))}
      </div>
    </div>
  );
}

function FeaturedCard({ image, title, price, discount, onClick }) {
  const theme = useTheme();
  const secondaryMainColor = theme.palette.secondary.main;
  const primaryMainColor = theme.palette.primary.main;

  return (
    <div onClick={onClick} className="featured-card">
      <div
        className="featured-card-badge badge-title badge"
        style={{ backgroundColor: secondaryMainColor }}
      >
        <p>{title}</p>
      </div>
      <div
        className="featured-card-badge badge-price badge"
        style={{ backgroundColor: primaryMainColor }}
      >
        <p>${price}</p>
      </div>
      <img className="featured-card-image" src={image} alt={title} />
      {discount && (
        <div className="featured-card-badge badge-discount badge">
          <p>{discount}</p>
        </div>
      )}
    </div>
  );
}
