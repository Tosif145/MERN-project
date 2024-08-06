import React, { useState } from "react";
import { useNavigate } from "react-router";
import {
  useCreateProductMutation,
  useUploadProductImageMutation,
} from "../../redux/Api/productApiSlice";
import { useFetchCategoriesQuery } from "../../redux/Api/categoryApiSlice";

import { toast } from "react-toastify";
import AdminMenu from "./AdminMenu";

const ProductsList = () => {
    const [image, setImage] = useState("");
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState("");
    const [category, setCategory] = useState("");
    const [quantity, setQuantity] = useState("");
    const [brand, setBrand] = useState("");
    const [stock, setStock] = useState(0);
    const [imageUrl, setImageUrl] = useState(null);
    const navigate = useNavigate();
  
    const [uploadProductImage] = useUploadProductImageMutation();
    const [createProduct] = useCreateProductMutation();
    const { data: categories } = useFetchCategoriesQuery();
  
    const handleSubmit = async (e) => {
        e.preventDefault();
      
        try {
          const productData = new FormData();
          productData.append("image", image);
          productData.append("name", name);
          productData.append("description", description);
          productData.append("price", price);
          productData.append("category", category);
          productData.append("quantity", quantity);
          productData.append("brand", brand);
          productData.append("countInStock", stock);
      
          // Assuming createProduct returns { data } and unwraps the result
          const response = await createProduct(productData).unwrap();
      
          if (response?.error) {
            toast.error(response?.error);
          } else {
            toast.success(`${response.name} is created`);
            navigate("/");
          }
        } catch (error) {
          console.error("Error creating product:", error);
          console.log('hi',error?.data);
          
          toast.error(error?.data.error || "Product create failed. Try Again.");
        }
      };
      
  
    const uploadFileHandler = async (e) => {
      const formData = new FormData();
      formData.append("image", e.target.files[0]);
  
      try {
        const res = await uploadProductImage(formData).unwrap();
        toast.success(res.message);
        setImage(res.image);
        setImageUrl(res.image);
      } catch (error) {
        toast.error(error?.data?.message || error.error);
      }
    };
  
    return (
      <div className="container mx-auto p-4">
      <div className="flex flex-col md:flex-row">
        <div className="md:w-2/5 md:pr-4 mb-4 md:mb-0">
          <img
            src={
              "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1964&q=80"
            }
            alt="product"
            className="w-full h-full object-cover rounded-lg md:block hidden"
          />
        </div>
        <AdminMenu />
        <div className="md:w-3/5 p-3">
          <div className="h-12 text-2xl md:text-3xl font-bold mb-4">
            Create Product
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
          <div className="mb-3">
            <label className="border text-white px-4 block w-full text-center rounded-lg cursor-pointer font-bold py-11">
              {image ? image.name : "Upload Image"}

              <input
                type="file"
                name="image"
                accept="image/*"
                onChange={uploadFileHandler}
                className={!image ? "hidden" : "text-white"}
              />
            </label>
          </div>

          <div className="p-3">
            <div className="flex flex-wrap mb-3">
              <div className="flex-1">
                <label htmlFor="name">Name</label>
                <br />
                <input
                  type="text"
                  className="p-4 w-full rounded-lg bg-[#101011] text-white"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div className="flex-1 ml-0 md:ml-10">
                <label htmlFor="category">Category</label>
                <br />
                {console.log(category)
                }
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

            <div className="flex flex-wrap mb-3">
              <div className="flex-1">
                <label htmlFor="quantity">Quantity</label>
                <br />
                <input
                  type="number"
                  className="p-4 w-full rounded-lg bg-[#101011] text-white"
                  value={quantity}
                  onChange={(e) => setQuantity(e.target.value)}
                />
              </div>
              <div className="flex-1 ml-0 md:ml-10">
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

            <div className="flex flex-wrap mb-3">
              <div className="flex-1">
                <label htmlFor="stock">Count In Stock</label>
                <br />
                <input
                  type="text"
                  className="p-4 w-full rounded-lg bg-[#101011] text-white"
                  value={stock}
                  onChange={(e) => setStock(e.target.value)}
                />
              </div>
              <div className="flex-1 ml-0 md:ml-10">
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

            <button
              onClick={handleSubmit}
              className="py-4 px-10 mt-5 rounded-lg text-lg font-bold bg-pink-600 hover:bg-pink-700 w-full"
            >
              Submit
            </button>
          </div>
        </div>
      </div>
    </div>
    );
  };
  


export default ProductsList;
