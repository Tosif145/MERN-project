import React from "react";
import moment from "moment";
import { Link } from "react-router-dom";
import "./css/ProductCard.css";

const ProductCard = ({ product }) => {
  return (
    <div class="card">
      <div class="image_container">
        <img src={product.image} alt={product.name} className="product-image" />
      </div>
      <div class="details">
        <div class="title">
          <span>{product.name}</span>
          <span class="date">
            {" "}
            {moment(product.createdAt).format("MMMM Do YYYY")}
          </span>
        </div>
        <div class="description">
          <p> {product?.description?.substring(0, 160)}...</p>
        </div>
      </div>
      <div class="action">
        <div class="price">
          <span>${product?.price}</span>
        </div>
        <Link
          className="btn"
          key={product._id}
          to={`/admin/products/update/${product._id}`}
        >
          <button class="update-button">
            <span>Update Product</span>
            <svg
              className="update-icon"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 14 10"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M1 5h12m0 0L9 1m4 4L9 9"
              />
            </svg>
          </button>
        </Link>
      </div>
    </div>
  );
};

export default ProductCard;
