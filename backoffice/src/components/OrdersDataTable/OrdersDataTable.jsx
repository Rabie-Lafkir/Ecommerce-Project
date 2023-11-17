import React, { useState,useEffect } from "react";
import { DataGrid } from "@mui/x-data-grid";
//import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import {ChevronRightCircle} from 'lucide-react'
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

import "../DataTable/DataTable.css";
import { Link } from "react-router-dom";



export default function OrdersDataTable() {
  const orderColumns = [
    { field: "orderNumber", headerName: "Order number", width: 70 },
    {
      field: "customerName",
      headerName: "Customer name",
      width: 230,
      renderCell: (params) => {
        return (
          <div className="cellWithImg">
           
            {params.row.customerName}
          </div>
        );
      },
    },
    { field: "date", headerName: "Order date", width: 200 },
   
    {
      field: "status",
      headerName: "Status",
      width: 160,
      renderCell: (params) => {
        return (
          <div className={`cellWithActive ${params.row.status}`}>
            {params.row.status}
          </div>
        );
      },
    },
  ];

  useEffect(() => {
    axios.get('http://localhost:5000/v1/orders')
  .then(response => {
    const formattedData = response.data.data.map(order => ({
      orderNumber: order.orderNumber,
      customerName: order.customerFirstName + ' ' + order.customerLastName,
      status: order.orderStatus || order.status,
      date: order.orderDate || '', // Adjust if necessary
    }));
    setData(formattedData);
    console.log(formattedData);
  })
  .catch(error => {
    console.error('Error fetching data:', error);
  });

  }, []);

  const getRowId = (row) => row.orderNumber;


  const [data, setData] = useState([]);

  const [openDialog, setOpenDialog] = useState(false);

  const [editedOrder, setEditedOrder] = useState({
        orderNumber: "",
        customerName: "",
        date: "",
        status: "",
  });

  const handleDelete = (orderNumber) => {
    setData(data.filter((item) => item.orderNumber !== orderNumber));
  };
  const handleEditClick = (params) => {
    setEditedOrder({
      orderNumber: params.row.orderNumber,
      customerName: params.row.username,
      date: params.row.date,
      status: params.row.status,
    });
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setEditedOrder((prevUser) => ({
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
            <div className="detailsButton" onClick={() => handleEditClick(params)}>
            <ChevronRightCircle />
            </div>

            <div
              className="deleteButton"
              onClick={() => handleDelete(params.row.orderNumber)}
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
        <span className="listUser">Orders</span>
        <Link to="/orders/details" style={{ textDecoration: "none" }}>
          <span className="link">Details</span>
        </Link>
      </div>
      <DataGrid
        className="datagrid"
        rows={data}
        columns={orderColumns.concat(actionColumn)}
        getRowId={getRowId}
        pageSize={8}
        rowsPerPageOptions={[5]}
        checkboxSelection
      />
      {/* <Dialog open={openDialog} onClose={handleCloseDialog}>
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
      </Dialog> */}
    </div>
  );
}
