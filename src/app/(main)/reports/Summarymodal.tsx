"use client";
import {
  Box,
  Typography,
  Modal,
} from "@mui/material";

interface Summary {
  summary: string;
  curiosity: number;
  experience: number;
  culture_fit: number;
  communication: number;
  problem_solving: number;
  technical_ability: number;
  overall_score: number;
}

interface SummaryModalProps {
  open: boolean;
  onClose: () => void;
  summary: Summary | null;
}

const SummaryModal = ({ open, onClose, summary }: SummaryModalProps) => {
  if (!summary) return null;

  return (
    <Modal open={open} onClose={onClose}>
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
        <Typography variant="h6" gutterBottom>
          Full Summary
        </Typography>
        <Typography gutterBottom>{summary.summary}</Typography>

        <Box mt={2}>
          <Typography variant="subtitle2">Curiosity: {summary.curiosity}</Typography>
          <Typography variant="subtitle2">Experience: {summary.experience}</Typography>
          <Typography variant="subtitle2">Culture Fit: {summary.culture_fit}</Typography>
          <Typography variant="subtitle2">Communication: {summary.communication}</Typography>
          <Typography variant="subtitle2">Problem Solving: {summary.problem_solving}</Typography>
          <Typography variant="subtitle2">Technical Ability: {summary.technical_ability}</Typography>
          <Typography variant="subtitle2">Overall Score: {summary.overall_score}</Typography>
        </Box>
      </Box>
    </Modal>
  );
};

export default SummaryModal;
