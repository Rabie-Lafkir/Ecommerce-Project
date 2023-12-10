import React, { useState } from "react";
import axios from "axios";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import Swal from 'sweetalert2';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
} from "@mui/material";
import "./FormAddproduct.css";

const schema = yup.object({
  product_name: yup.string().required(),
  sku: yup.number().required(),
  short_description: yup.string().required().min(20).max(200),
  long_description: yup.string().required().min(30).max(400),
  price: yup.number().required(),
  category_name: yup.string().required(),
  discount_price: yup.number().required(),
  quantity: yup.number().required(),
  options: yup.string().required(),
});

export default function FormAdd({ setOpenForm }) {
  const [product, setProduct] = useState({
    sku: "",
    product_name: "",
    categoryLink: "",
    short_description: "",
    long_description: "",
    price: "",
    discount_price: "",
    quantity: "",
    options: "",
    product_image: null,
  });

  const handleInput = (e) => {
    if (e.target.type !== "file") {
      setProduct({ ...product, [e.target.name]: e.target.value });
    }
  };

  const handleImageChange = (e) => {
    const imageFile = e.target.files[0];
    setProduct({ ...product, product_image: imageFile });
  };

  const {
    register,
    handleSubmit,
    formState: {
      errors,
      isValid,
      dirtyFields,
    },
  } = useForm({
    mode: "onBlur",
    resolver: yupResolver(schema),
  });

  const handleClose = () => {
    setOpenForm(false);
  };

  const onSubmit = async (data) => {
    try {
      const category_name = data.category_name;
      const categoryResponse = await axios.get(
        `http://localhost:5000/v1/categories?query=${category_name}`
      );
      let categoryId = "";

      if (categoryResponse.data.data && categoryResponse.data.data.length > 0) {
        categoryId = categoryResponse.data.data[0]._id;
      } else {
        const newCategoryResponse = await axios.post(
          "http://localhost:5000/v1/categories",
          {
            category_name: category_name,
            active: false,
          }
        );
        categoryId = newCategoryResponse.data.data._id;
      }

      const formData = new FormData();
      formData.append("categoryLink", categoryId);
      formData.append("product_name", data.product_name);
      formData.append("sku", data.sku);
      formData.append("short_description", data.short_description);
      formData.append("long_description", data.long_description);
      formData.append("price", data.price);
      formData.append("discount_price", data.discount_price);
      formData.append("quantity", data.quantity);
      formData.append("options", data.options);
      formData.append("product_image", data.product_image[0]);

      await axios.post("http://localhost:5000/v1/products/", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      Swal.fire({
        title: 'Success!',
        text: 'Product added successfully.',
        icon: 'success',
      });

      handleClose();
    } catch (error) {
      console.error("Error submitting form:", error);
      Swal.fire({
        title: 'Oops...',
        text: error,
        icon: 'error',
      });
    }
  };

  return (
    <Dialog open={true} onClose={handleClose}>
      <DialogTitle className="titleNewUser" style={{ backgroundColor: '#2196f3', color: 'white' }}>Add New Product</DialogTitle>
      <DialogContent>
        <form onSubmit={handleSubmit(onSubmit)} onChange={handleInput} className="form">
        <div className="form-row">
              <div className="col-">
        
              <label className="form-label" htmlFor="sku">
                Sku
              </label>
              <input
                type="number"
                id="sku"
                className="form-control"
                {...register("sku", {})}
                value={product.sku}
              />
              {errors.sku && (
                <span className="text-danger">{errors.sku.message}</span>
              )}
            </div>


            <div className="col ">
              <label className="form-label" htmlFor="product_name">
                Product Name
              </label>
              <input
                type="text"
                id="product_name"
                className="form-control"
                {...register("product_name", {})}
                value={product.product_name}
              />{" "}
              {errors.product_name && (
                <span className="text-danger">
                  {errors.product_name.message}
                </span>
              )}
            </div>
            


            
            </div>
            <div className="form-outline mb-4">
              <label className="form-label" htmlFor="short_description">
                short description
              </label>
              <textarea
                id="short_description"
                name="short_description"
                className="form-control"
                value={product.short_description}
                {...register("short_description")}
              ></textarea>
              {errors.short_description && (
                <span className="text-danger">
                  {errors.short_description.message}
                </span>
              )}
            </div>
            <div className="form-outline mb-4">
              <label className="form-label" htmlFor="long_description">
                long_description
              </label>
              <textarea
                id="long_description"
                name="long_description"
                className="form-control"
                {...register("long_description")}
                value={product.long_description}
              ></textarea>
              {errors.long_description && (
                <span className="text-danger">
                  {errors.long_description.message}
                </span>
              )}
            </div>


            <div className="form-outline mb-4">
                <label className="form-label"  htmlFor="inputState">options</label>
                <select
                  id="inputState"
                  class="form-control"
                  {...register("options")}
                >
                  <option selected>Active</option>
                  <option>disactive</option>
                </select>
              </div>


            <div className="row">
            <div className="form-outline mb-4">
              <label className="form-label" htmlFor="category_name">
                Category Name
              </label>
             
              <input
                type="text"
                id="category_name"
                className="form-control"
                {...register("category_name")}
                value={product.categoryLink.category_name}
              />
              {errors.category_name && (
                <span className="text-danger">
                  {errors.category_name.message}
                </span>
              )}
            </div>
            <div className="form-outline mb-4">
                <label className="form-label" htmlFor="Price">
                  Price
                </label>
                <input
                  type="number"
                  id="number"
                  className="form-control"
                  {...register("price")}
                  value={product.price}
                />{" "}
                {errors.price && (
                  <span className="text-danger">{errors.price.message}</span>
                )}
              </div>
              <div className="form-outline mb-4">
                <label className="form-label" htmlFor="discount_price">
                  discount 
                </label>
                <input
                  type="number"
                  id="discount_price"
                  name="discount_price"
                  className="form-control"
                  {...register("discount_price")}
                />
                {errors.discount_price && (
                  <span className="text-danger">
                    {errors.discount_price.message}
                  </span>
                )}
              </div>
              
              <div className="form-outline mb-4">
                <label className="form-label" htmlFor="quantity">
                  Quantity
                </label>
                <input
                  type="number"
                  id="quantity"
                  name="quantity"
                  className="form-control"
                  {...register("quantity")}
                />
                {errors.quantity && (
                  <span className="text-danger">{errors.quantity.message}</span>
                )}
              </div>
            </div>


            <div className="form-outline mb-4">
                
              <hr></hr>
              <label htmlFor="product_image" />
              <input
                type="file"
                className="form-control-file"
                name="product_image"
                id="product_image"
                {...register("product_image")}
                onChange={handleImageChange}
              />
            </div>
        
          <DialogActions>
            <Button    onClick={handleClose} className="buttonCancel" style={{ color: '#2196f3' }}>
              Cancel
            </Button>
            <Button type="submit" disabled={!isValid || Object.keys(dirtyFields).length === 0}
              className="buttonSubmit"  style={{ backgroundColor: '#2196f3', color: 'white' }}>
              Submit
            </Button>
          </DialogActions>
        </form>
      </DialogContent>
    </Dialog>
  );
};


