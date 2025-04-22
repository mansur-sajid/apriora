import React, { useState } from 'react';
import {
  Modal,
  Box,
  Typography,
  Avatar,
  Button,
  Stack,
  IconButton,
  Chip,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { format } from 'date-fns';

export default function InterviewPopup({ selectedDate, closePopup }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  if (!selectedDate) return null;

  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 360,
    bgcolor: 'background.paper',
    borderRadius: 4,
    boxShadow: 24,
    p: 4,
    textAlign: 'center',
  };

  // Mock multiple interviews for a single day
  const interviews = [
    {
      name: 'Jordan Maccan',
      role: 'Front-End Developer',
      company: 'PayPal',
      avatar: 'https://randomuser.me/api/portraits/men/32.jpg',
      time: '11:30 AM to 12:45 PM',
    },
    {
      name: 'Lana Stone',
      role: 'UI/UX Designer',
      company: 'Adobe',
      avatar: 'https://randomuser.me/api/portraits/women/44.jpg',
      time: '1:15 PM to 2:30 PM',
    },
    {
      name: 'Eli Noor',
      role: 'Backend Engineer',
      company: 'Spotify',
      avatar: 'https://randomuser.me/api/portraits/men/65.jpg',
      time: '3:00 PM to 4:00 PM',
    },
  ];

  
  const current = interviews[currentIndex];

  const goLeft = () => {
    setCurrentIndex((prev) => (prev > 0 ? prev - 1 : interviews.length - 1));
  };

  const goRight = () => {
    setCurrentIndex((prev) => (prev < interviews.length - 1 ? prev + 1 : 0));
  };

  return (
    <Modal open={!!selectedDate} onClose={closePopup}>
      <Box sx={style}>
        <IconButton
          onClick={closePopup}
          sx={{ position: 'absolute', top: 8, right: 8 }}
        >
          <CloseIcon />
        </IconButton>

        {/* Arrows for navigation */}
        <Stack direction="row" justifyContent="space-between" alignItems="center">
          <IconButton onClick={goLeft}>
            <ArrowBackIosNewIcon />
          </IconButton>
          <Typography variant="caption" sx={{ fontWeight: 500 }}>
            {currentIndex + 1} / {interviews.length}
          </Typography>
          <IconButton onClick={goRight}>
            <ArrowForwardIosIcon />
          </IconButton>
        </Stack>

        <Stack spacing={2} alignItems="center" mt={1}>
          <Avatar
            alt={current.name}
            src={current.avatar}
            sx={{ width: 80, height: 80 }}
          />
          <Typography variant="h6" fontWeight="bold">
            {current.name}
          </Typography>
          <Typography variant="body2" color="var(--icons)">
            {current.role}
          </Typography>
         
          <Typography variant="body2" color="text.secondary">
            {format(selectedDate, 'MMMM dd, yyyy')} — {current.time}
          </Typography>

          <Stack direction="row" spacing={2} mt={2}>
            <Button
              variant="outlined"
              sx={{
                color: 'var(--icons)',
                borderColor: 'var(--icons)',
                borderRadius: '15px',
                textTransform: 'none',
                fontWeight: 500,
                px: 3,
                py: 1,
                '&:hover': {
                  backgroundColor: 'var(--icons)',
                  borderColor: '#666',
                  color: '#fff',
                },
              }}
            >
              View Details
            </Button>
          </Stack>
        </Stack>
      </Box>
    </Modal>
  );
}
