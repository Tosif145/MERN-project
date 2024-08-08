import React, { useEffect, useState } from "react";
import { useNavigate,  useParams } from "react-router";
import {
  useUpdateProductMutation,
  useDeleteProductMutation,
  useGetProductByIdQuery,
  useUploadProductImageMutation,
} from "../../redux/Api/productApiSlice";

import { useFetchCategoriesQuery } from "../../redux/Api/categoryApiSlice";
import { toast } from "react-toastify";
import AdminMenu from "./AdminMenu";

const ProductUpdate = () => {
  const params = useParams();

  
  const { data: productData , refetch} = useGetProductByIdQuery(params._id);

  

  const [image, setImage] = useState(productData?.image || "");
  const [name, setName] = useState(productData?.name || "");
  const [description, setDescription] = useState(
    productData?.description || ""
  );
  const [price, setPrice] = useState(productData?.price || "");
  const [category, setCategory] = useState(productData?.category || "");
  const [quantity, setQuantity] = useState(productData?.quantity || "");
  const [brand, setBrand] = useState(productData?.brand || "");
  const [stock, setStock] = useState(productData?.countInStock || 0);

  const navigate = useNavigate();

  const { data: categories = [] } = useFetchCategoriesQuery();
  const [uploadProductImage] = useUploadProductImageMutation();
  const [updateProduct] = useUpdateProductMutation();
  const [deleteProduct] = useDeleteProductMutation();

  useEffect(() => {
    refetch();
    if (productData && productData.id) {
      setName(productData.name);
      setDescription(productData.description);
      setPrice(productData.price);
      setCategory(productData.category);
      setQuantity(productData.quantity);
      setBrand(productData.brand);
      setStock(productData.countInStock);
      setImage(productData.image);
    }
  }, [productData,refetch]);

  const uploadFileHandler = async (e) => {
    const formData = new FormData();
    formData.append("image", e.target.files[0]);

    try {
      const res = await uploadProductImage(formData).unwrap();
      toast.success(res.message);
      setImage(res.image);
    } catch (error) {
      toast.error(error?.data?.message || error.message);
    }
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("image", image);
      formData.append("name", name);
      formData.append("description", description);
      formData.append("price", price);
      formData.append("category", category);
      formData.append("quantity", quantity);
      formData.append("brand", brand);
      formData.append("countInStock", stock);

      // Update product using the RTK Query mutation
      const data = await updateProduct({productId:params._id,formData});
      console.log('data', data?.error);
      

      if (data?.error) {
        toast.error(data.error.data);
      } else {
        toast.success(`Product successfully updated`);
        navigate("/admin/allproductslist");
      }
    } catch (err) {
      console.log(err);
      toast.error("Product update failed. Try again.");
    }
  };

  const handleDelete = async () => {
    try {
      let answer = window.confirm('Are you sure you want to delete this product?');

      if(!answer){
        return;
      }

      const  {data} = await deleteProduct(params._id);
      toast.success(`${data.name} deleted successfully`);
      navigate("/admin/allproductslist");
    } catch (error) {
      console.log(error);
      toast.error("Failed to delete product. Try again");
      
    }
  }

  
  return (
   <div className="container mx-auto p-4">
  <div className="flex flex-col md:flex-row">
    <div className="md:w-2/5 md:pr-4 mb-4 md:mb-0 hidden md:block">
      <img
        src={
          "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1964&q=80"
        }
        alt="product"
        className="w-full h-full object-cover rounded-lg"
      />
    </div>
    <AdminMenu />
    <div className="md:w-3/5 p-3 w-full">
      <div className="h-12 text-2xl md:text-3xl text-center font-bold mb-4">
        Update Product
      </div>

      {image && (
        <div className="text-center mb-3">
          <img
            src={image}
            alt="product"
            className="block mx-auto max-h-[200px]"
          />
        </div>
      )}
       <div className="mb-3 p-5">
            <label className="border text-white px-4 block w-full text-center rounded-lg cursor-pointer font-bold py-11 overflow-hidden">
              {image ? image.name : "Upload Image"}
              <input
                type="file"
                name="image"
                accept="image/*"
                onChange={uploadFileHandler}
                className={`${!image} ? 'hidden' : 'text-white'} overflow-hidden`}
              />
            </label>
          </div>
      <div className="p-3">
        <div className="flex flex-col md:flex-row flex-wrap mb-3 gap-4">
          <div className="flex-1 w-full">
            <label htmlFor="name">Name</label>
            <br />
            <input
              type="text"
              className="p-4 w-full rounded-lg bg-[#101011] text-white"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="flex-1 w-full">
            <label htmlFor="category">Category</label>
            <br />
            <select
              className="p-4 w-full rounded-lg bg-[#272626] text-white"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              <option value="" disabled>
                Select a category
              </option>
              {categories &&
                categories.map((c) => (
                  <option key={c._id} value={c.category}>
                    {c.name}
                  </option>
                ))}
            </select>
          </div>
        </div>

        <div className="flex flex-col md:flex-row flex-wrap mb-3 gap-4">
          <div className="flex-1 w-full">
            <label htmlFor="quantity">Quantity</label>
            <br />
            <input
              type="number"
              className="p-4 w-full rounded-lg bg-[#101011] text-white"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
            />
          </div>
          <div className="flex-1 w-full">
            <label htmlFor="brand">Brand</label>
            <br />
            <input
              type="text"
              className="p-4 w-full rounded-lg bg-[#101011] text-white"
              value={brand}
              onChange={(e) => setBrand(e.target.value)}
            />
          </div>
        </div>

        <label htmlFor="description" className="block mb-2">
          Description
        </label>
        <textarea
          className="p-4 w-full rounded-lg bg-[#101011] text-white mb-3"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        ></textarea>

        <div className="flex flex-col md:flex-row flex-wrap mb-3 gap-4">
          <div className="flex-1 w-full">
            <label htmlFor="stock">Count In Stock</label>
            <br />
            <input
              type="text"
              className="p-4 w-full rounded-lg bg-[#101011] text-white"
              value={stock}
              onChange={(e) => setStock(e.target.value)}
            />
          </div>
          <div className="flex-1 w-full">
            <label htmlFor="price">Price</label>
            <br />
            <input
              type="number"
              className="p-4 w-full rounded-lg bg-[#101011] text-white"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            />
          </div>
        </div>

        <div className="flex  flex-col sm:flex-row gap-4">
          <button
            onClick={handleSubmit}
            className="py-4 px-10 mt-5 rounded-lg text-lg font-bold bg-green-600 hover:bg-green-700 w-full md:w-auto"
          >
            Update
          </button>
          <button
            onClick={handleDelete}
            className="py-4 px-10 mt-5 rounded-lg text-lg font-bold bg-red-600 hover:bg-red-700 w-full md:w-auto"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  </div>
</div>

  );
};

export default ProductUpdate;