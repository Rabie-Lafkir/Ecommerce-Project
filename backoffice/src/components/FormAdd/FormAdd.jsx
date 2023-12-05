import { useState } from "react";
import Swal from 'sweetalert2'
import "./FormAdd.css";
import axios from "axios";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  FormControl ,
  InputLabel,
  Select,MenuItem
} from "@mui/material";

export default function FormAdd({ setOpenForm}){
  const [username, setUsername] = useState("");
  const [lastname, setLastname] = useState("");
  const [firstname, setFirstname] = useState("");
  const [email, setEmail] = useState("");
  const [active, setActive] = useState("");

  const [role, setRole] = useState("");
 

 
  const handleClose = () => {
    setOpenForm(false);
   
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  // console.log(username,lastname,firstname,email,role);
    if(!username || !lastname || !firstname || !email || !role || !active){
      console.error('Please fill in all fields');
  
    }
    try {
      const response = await axios.post("http://localhost:5000/v1/users", {
        user_name: username,
        last_name: lastname,
        first_name: firstname,
        email: email,
        role: role,
        active: active,
      },);
      console.log(response.data.message);
      Swal.fire({
        title: 'Success!',
        text: 'User added successfully.',
        icon: 'success',
      });
     handleClose();
   // reloadData(); // Reload the data after submission
    } catch (err) {
      console.error("Error adding user:", err);
      Swal.fire({
        title: 'Oops...',
        text: err,
        icon: 'error',
      })
    }
    
  };

  return (
    <Dialog open={true} onClose={handleClose}>
      <DialogTitle className="titleNewUser">Add New User</DialogTitle>
      <DialogContent>
        <form onSubmit={handleSubmit} className="form">
          <TextField
            label="Username"
            variant="outlined"
            fullWidth
            margin="dense"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <TextField
            label="First Name"
            variant="outlined"
            fullWidth
            margin="dense"
            value={firstname}
            onChange={(e) => setFirstname(e.target.value)}
          />
          <TextField
            label="Last Name"
            variant="outlined"
            margin="dense"
            fullWidth
            value={lastname}
            onChange={(e) => setLastname(e.target.value)}
          />
          <TextField
            label="Email"
            variant="outlined"
            fullWidth
            margin="dense"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
            <FormControl fullWidth margin="normal">
              <InputLabel>Role</InputLabel>
              <Select
                name="role"
                value={role}
                onChange={(e) => setRole(e.target.value)}
              >
                <MenuItem value="Admin">Admin</MenuItem>
                <MenuItem value="Manager">Manager</MenuItem>
              </Select>
            </FormControl>
            <FormControl fullWidth >
              <InputLabel>Active</InputLabel>
              <Select
                name="ACTIVE"
                value={role}
                onChange={(e) => setActive(e.target.value)}
              >
                <MenuItem value="false">False</MenuItem>
                <MenuItem value="true">True</MenuItem>
              </Select>
            </FormControl>
        
          <DialogActions>
            <Button onClick={handleClose} className="buttonCancel">
              Cancel
            </Button>
            <Button type="submit" className="buttonSubmit">
              Submit
            </Button>
          </DialogActions>
        </form>
      </DialogContent>
    </Dialog>
  );
};


