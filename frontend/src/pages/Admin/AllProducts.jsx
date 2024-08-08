import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import moment from "moment";
import { useAllProductsQuery } from "../../redux/Api/productApiSlice";
import AdminMenu from "./AdminMenu";
import Loader from "../../components/Loader";
import './AllProducts.css'
import ProductCard from "../../components/ProductCard";

const AllProducts = () => {
  const { data: products, isLoading, isError, refetch } = useAllProductsQuery();
  useEffect(() =>{
    refetch();
  },[refetch]);

  if (isLoading) {
    return <Loader />;
  }

  if (isError) {
    return <div>Error fetching products</div>;
  }

  
  return (
    <div className="product-container">
    <div className="product-header">
      <div className="product-title">
        All Products ({products.length})
      </div>
      <div className="product-grid">
        {products.map((product) => (
          <ProductCard product={product}/>
        ))}
      </div>
    </div>
    <div className="product-sidebar">
      <AdminMenu />
    </div>
  </div>
  
  );
};

export default AllProducts;
