import React, { useState, useEffect } from "react";
import { DataGrid } from "@mui/x-data-grid";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import FormAdd from "../FormAdd/FormAdd";
import FormEdit from "../FormEdit/FormEdit";
import Swal from 'sweetalert2';
import axios from "axios";
import { Dialog, DialogContent, DialogActions, Button } from "@mui/material";
import "./DataTable.css";
//import { Link } from "react-router-dom";

const userColumns = [
  {
    field: "id",
    headerName: "ID",
    flex: 1,
    headerClassName: "headerNameStyle",
  },
  {
    field: "user",
    headerName: "Username",
    flex: 1,
    renderCell: (params) => {
      return <div className="cellWithImg">{params.row.username}</div>;
    },
    headerClassName: "headerNameStyle",
  },
  {
    field: "firstname",
    headerName: "First Name",
    flex: 1,
    headerClassName: "headerNameStyle",
  },
  {
    field: "lastname",
    headerName: "Last Name",
    flex: 1,
    headerClassName: "headerNameStyle",
  },
  {
    field: "role",
    headerName: "Role",
    flex: 1,
    headerClassName: "headerNameStyle",
  },

  {
    field: "email",
    headerName: "Email",
    flex: 1,
    headerClassName: "headerNameStyle",
  },

  {
    field: "active",
    headerName: "Active",
    flex: 1,
    headerClassName: "headerNameStyle",
  },
];

export default function Datatable() {
  const [data, setData] = useState([]);
  const [deleteUserId, setDeleteUserId] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);

  const [openForm, setOpenForm] = useState(false);

  const [deleteUsername, setDeleteUsername] = useState(null);

  const [editUserId, setEditUserId] = useState(null);
  const [openFormEdit, setOpenFormEdit] = useState(false);

  const handleEdit = (id) => {
    setEditUserId(id);
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
      .get("http://localhost:5000/v1/users")
      .then((response) => {
        const formattedData = response.data.map((user) => ({
          id: user._id,
          username: user.user_name,
          lastname: user.last_name,
          firstname: user.first_name,
          role: user.role,

          email: user.email,
          active: user.active,
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
    setDeleteUserId(id);
    setOpenDialog(true);
  };

  const handleConfirmDelete = () => {
    axios
      .delete(`http://localhost:5000/v1/users/${deleteUserId}`)
      .then((res) => {
        console.log(res.data);
        Swal.fire({
          title: "Deleted!",
          text:"'User deleted successfully.'",
          icon:'success',
        });
      })
      .catch((error) => {
        //console.error("Error deleting user ", error);
        Swal.fire({
          title: "Failed!",
          text:  error.message,
          icon:'error',
        });
      })
      .finally(() => {
        setDeleteUserId(null);
        setDeleteUsername(null);
        setOpenDialog(false);
      });
  };

  useEffect(() => {
    if (deleteUserId) {
      const userToDelete = data.find((user) => user.id === deleteUserId);
      setDeleteUsername(userToDelete ? userToDelete.username : null);
    }
  }, [deleteUserId, data]);
  const handleCancelDelete = () => {
    setDeleteUserId(null);
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
        <span className="listUser">List of Users</span>

        <span className="link" onClick={() => setOpenForm(true)}>
          Add New User
        </span>
      </div>

      {openForm && <FormAdd setOpenForm={setOpenForm} />}
      {openFormEdit && (
        <FormEdit setOpenFormEdit={setOpenFormEdit} userId={editUserId} />
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
