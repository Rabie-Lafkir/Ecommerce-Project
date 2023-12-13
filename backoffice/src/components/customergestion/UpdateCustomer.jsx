import React, { useEffect, useState } from "react";
import axios from "axios";
//import { useParams } from "react-router-dom";
// import { useForm } from "react-hook-form";
// import { yupResolver } from "@hookform/resolvers/yup";
// import * as yup from "yup";

import DialogTitle from "@mui/material/DialogTitle";
import { Dialog, DialogContent, DialogActions, Button,TextField } from "@mui/material";

import Swal from "sweetalert2";



export default function UpdateCustomer({ setOpenFormEdit, customerId }) {
    const id = customerId;
    const [values, setValues] = useState({
      id: id,
    first_name: "",
    last_name: "",

    email: "",
    });
  
    useEffect(() => {
      axios
        .get(`http://localhost:5000/v1/customers/${id}`)
        .then((res) => {
          const result = res.data;
       
          setValues({
            ...values,
            first_name: result.first_name,
            last_name: result.last_name,
            email: result.email,
          });
     
        })
        .catch((err) => console.log(err));
    },[id] ); 
    // g supp [id]
  //console.log(values)
  
  
    const handleClose = () => {
      setOpenFormEdit(false);
    };
  
    const handleSubmit = async (e) => {
      e.preventDefault();
  
      try {
        const response = await axios.put(
          `http://localhost:5000/v1/customers/${id}`,
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
        <DialogTitle className="titleEditUser">Edit Customer</DialogTitle>
        <DialogContent>
          <form onSubmit={handleSubmit} className="form">
            <TextField
              label="firstName"
              variant="outlined"
              fullWidth
              margin="dense"
              value={values.first_name}
              onChange={(e) =>
                setValues({ ...values, first_name: e.target.value })
              }
            />
             <TextField
              label="Last Name"
              variant="outlined"
              fullWidth
              margin="dense"
              value={values.last_name}
              onChange={(e) =>
                setValues({ ...values, last_name: e.target.value })
              }
            />
            <TextField
              label="email"
              variant="outlined"
              fullWidth
              margin="dense"
              value={values.email}
              onChange={(e) => setValues({ ...values, email: e.target.value })}
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
  
  
  
 