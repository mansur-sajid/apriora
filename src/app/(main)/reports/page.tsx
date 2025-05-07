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
import SummaryModal from "./Summarymodal";

const InterviewSummaryPage = () => {
  const { data: summaries, isLoading } = useGetAllSummariesQuery();
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState<any>(null);

  const handleOpen = (row: any) => {
    setSelected(row);
    setOpen(true);
  };

  const handleClose = () => setOpen(false);

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
                <TableCell sx={{ fontWeight: 'bold' }}>User Name</TableCell>
                <TableCell sx={{ fontWeight: 'bold' }}>Job Title</TableCell>
                <TableCell sx={{ fontWeight: 'bold' }}>Scheduled At</TableCell>
                <TableCell sx={{ fontWeight: 'bold' }}>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {summaries?.summary.map((row, index) => (
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

      {selected && (
        <SummaryModal
          open={open}
          onClose={handleClose}
          summary={selected.summary.summary}
          jobTitle={selected.jobPost.title}
          userName={`${selected.user.firstName} ${selected.user.lastName}`}
          interviewDate={selected.interview.scheduledAt}
          interviewId={selected.interview.id}
        />
      )}
    </Box>
  );
};

export default InterviewSummaryPage;
