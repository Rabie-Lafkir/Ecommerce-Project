import React, { useState, useEffect } from "react";
import { DataGrid } from "@mui/x-data-grid";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import FormAdd from "../FormAdd/FormAdd";
import FormEdit from "../FormEdit/FormEdit";

import axios from "axios";
import { Dialog, DialogContent, DialogActions, Button } from "@mui/material";
//import "./DataTable.css";
//import { Link } from "react-router-dom";

const userColumns = [
  {
    field: "id",
    headerName: "ID",
    flex: 1,
    headerClassName: "headerNameStyle",
  },
  {
    field: "product_name",
    headerName: "Name",
    flex: 1,
    headerClassName: "headerNameStyle",
  },
  {
    field: "sku",
    headerName: "Sku",
    flex: 1,
    headerClassName: "headerNameStyle",
  },
  {
    field: "price",
    headerName: "Price",
    flex: 1,
    headerClassName: "headerNameStyle",
  },
  {
    field: "short_description",
    headerName: "Short description",
    flex: 2,
    headerClassName: "headerNameStyle",
  },
];

export default function Datatable() {
  const [deleteUserId, setDeleteUserId] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);

  const [openForm, setOpenForm] = useState(false);
  const [openFormEdit, setOpenFormEdit] = useState(false);
  const [deleteUsername, setDeleteUsername] = useState(null);

  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [inputValue, setInputValue] = useState("");

  const styles = {
    cancelButton: {
      color: "black",
      backgroundColor: "#ccc",
    },
    confirmButton: {
      color: "white",
      backgroundColor: "#0a5693",
    },
  };
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:5000/v1/products");
        setProducts(response.data);
        setFilteredProducts(response.data);
        console.log(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const rows = filteredProducts.map(({ _id, ...rest }) => ({
    id: _id,
    ...rest,
  }));
  //delete
  const handleDelete = (id) => {
    setDeleteUserId(id);
    setOpenDialog(true);
  };

  const handleConfirmDelete = () => {
    axios
      .delete(`http://localhost:5000/v1/users/${deleteUserId}`)
      .then((res) => {
        console.log(res.data);
      })
      .catch((error) => {
        console.error("Error deleting user ", error);
      })
      .finally(() => {
        setDeleteUserId(null);
        setDeleteUsername(null);
        setOpenDialog(false);
      });
  };

  // useEffect(() => {
  //   if (deleteUserId) {
  //     const userToDelete = data.find((user) => user.id === deleteUserId);
  //     setDeleteUsername(userToDelete ? userToDelete.username : null);
  //   }
  // }, [deleteUserId, data]);
  const handleCancelDelete = () => {
    setDeleteUserId(null);
    setOpenDialog(false);
  };
  useEffect(() => {
    // Filter users based on input value
    const filterProducts = () => {
      const filtered = products.filter((product) => {
        const productName = product.product_name || "";
        return productName.toLowerCase().includes(inputValue.toLowerCase());
      });
      setFilteredProducts(filtered);
    };

    filterProducts();
  }, [inputValue, products]);
  const handleInput = (e) => {
    setInputValue(e.target.value);
  };

  const actionColumn = [
    {
      field: "action",
      headerName: "Action",
      sortable: false,
      flex: 1,
      renderCell: (params) => {
        return (
          <div className="cellAction">
            <div className="editButton" onClick={() => setOpenFormEdit(true)}>
              <EditOutlinedIcon />
              {openFormEdit && <FormEdit setOpenFormEdit={setOpenFormEdit} />}
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
      headerClassName: "headerNameStyle",
    },
  ];

  return (
    <div className="datatable">
      <div className="datatableTitle">
        <span className="listUser">List of Users</span>

        <span className="link" onClick={() => setOpenForm(true)}>
          Add New User
        </span>
      </div>

      {openForm && <FormAdd setOpenForm={setOpenForm} />}
      <input
        type="text"
        className="search"
        onChange={handleInput}
        placeholder="Search Products"
      />
      <div className="tabContent">
        <DataGrid
          initialState={{
            columns: {
              columnVisibilityModel: {
                id: false,
              },
            },
          }}
          className="datagrid"
          rows={rows}
          columns={userColumns.concat(actionColumn)}
          pageSize={8}
          rowsPerPageOptions={[5]}
        />
      </div>

      <Dialog open={openDialog} onClose={handleCancelDelete}>
        <DialogContent>
          {deleteUsername && (
            <>
              Are you sure you want to delete <strong>{deleteUsername}</strong>?
            </>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCancelDelete} style={styles.cancelButton}>
            Cancel
          </Button>
          <Button onClick={handleConfirmDelete} style={styles.confirmButton}>
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
