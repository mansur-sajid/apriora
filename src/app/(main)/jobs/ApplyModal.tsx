'use client';
import React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Box,
  TextField,
} from '@mui/material';

export default function ApplyModal({
  isOpen,
  onClose,
  onApply,
  applicationDetails,
  handleChange,
}) {
  return (
    <Dialog
      open={isOpen}
      onClose={onClose}
      aria-labelledby="apply-modal-title"
      maxWidth="xs"
      fullWidth
    >
      <DialogTitle id="apply-modal-title">Schedule Your Interview</DialogTitle>

      <DialogContent dividers>
        <Box display="flex" flexDirection="column" gap={2}>
          <p className="text-sm text-gray-600">
            Please choose a date and time when you’d like to give interview.
          </p>

          <TextField
            label="Date"
            type="date"
            name="date"
            value={applicationDetails.date}
            onChange={handleChange}
            InputLabelProps={{ shrink: true }}
            fullWidth
          />
          <TextField
            label="Time"
            type="time"
            name="time"
            value={applicationDetails.time}
            onChange={handleChange}
            InputLabelProps={{ shrink: true }}
            fullWidth
          />
        </Box>
      </DialogContent>

      <DialogActions sx={{ justifyContent: 'space-between', px: 3, pb: 2 }}>
        <button
          onClick={onClose}
          className="px-4 py-1 font-semibold bg-gray-200 text-black rounded hover:bg-gray-300"
        >
          Cancel
        </button>
        <button
          onClick={onApply}
          className="px-4 py-1 font-semibold bg-black text-white rounded hover:opacity-80"
        >
          Confirm
        </button>
      </DialogActions>
    </Dialog>
  );
}
