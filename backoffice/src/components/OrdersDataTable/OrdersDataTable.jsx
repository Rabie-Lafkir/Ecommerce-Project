import React, { useState, useEffect } from "react";
import { DataGrid } from "@mui/x-data-grid";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
} from "@mui/material";

import axios from "axios";

import "../DataTable/DataTable.css";

export default function OrdersDataTable() {
  const styles={
    cancelButton: {
      color: "black",
      backgroundColor: "#ccc",
      padding: "10px 20px",
  
    cursor: "pointer",
    },
    confirmButton: {
      color: "white",
      backgroundColor: "#0a5693",
      padding: "10px 20px",
  
      cursor: "pointer",
    },
    titleEditStatus:{
      textAlign:"center",
      color:"white",
      backgroundColor: "#0a5693",
      fontSize :"1.24rem",
      marginBottom: "10px",
    }
  }
  const orderColumns = [
    {
      field: "orderNumber",
      headerName: "Order Number",
      flex: 1,
      headerClassName: "headerNameStyle",
    },
    {
      field: "customerName",
      headerName: "Customer Name",
      flex: 1,

      headerClassName: "headerNameStyle",
    },
    {
      field: "date",
      headerName: "Order date",
      flex: 1,
      headerClassName: "headerNameStyle",
    },
    {
      field: "total_price",
      headerName: "Total price",
      flex: 1,
      headerClassName: "headerNameStyle",
    },
    {
      field: "order_items",
      headerName: "Order items",
      flex: 1,
      headerClassName: "headerNameStyle",
    },
    {
      field: "status",
      headerName: "Status",
      flex: 1,
      renderCell: (params) => {
        return (
          <div className={`cellWithStatus ${params.row.status}`}>
            {params.row.status}
          </div>
        );
      },
      headerClassName: "headerNameStyle",
    },
  ];

  useEffect(() => {
    axios
      .get("http://localhost:5000/v1/orders")
      .then((response) => {
        const formattedData = response.data.data.map((order) => ({
          orderNumber: order.orderNumber,
          customerName: order.customerFirstName + " " + order.customerLastName,
          status: order.status,
          date: order.orderDate,
          total_price: order.cartTotalPrice,
          order_items: order.order_items,
        }));
        setData(formattedData);
        console.log(formattedData);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
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

  const handleEditClick = (params) => {
    setEditedOrder({
      status: params.row.status,
    });
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedOrder((prevOrder) => ({
      ...prevOrder,
      [name]: value,
    }));
  };

  const handleFormSubmit = () => {
    setOpenDialog(false);
  };

  const actionColumn = [
    {
      field: "action",
      headerName: "Action",
      flex: 1,
      renderCell: (params) => {
        return (
          <div className="cellAction">
            <div className="editButton" onClick={() => handleEditClick(params)}>
              <EditOutlinedIcon />
            </div>
          </div>
        );
      },
      headerClassName: "headerNameStyle",
    },
  ];

  return (
    <div className="datatable">
      <div className="datatableTitle">
        <span className="listUser">Orders</span>
      </div>
      <DataGrid
        initialState={{
          columns: {
            columnVisibilityModel: {
              orderNumber: false,
            },
          },
        }}
        className="datagrid"
        rows={data}
        columns={orderColumns.concat(actionColumn)}
        getRowId={getRowId}
        pageSize={8}
        rowsPerPageOptions={[5]}
      />
      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogTitle style={styles.titleEditStatus} >Edit Status</DialogTitle>
        <DialogContent>
          <FormControl fullWidth>
            <InputLabel>Status</InputLabel>
            <Select
              label="Status"
              name="status"
              value={editedOrder.status}
              onChange={handleInputChange}
            >
              <MenuItem value="open">Open</MenuItem>
              <MenuItem value="Shipped">Shipped</MenuItem>
              <MenuItem value="Paid">Paid</MenuItem>
              <MenuItem value="Closed">Closed</MenuItem>
              <MenuItem value="Canceled">Canceled</MenuItem>
            </Select>
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} style={styles.cancelButton}>Cancel</Button>
          <Button onClick={handleFormSubmit}  style={styles.confirmButton}>Save</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
