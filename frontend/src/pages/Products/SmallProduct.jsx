import React from "react";
import { Link } from "react-router-dom";

const SmallProduct = ({ product }) => {
  return (
    <div className="w-[20rem] ml-[2rem] p-3">
      <div className="relative">
        <img
          src={product.image}
          alt={product.name}
          className="h-auto rounded"
        />
        {/* <HeartIcon product={product} /> */}
        <div className="p-54"><Link to={`/product`}></Link></div>
      </div>
    </div>
  );
};

export default SmallProduct;
