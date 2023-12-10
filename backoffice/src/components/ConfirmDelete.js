import React from 'react';

import {
  Dialog,
  DialogContent,
  DialogActions,
  Button,
} from '@mui/material';

function ConfirmDelete({ open, onCancel, onConfirm, deleteUserId }) {
  return (
    <Dialog open={open} onClose={onCancel}>
      <DialogContent>
        Are you sure you want to delete this user?
      </DialogContent>
      <DialogActions>
        <Button onClick={onCancel} color="primary">
          Cancel
        </Button>
        <Button onClick={() => onConfirm(deleteUserId)} color="primary">
          Confirm
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default ConfirmDelete;
