import React, { useState } from 'react';
import {
  Modal,
  Box,
  Typography,
  Avatar,
  Button,
  Stack,
  IconButton,
} from '@mui/material';
import DetailsPanel from "../jobs/details";
import CloseIcon from '@mui/icons-material/Close';
import { useRole } from '../RoleContext';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { format, parseISO } from 'date-fns';

export default function InterviewPopup({ selectedDate, closePopup, interviews }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedJob, setSelectedJob] = useState(null);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);
  const { role } = useRole();
  if (!selectedDate || !interviews.length) return null;

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

  const current = interviews[currentIndex];
  const jobPost = current.jobPost;
  const interview = current.interview;
  const interviewTime = current.interview?.scheduledAt 
    ? format(parseISO(current.interview.scheduledAt), 'h:mm a') 
    : 'Time not specified';

  const goLeft = () => {
    setCurrentIndex((prev) => (prev > 0 ? prev - 1 : interviews.length - 1));
  };

  const goRight = () => {
    setCurrentIndex((prev) => (prev < interviews.length - 1 ? prev + 1 : 0));
  };
  const handleDetailsClick = (job) => {
    setSelectedJob(job); // Set selected job data
    setIsDetailsOpen(true); // Open the details panel
  };

  return (
    <>
    <Modal open={!!selectedDate} onClose={closePopup} >
      <Box sx={style}>
        <IconButton
          onClick={closePopup}
          sx={{ position: 'absolute', top: 8, right: 8 }}
        >
          <CloseIcon />
        </IconButton>

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
            alt={role === 'jobseeker' ? jobPost.company?.name : interview.user?.name}
            src="/default-avatar.png" // You can replace with actual avatar if available
            sx={{ width: 80, height: 80 }}
          />
          <Typography variant="h6" fontWeight="bold">
          {role === 'jobseeker' ? jobPost.title : interview.user?.name}
          </Typography>
          <Typography variant="body2">
            { role === 'jobseeker' ? jobPost.company?.name : jobPost.title }
          </Typography>
         
          <Typography variant="body2" color="text.secondary">
            {format(selectedDate, 'MMMM dd, yyyy')} — {interviewTime}
          </Typography>

          <Stack direction="row" spacing={2} mt={2}>
            <Button
              variant="outlined"
              onClick={() => handleDetailsClick(jobPost)}
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
              View Job Details
            </Button>
          </Stack>
        </Stack>
      </Box>
      
    </Modal>
    <DetailsPanel
        open={isDetailsOpen}
        onClose={() => setIsDetailsOpen(false)}
        job={jobPost}
        />
    </>
  );
}