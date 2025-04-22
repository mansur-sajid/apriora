"use client";
import {
  Box,
  Button,
  CircularProgress,
  Modal,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  Paper,
} from "@mui/material";
import { useState } from "react";

import { useGetAllSummariesQuery } from "@apriora/titan/gql-client";

const InterviewSummaryPage = () => {
  const { data: summaries, isLoading } = useGetAllSummariesQuery();
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState<any>(null);

  const handleOpen = (row: any) => {
    setSelected(row);
    setOpen(true);
  };

  const handleClose = () => setOpen(false);
  console.log("summaries", summaries);
  console.log(selected?.summary?.summary, "selected.summary.summary");

  return (
    <Box p={4}>
      <Typography variant="h4" gutterBottom>
        Interview Summaries
      </Typography>

      {isLoading ? (
        <Box display="flex" justifyContent="center" mt={4}>
          <CircularProgress />
        </Box>
      ) : (
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>User Name</TableCell>
                <TableCell>Job Title</TableCell>
                <TableCell>Scheduled At</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {summaries.summary.map((row, index) => (
                <TableRow key={index}>
                  <TableCell>{`${row.user.firstName} ${row.user.lastName}`}</TableCell>
                  <TableCell>{row.jobPost.title}</TableCell>
                  <TableCell>
                    {new Date(row.interview.scheduledAt).toLocaleString()}
                  </TableCell>
                  <TableCell>
                    <Button variant="outlined" onClick={() => handleOpen(row)}>
                      Details
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}

      <Modal open={open} onClose={handleClose}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 600,
            bgcolor: "background.paper",
            boxShadow: 24,
            p: 4,
            borderRadius: 2,
          }}
        >
          {selected && (
            <>
              <Typography variant="h6" gutterBottom>
                Full Summary
              </Typography>
              <Typography gutterBottom>{selected.summary.summary.summary}</Typography>
              <Box mt={2}>
                <Typography variant="subtitle2">
                  Curiosity: {selected.summary.summary.curiosity}
                </Typography>
                <Typography variant="subtitle2">
                  Experience: {selected.summary.summary.experience}
                </Typography>
                <Typography variant="subtitle2">
                  Culture Fit: {selected.summary.summary.culture_fit}
                </Typography>
                <Typography variant="subtitle2">
                  Communication: {selected.summary.summary.communication}
                </Typography>
                <Typography variant="subtitle2">
                  Problem Solving: {selected.summary.summary.problem_solving}
                </Typography>
                <Typography variant="subtitle2">
                  Technical Ability: {selected.summary.summary.technical_ability}
                </Typography>
                <Typography variant="subtitle2">
                  Overall Score: {selected.summary.summary.overall_score}
                </Typography>
              </Box>
            </>
          )}
        </Box>
      </Modal>
    </Box>
  );
};

export default InterviewSummaryPage;
