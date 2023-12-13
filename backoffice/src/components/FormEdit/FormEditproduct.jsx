import React, { useState, useEffect, useReF } from "react";
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
  TextField,
  MenuItem,
} from "@mui/material";

export default function FormEdit({ setOpenFormEdit, productId }) {

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
    console.log(productId)
    axios
      .get(`http://localhost:5000/v1/products/${productId}`)
      .then((res) => {
        const result = res.data.data[0];
        setProducts({
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
      })
      .catch((err) => console.log(err));
  }, [1]);

  const handleClose = () => {
    setOpenFormEdit(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.patch(
        `http://localhost:5000/v1/products/${productId}`,
        products
      );
      Swal.fire({
        title: "Success!",
        text: response.data.message,
        icon: "success",
      });

      handleClose();
    } catch (err) {
      console.error("Error editing category:", err);
      Swal.fire({
        title: "Failed!",
        text: err.message,
        icon: "error",
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
            onChange={(e) =>
              setProducts({ ...products, short_description: e.target.value })
            }
          />
          <TextField
            label="Long description"
            variant="outlined"
            fullWidth
            margin="dense"
            value={products.long_description}
            onChange={(e) =>
              setProducts({ ...products, long_description: e.target.value })
            }
          />
          <TextField
            label="Price"
            variant="outlined"
            fullWidth
            margin="dense"
            value={products.price}
            onChange={(e) =>
              setProducts({ ...products, price: e.target.value })
            }
          />
          <TextField
            label="Quantity"
            variant="outlined"
            fullWidth
            margin="dense"
            value={products.quantity}
            onChange={(e) =>
              setProducts({ ...products, quantity: e.target.value })
            }
          />
          <TextField
            label="discount_price"
            variant="outlined"
            fullWidth
            margin="dense"
            value={products.discount_price}
            onChange={(e) =>
              setProducts({ ...products, discount_price: e.target.value })
            }
          />
          <TextField
            label="Category Name"
            variant="outlined"
            fullWidth
            margin="dense"
            select
            value={products.categoryLink.category_name || "kitchen"} // Valeur par défaut 'kitchen'
            onChange={(e) =>
              setProducts({
                ...products,
                categoryLink: { category_name: e.target.value },
              })
            }
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
