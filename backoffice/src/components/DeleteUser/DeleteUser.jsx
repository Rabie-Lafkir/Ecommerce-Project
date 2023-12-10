

/*import React, { useState, useEffect } from "react";

import axios from "axios";

import { Dialog, DialogContent, DialogActions, Button } from "@mui/material";
export default function DeleteUser() {
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
  const [deleteUserId, setDeleteUserId] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [deleteUsername, setDeleteUsername] = useState(null);
  const [data, setData] = useState([]);
  const handleDelete = (id) => {
    //setDeleteUserId(id);
    setOpenDialog(true);
  };

  const handleConfirmDelete = () => {
    axios
      .delete(`http://localhost:5000/v1/users/${deleteUserId}`)
      .then((res) => {
        // setData(data.filter((item) => item.id !== deleteUserId));
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
  return (
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
  );
}
*/

import { useState } from 'react';
import { Modal, Button, Typography, useTheme } from '@mui/material';
import axios from 'axios';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';

const DeleteUser = ({ userId, userName, onDelete }) => {
  const theme = useTheme();
  const [openModal, setOpenModal] = useState(false);

  const handleDelete = async () => {
    try {
      await axios.delete(`http://localhost:3001/users/deleteUser/${userId}`);
      onDelete(); // Call the update function after deletion
      setOpenModal(false);
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  return (
    <>
      <DeleteOutlinedIcon
        onClick={() => setOpenModal(true)}
        sx={{
          color: theme.palette.error.main,
          cursor: "pointer"
        }}
      />
      <Modal
        open={openModal}
        onClose={() => setOpenModal(false)}
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <div
          style={{
            backgroundColor: theme.palette.common.white,
            padding: '32px',
            borderRadius: '8px',
          }}
        >
          <Typography variant="h6" gutterBottom sx={{color: "black"}} >
            Are you sure you want to delete {userName}?
          </Typography>
          <Button
            onClick={handleDelete}
            sx={{
              backgroundColor: theme.palette.error.main,
              color: 'common.white',
              '&:hover': {
                backgroundColor: theme.palette.error.dark,
              },
            }}
          >
            Delete
          </Button>
        </div>
      </Modal>
    </>
  );
};

export default DeleteUser;