
import React, { useState, useEffect } from "react";
import Swal from 'sweetalert2';
import "./EditCategory.css";
import axios from "axios";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
} from "@mui/material";

function EditCategory({ setOpenFormEdit, categoryId }) {
  const id = categoryId;
  const [values, setValues] = useState({
    id: id,
    category_name: "",
    active: "",
  });

  useEffect(() => {
    axios
      .get(`http://localhost:5000/v1/categories/${id}`)
      .then((res) => {
        const result = res.data.data;
        console.log("ressss: ",result.category_name)
        setValues({
          ...values,
          category_name: result.category_name,
          active: result.active,
        });
        console.log({soñethimg: res.data});
      })
      .catch((err) => console.log(err));
  }, [id]);
console.log(values)


  const handleClose = () => {
    setOpenFormEdit(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.put(
        `http://localhost:5000/v1/categories/${id}`,
        values
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

  return (
    <Dialog open={true} onClose={handleClose}>
      <DialogTitle className="titleEditUser">Edit Category</DialogTitle>
      <DialogContent>
        <form onSubmit={handleSubmit} className="form">
          <TextField
            label="Category Name"
            variant="outlined"
            fullWidth
            margin="dense"
            value={values.category_name}
            onChange={(e) =>
              setValues({ ...values, category_name: e.target.value })
            }
          />
          <TextField
            label="Active"
            variant="outlined"
            fullWidth
            margin="dense"
            value={values.active}
            onChange={(e) => setValues({ ...values, active: e.target.value })}
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

export default EditCategory;
