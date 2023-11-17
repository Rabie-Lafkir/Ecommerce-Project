import React, { useState,useEffect } from "react";
import { DataGrid } from "@mui/x-data-grid";
//import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import axios from "axios";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  FormControl,
  MenuItem,
  Select,
  InputLabel,
} from "@mui/material";
import "./DataTable.css";
import { Link } from "react-router-dom";

const userColumns = [
  { field: "id", headerName: "ID", width: 70 },
  {
    field: "user",
    headerName: "Username",
    width: 230,
    renderCell: (params) => {
      return (
        <div className="cellWithImg">
         
          {params.row.username}
        </div>
      );
    },
  },
  { field: "email", headerName: "Email", width: 200 },
 
  {
    field: "active",
    headerName: "Active",
    width: 160,
    renderCell: (params) => {
      return (
        <div className={`cellWithActive ${params.row.active}`}>
          {params.row.active}
        </div>
      );
    },
  },
];

export default function Datatable() {
  const [data, setData] = useState([]);

  const [openDialog, setOpenDialog] = useState(false);

  const [editedUser, setEditedUser] = useState({
    id: "",
    username: "",
    active: false,
    email: "",
  });

  useEffect(() => {
    axios.get('http://localhost:5000/v1/users')
      .then(response => {
        const formattedData = response.data.map(user => ({
          id: user._id,
          username: user.user_name,
          email: user.email,
          active: user.active,
            
        }));
        setData(formattedData);
        console.log(formattedData)
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }, []);
  

 
  const handleDelete = (id) => {
    setData(data.filter((item) => item.id !== id));
  };
  const handleEditClick = (params) => {
    setEditedUser({
      id: params.row.id,
      username: params.row.username,
      active: params.row.active,
      email: params.row.email,
    });
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setEditedUser((prevUser) => ({
      ...prevUser,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleFormSubmit = () => {
    setOpenDialog(false);
  };

  const actionColumn = [
    {
      field: "action",
      headerName: "Action",
      width: 200,
      renderCell: (params) => {
        return (
          <div className="cellAction">
            <div className="editButton" onClick={() => handleEditClick(params)}>
              <EditOutlinedIcon />
            </div>

            <div
              className="deleteButton"
              onClick={() => handleDelete(params.row.id)}
            >
              <DeleteOutlineOutlinedIcon />
            </div>
          </div>
        );
      },
    },
  ];

  return (
    <div className="datatable">
      <div className="datatableTitle">
        <span className="listUser">List of Users</span>
        <Link to="/users/userId/new" style={{ textDecoration: "none" }}>
          <span className="link">Add New User</span>
        </Link>
      </div>
      <div className="tabContent">
      <DataGrid
        className="datagrid"
        rows={data}
        columns={userColumns.concat(actionColumn)}
        pageSize={8}
        rowsPerPageOptions={[5]}
        checkboxSelection
      />
      </div>
      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogTitle
          style={{
            textAlign: "center",
            backgroundColor: "#7451f8",
            color: "#fff",
          }}
        >
          Edit User
        </DialogTitle>
        <DialogContent>
          <TextField
            label="Username"
            name="username"
            value={editedUser.username}
            onChange={handleInputChange}
            fullWidth
            margin="normal"
          />

          <FormControl
            fullWidth
            margin="normal"
            variant="outlined"
            style={{ borderColor: "#7451f8" }}
          >
            <InputLabel id="active-label">Active</InputLabel>
            <Select
              labelId="active-label"
              id="active"
              name="active"
              value={editedUser.active ? "yes" : "no"}
              onChange={handleInputChange}
              label="Active"
            >
              <MenuItem value="yes">Yes</MenuItem>
              <MenuItem value="no">No</MenuItem>
            </Select>
          </FormControl>
          <TextField
            label="Email"
            name="email"
            value={editedUser.email}
            onChange={handleInputChange}
            fullWidth
            margin="normal"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} style={{ color: "#7451f8" }}>
            Cancel
          </Button>
          <Button
            onClick={handleFormSubmit}
            style={{ backgroundColor: "#7451f8", color: "#fff" }}
            variant="contained"
          >
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
