import {useState} from 'react';
import Swal from 'sweetalert2';
import './AddCategory.css';
import axios from 'axios';
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
    const [category_name,setCategoryName] = useState("")
    const [active, setActive] = useState("");

    const handleClose = () => {
        setOpenForm(false);
       
      };

      
  const handleSubmit = async (e) => {
    e.preventDefault();
  // console.log(username,lastname,firstname,email,role);
    if(!category_name || !active ){
      console.error('Please fill in all fields');
  
    }
    try {
      const response = await axios.post("http://localhost:5000/v1/categories", {
        category_name: category_name,
        active: active,
      },);
      //console.log(response.data.message);
      Swal.fire({
        title: 'Success!',
        text: 'Category added successfully.',
        icon: 'success',
      });
     handleClose();

    } catch (err) {
      console.error("Error adding category:", err);
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
            label="Category Name"
            variant="outlined"
            fullWidth
            margin="dense"
            value={category_name}
            onChange={(e) => setCategoryName(e.target.value)}
          />
      
    
            <FormControl fullWidth margin="normal">
              <InputLabel>Active</InputLabel>
              <Select
                name="active"
                value={active}
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
  }
