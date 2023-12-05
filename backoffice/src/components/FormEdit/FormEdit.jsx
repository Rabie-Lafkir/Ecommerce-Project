import React, { useState, useEffect } from "react";
import Swal from 'sweetalert2';
import "./FormEdit.css";
import axios from "axios";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
} from "@mui/material";

function FormEdit({ setOpenFormEdit,userId }){
  const  id  = userId;
  //console.log('inside edit'+ id);
  const [values, setValues] = useState({
    id: id,
    user_name: "",
    first_name: "",
    last_name: "",
    email: "",
    role: "",
    active: "",
  });
  
  useEffect(() => {
    axios
      .get("http://localhost:5000/v1/users/" + id)
      .then((res) => {
        setValues((values) => ({
          ...values,
          user_name: res.data.user_name,
          first_name: res.data.first_name,
          last_name: res.data.last_name,
          email: res.data.email,
          role: res.data.role,
          active: res.data.active,
        }));
      
      })
      .catch((err) => console.log(err));
  }, [id]);
 //console.log(values);
  const handleClose = () => {
    setOpenFormEdit(false);
    
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      const response = await axios.put(
        "http://localhost:5000/v1/users/" + id,
        values
      );
      //console.log(response.data.message);
      Swal.fire({
        title: 'Success!',
        text: response.data.message,
        icon: 'success',
      });

      handleClose();
      //reloadData(); // Reload the data after submission
    } catch (err) {
      console.error("Error editing user:", err);
      Swal.fire({
        title: 'Failed!',
        text: "Something went wrong.",
        icon: 'error',
      });
    }
    
  };

  return (
    <Dialog open={true} onClose={handleClose}>
      <DialogTitle className="titleEditUser">Edit User</DialogTitle>
      <DialogContent>
        <form onSubmit={handleSubmit} className="form">
          <TextField
            label="Username"
            variant="outlined"
            fullWidth
            margin="dense"
            placeholder={values && values.user_name}
            value={values.user_name}
            onChange={(e) =>
              setValues({ ...values, user_name: e.target.value })
            }
          />
          <TextField
            label="First Name"
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
            margin="dense"
            fullWidth
            value={values.last_name}
            onChange={(e) =>
              setValues({ ...values, last_name: e.target.value })
            }
          />
          <TextField
            label="Email"
            variant="outlined"
            fullWidth
            margin="dense"
            value={values.email}
            onChange={(e) => setValues({ ...values, email: e.target.value })}
          />
          <TextField
            label="Role"
            variant="outlined"
            fullWidth
            margin="dense"
            value={values.role}
            onChange={(e) => setValues({ ...values, role: e.target.value })}
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
};

export default FormEdit;
