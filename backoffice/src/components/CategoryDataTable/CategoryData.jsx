import React, { useState, useEffect } from "react";
import { DataGrid } from "@mui/x-data-grid";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import AddCategory from '../AddCategory/AddCategory';
import EditCategory from '../EditCategory/EditCategory';
import Swal from 'sweetalert2';
import axios from "axios";
import { Dialog, DialogContent, DialogActions, Button } from "@mui/material";
import './CategoryData.css';
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
    field: "category_name",
    headerName: "Category Name",
    flex: 1,
    headerClassName: "headerNameStyle",
  },
  {
    field: "active",
    headerName: "Active",
    flex: 1,
    headerClassName: "headerNameStyle",
  },
]


export default function Datatable() {
  const [data, setData] = useState([]);
  const [deleteCategoryId, setDeleteCategoryId] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);

  const [openForm, setOpenForm] = useState(false);

  const [deleteUsername, setDeleteUsername] = useState(null);

  const [editCategoryId, setEditCategoryId] = useState(null);
  const [openFormEdit, setOpenFormEdit] = useState(false);

  const handleEdit = (id) => {
    setEditCategoryId(id);
    setOpenFormEdit(true);
  };

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
    axios
      .get("http://localhost:5000/v1/categories")
      .then((response) => {
        console.log("Response data:", response.data);
        const formattedData = response.data.data.map((category) => ({
          id: category._id,
          category_name: category.category_name,
          active: category.active,
        }));
        setData(formattedData);
        console.log(formattedData);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, [openFormEdit, openForm, openDialog]);
  
  //delete
  const handleDelete = (id) => {
    setDeleteCategoryId(id); 
    setOpenDialog(true);
  };

  const handleConfirmDelete = () => {
    axios
      .delete(`http://localhost:5000/v1/categories/${deleteCategoryId}`)
      .then((res) => {
        console.log(res.data);
  
        Swal.fire({
          title: 'Deleted!',
          text:'Category deleted successfully.',
          icon: 'success',
        });
      })
      .catch((error) => {
        console.error('Error deleting category ', error);
  
        Swal.fire({
          title: 'Failed!',
          text: error.message,
          icon: 'error',
        });
      })
      .finally(() => {
        setDeleteCategoryId(null);
        setDeleteUsername(null);
        setOpenDialog(false);
      });
  };
  
  

  useEffect(() => {
    if (deleteCategoryId) {
      const categoryToDelete = data.find((category) => category.id === deleteCategoryId);
      setDeleteUsername(categoryToDelete ? categoryToDelete.category_name : null);
    }
  }, [deleteCategoryId, data]);
  const handleCancelDelete = () => {
    setDeleteCategoryId(null);
    setOpenDialog(false);
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
            <div
              className="editButton"
              onClick={() => {
                handleEdit(params.row.id);
                //console.log("params" + params.row.id);
              }}
            >
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
      headerClassName: "headerNameStyle",
    },
  ];

  return (
    <div className="datatable">
      <div className="datatableTitle">
        <span className="listUser">List of Categories</span>

        <span className="link" onClick={() => setOpenForm(true)}>
          Add New Category
        </span>
      </div>

      {openForm && <AddCategory setOpenForm={setOpenForm} />}
      {openFormEdit && (
        <EditCategory setOpenFormEdit={setOpenFormEdit} categoryId={editCategoryId} />
      )}

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
          rows={data}
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




  
  