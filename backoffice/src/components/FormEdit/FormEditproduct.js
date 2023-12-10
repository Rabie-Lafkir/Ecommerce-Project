import React, { useState, useEffect,useReF } from "react";
import axios from "axios";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import Swal from "sweetalert2";
//import { useParams } from "react-router-dom";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,MenuItem
} from "@mui/material";

export default function FormEdit({ setOpenFormEdit, productId }) {
  const id=productId

  const [products, setProducts] = useState({
    sku: "",
    product_name: "",
    categoryLink: "",
    short_description: "",
    long_description: "",
    price: "",
    quantity: "",
    discount_price: "",
    options: "",
    product_image: null, 
   
    
  });
 
  useEffect(() => {
    axios
      .get(`http://localhost:5000/v1/products/${id}`)
      .then((res) => {
        const result = res.data.data[0];
        console.log("ressss: ",result.product_name)
        setProducts({
          ...products,
          product_name: result.product_name,
          sku: result.sku,
          categoryLink: result.categoryLink || "",
          short_description: result.short_description || "",
          long_description: result.long_description || "",
          price: result.price || "",
          quantity: result.quantity || "",
          discount_price: result.discount_price || "",
          options: result.options || "",
          product_image: result.product_image || null,

        });
        console.log({soñethimg: res.data});
      })
      .catch((err) => console.log(err));
  }, [id]);


  const handleClose = () => {
    setOpenFormEdit(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.patch(`http://localhost:5000/v1/products/${id}`,
        products,
      );
      Swal.fire({
        title: 'Success!',
        text: response.data.message,
        icon: 'success',
      });

      handleClose();
    } catch (err) {
      console.error("Error editing category:", err);
      Swal.fire({
        title: 'Failed!',
        text: err.message,
        icon: 'error',
      });
    }
  };






  



 

  
  

  const handleInput = (e) => {
    if (e.target.type !== "file") {
      setProducts({ ...products, [e.target.name]: e.target.value });
    }
  };


  const handleImageChange = (e) => {
    const imageFile = e.target.files[0];
    setProducts({ ...products, product_image: imageFile });
  };
  return (
    <Dialog open={true} onClose={handleClose}>
      <DialogTitle
        className="titleEditProduct"
        style={{ backgroundColor: "#2196f3", color: "white" }}
      >
        Update Product
      </DialogTitle>
      <DialogContent>
      <form onSubmit={handleSubmit} className="form">
          <TextField
            label="Product name"
            variant="outlined"
            fullWidth
            margin="dense"
            value={products.product_name}
            onChange={(e) =>
              setProducts({ ...products, product_name: e.target.value })
            }
          />
         <TextField
            label="sku"
            variant="outlined"
            fullWidth
            margin="dense"
            value={products.sku}
            onChange={(e) => setProducts({ ...products, sku: e.target.value })}
          />
          
          <TextField
            label="short description"
            variant="outlined"
            fullWidth
            margin="dense"
            value={products.short_description}
            onChange={(e) => setProducts({ ...products, short_description: e.target.value })}
          />
          <TextField
            label="Long description"
            variant="outlined"
            fullWidth
            margin="dense"
            value={products.long_description}
            onChange={(e) => setProducts({ ...products, long_description: e.target.value })}
          />
          <TextField
            label="Price"
            variant="outlined"
            fullWidth
            margin="dense"
            value={products.price}
            onChange={(e) => setProducts({ ...products, price: e.target.value })}
          />
          <TextField
            label="Quantity"
            variant="outlined"
            fullWidth
            margin="dense"
            value={products.quantity}
            onChange={(e) => setProducts({ ...products, quantity: e.target.value })}
          />
          <TextField
            label="discount_price"
            variant="outlined"
            fullWidth
            margin="dense"
            value={products.discount_price}
            onChange={(e) => setProducts({ ...products, discount_price: e.target.value })}
          />
   <TextField
  label="Category Name"
  variant="outlined"
  fullWidth
  margin="dense"
  select
  value={products.categoryLink.category_name || 'kitchen'} // Valeur par défaut 'kitchen'
  onChange={(e) => setProducts({ ...products, categoryLink: { category_name: e.target.value } })}
>
  <MenuItem value="kitchen">Kitchen</MenuItem>
  <MenuItem value="room">Room</MenuItem>
  <MenuItem value="men">Men</MenuItem>
</TextField>
<input
              type="file"
              className="form-control-file"
              name="product_image"
              id="product_image"
              
              onChange={handleImageChange}
            />


          <DialogActions>
            <Button onClick={handleClose} className="buttonCancel">
              Cancel
            </Button>
            <Button type="submit" className="buttonSubmit">
              Save
            </Button>
          </DialogActions>
        </form>
      



























          
      </DialogContent>
    </Dialog>
  );
}
/*import React, { useState, useEffect,useReF } from "react";
import axios from "axios";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import Swal from "sweetalert2";
//import { useParams } from "react-router-dom";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
} from "@mui/material";

export default function FormEdit({ setOpenFormEdit, productId }) {
  const id=productId

  const [products, setProducts] = useState({
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
 





  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/v1/products/${id}`
        );
        const data = response.data.data;

  

        setProducts({
          ...products,
          sku: data.sku || "",
          product_name: data.product_name || "",
          categoryLink: data.categoryLink || "",
          short_description: data.short_description || "",
          long_description: data.long_description || "",
          price: data.price || "",
          quantity: data.quantity || "",
          discount_price: data.discount_price || "",
          options: data.options || "",
          product_image: data.product_image || null,
        });
        // Assuming 'reset' is a function you've defined elsewhere
        //(data); // Reset the form with fetched data
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }
    
  }, [id]);


  const handleInput = (e) => {
    if (e.target.type !== "file") {
      setProducts({ ...products, [e.target.name]: e.target.value });
    }
  };


  const handleImageChange = (e) => {
    const imageFile = e.target.files[0];
    setProducts({ ...products, product_image: imageFile });
  };


  const handleClose = () => {
    setOpenFormEdit(false);
  };


  const handleSubmit = async (data) => {
    alert("gg");
    try {
      const formData = new FormData();
      Object.entries(products).forEach(([key, value]) => {
        formData.append(key, value);
      });
      await axios.patch(`http://localhost:5000/v1/products/${id}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });


      Swal.fire({
        title: "Success!",
        text: "Product Updated successfully.",
        icon: "success",
      });


      handleClose();
    } catch (error) {
      console.error("Error updating product:", error);
      Swal.fire({
        title: "Failed!",
        text: "Something went wrong.",
        icon: "error",
      });
    }
  };
  return (
    <Dialog open={true} onClose={handleClose}>
      <DialogTitle
        className="titleNewUser"
        style={{ backgroundColor: "#2196f3", color: "white" }}
      >
        Update Product
      </DialogTitle>
      <DialogContent>
        <form handleSubmit={(handleSubmit)} className="form">
          <div className="form-outline mb-4">
            <label className="form-label" htmlFor="sku">
              sku
            </label>
            <input
              type="text"
              id="name"
              className="form-control"
             
              value={products.sku || ""}
              onChange={handleInput}
            />
            
          </div>
          <div className="form-outline mb-4">
            <label className="form-label" htmlFor="product_name">
              product name
            </label>
            <input
              type="text"
              id="name"
              className="form-control"
          
              value={products.product_name || ""}
              onChange={handleInput}
            />
           
          </div>{" "}
          <div className="form-outline mb-4">
            <label className="form-label" htmlFor="categoryLink">
              Category Name
            </label>
            <select
              id="product_name"
              className="form-control"
             
              value={products.categoryLink.category_name || ""}
            >
              <option value={"active"}>men</option>
              <option value={"inactive"}>kid</option>
            </select>
            
         
          </div>
          <div className="row">
            <div className="form-outline mb-4">
              <label className="form-label" htmlFor="short_description">
                short description
              </label>
              <input
                type="text"
                id="name"
              
                value={products.short_description || ""}
                onChange={handleInput}
              />
              
             
            </div>
            <div className="form-outline mb-4">
              <label className="form-label" htmlFor="long_description">
                Price
              </label>
              <input
                type="text"
                id="name"
                className="form-control"
                value={products.long_description || ""}
                onChange={handleInput}
              />
             
            </div>
            <div className="form-outline mb-4">
              <label htmlFor="inputState">options</label>
              <select
                id="inputState"
                className="form-control"
               
                value={products.options || ""}
              >
                <option value={"active"}>Active</option>
                <option value={"inactive"}>disactive</option>
              </select>
            </div>


            <div className="row">
              <div className="col-md-4">
                <label className="form-label" htmlFor="Price">
                  Price
                </label>
                <input
                  type="number"
                  id="number"
                  className="form-control"
                 
                  value={products.price || ""}
                />{" "}
                
              </div>
              <div className="col-md-4">
                <label className="form-label" htmlFor="quantity">
                  quantity
                </label>
                <input
                  type="number"
                  id="number"
                  className="form-control"
              
                  value={products.quantity || ""}
                />
               
              </div>
              <div className="col-md-4">
                <label className="form-label" htmlFor="discount_price">
                  discount Price
                </label>
                <input
                  type="number"
                  id="discount_price"
                  name="discount_price"
                  className="form-control"
                  value={products.discount_price || ""}
                />
               
              </div>
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
         
              onChange={handleImageChange}
            />
          </div>
          <DialogActions>
            <Button onClick={handleClose} className="buttonCancel">
              Cancel
            </Button>
            <Button type="submit" className="buttonSubmit">
              Save
            </Button>
          </DialogActions>
        </form>
      </DialogContent>
    </Dialog>
  );
}
*/