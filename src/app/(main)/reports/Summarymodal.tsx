"use client";
import {
  Box,
  Typography,
  Modal,
  CircularProgress,
  Stack,
  Divider,
  IconButton,
} from "@mui/material";
import { PlayCircleOutline } from "@mui/icons-material";
import { useEffect, useState } from "react";
import { fromGlobalId } from "@/libs/gql-client";

// Easing function for smooth animation
const easeInOutQuad = (t: number) => {
  return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
};

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
  jobTitle?: string;
  userName?: string;
  interviewDate?: string;
  interviewId?: string;
}

const SummaryModal = ({
  open,
  onClose,
  summary,
  jobTitle,
  userName,
  interviewDate,
  interviewId,
}: SummaryModalProps) => {
  const [animatedValues, setAnimatedValues] = useState({
    curiosity: 0,
    experience: 0,
    culture_fit: 0,
    communication: 0,
    problem_solving: 0,
    technical_ability: 0,
    overall_score: 0,
  });

  useEffect(() => {
    if (!open) {
      // Reset animation when modal closes
      setAnimatedValues({
        curiosity: 0,
        experience: 0,
        culture_fit: 0,
        communication: 0,
        problem_solving: 0,
        technical_ability: 0,
        overall_score: 0,
      });
      return;
    }

    // Start animation when modal opens
    const duration = 1000; // Animation duration in ms
    const startTime = Date.now();

    const animate = () => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const easedProgress = easeInOutQuad(progress); // Apply easing function

      setAnimatedValues({
        curiosity: Math.floor(easedProgress * summary.curiosity * 10),
        experience: Math.floor(easedProgress * summary.experience * 10),
        culture_fit: Math.floor(easedProgress * summary.culture_fit * 10),
        communication: Math.floor(easedProgress * summary.communication * 10),
        problem_solving: Math.floor(
          easedProgress * summary.problem_solving * 10
        ),
        technical_ability: Math.floor(
          easedProgress * summary.technical_ability * 10
        ),
        overall_score: Math.floor(easedProgress * summary.overall_score * 10),
      });

      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };

    const animationFrame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationFrame);
  }, [open, summary]);

  const getProgressColor = (score: number) => {
    if (score <= 3) return "#ff3d47"; // red
    if (score <= 7) return "#ff9100"; // orange
    return "#4caf50"; // green
  };

  const formatDate = (dateString?: string) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <Modal open={open} onClose={onClose}>
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 1200,
          bgcolor: "background.paper",
          boxShadow: 24,
          p: 3,
          borderRadius: 2,
        }}
      >
        {/* Username at the top */}
        <Typography
          variant="h6"
          gutterBottom
          sx={{ fontWeight: "bold", mb: 2, textAlign: "center" }}
        >
          {userName}
        </Typography>

        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            gap: 3,
          }}
        >
          {/* Left Section: Video Placeholder (65%) */}
          <Box
            sx={{
              width: "68%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              bgcolor: "#f5f5f5",
              borderRadius: 1,
              position: "relative",
              minHeight: 400,
              overflow: "hidden",
            }}
          >
            {interviewId ? (
              <video
                controls
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                }}
              >
                <source
                  src={`https://naxiora-interviews.s3.amazonaws.com/${fromGlobalId(interviewId)}.webm`}
                  type="video/webm"
                />
                Your browser does not support the video tag.
              </video>
            ) : (
              <>
                <IconButton sx={{ fontSize: 60, color: "#555" }}>
                  <PlayCircleOutline fontSize="inherit" />
                </IconButton>
                <Typography
                  variant="caption"
                  sx={{
                    position: "absolute",
                    bottom: 8,
                    left: 8,
                    color: "#777",
                  }}
                >
                  Interview Recording
                </Typography>
              </>
            )}
          </Box>

          {/* Right Section: Summary & Scores (35%) */}
          <Box
            sx={{
              width: "32%",
              overflow: "hidden",
              display: "flex",
              flexDirection: "column",
            }}
          >
            <Box sx={{ mb: 2 }}>
              <Typography variant="body2" color="text.secondary">
                Position: {jobTitle}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Interview Date: {formatDate(interviewDate)}
              </Typography>
            </Box>

            <Divider sx={{ my: 1 }} />

            <Typography
              variant="body1"
              gutterBottom
              sx={{ mb: 2, maxHeight: 120, overflow: "auto" }}
            >
              {summary.summary}
            </Typography>

            {/* Overall Score - Centered at the top */}
            <Box sx={{ display: "flex", justifyContent: "center", mb: 3 }}>
              <Stack direction="column" alignItems="center" spacing={1}>
                <Typography variant="body2">Overall Score</Typography>
                <Box position="relative" display="inline-flex">
                  <CircularProgress
                    variant="determinate"
                    value={100}
                    size={50}
                    thickness={5}
                    sx={{
                      position: "absolute",
                      color: "#e0e0e0",
                      "& .MuiCircularProgress-circle": {
                        strokeLinecap: "round",
                      },
                    }}
                  />
                  <CircularProgress
                    variant="determinate"
                    value={animatedValues.overall_score}
                    size={50}
                    thickness={5}
                    sx={{
                      color: getProgressColor(summary.overall_score),
                      "& .MuiCircularProgress-circle": {
                        strokeLinecap: "round",
                      },
                      zIndex: 1,
                      transition: "none",
                    }}
                  />
                  <Box
                    sx={{
                      top: 0,
                      left: 0,
                      bottom: 0,
                      right: 0,
                      position: "absolute",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <Typography
                      variant="h6"
                      component="div"
                      color="text.secondary"
                    >
                      {Math.floor(animatedValues.overall_score / 10)}
                    </Typography>
                  </Box>
                </Box>
              </Stack>
            </Box>

            {/* Other 6 criteria in 2 columns */}
            <Box
              sx={{
                display: "grid",
                gridTemplateColumns: "repeat(2, 1fr)",
                gap: 2,
                overflow: "auto",
                pr: 1,
              }}
            >
              {[
                {
                  label: "Curiosity",
                  value: summary.curiosity,
                  animatedValue: animatedValues.curiosity,
                },
                {
                  label: "Experience",
                  value: summary.experience,
                  animatedValue: animatedValues.experience,
                },
                {
                  label: "Culture Fit",
                  value: summary.culture_fit,
                  animatedValue: animatedValues.culture_fit,
                },
                {
                  label: "Communication",
                  value: summary.communication,
                  animatedValue: animatedValues.communication,
                },
                {
                  label: "Problem Solving",
                  value: summary.problem_solving,
                  animatedValue: animatedValues.problem_solving,
                },
                {
                  label: "Technical Ability",
                  value: summary.technical_ability,
                  animatedValue: animatedValues.technical_ability,
                },
              ].map((item) => (
                <Stack
                  key={item.label}
                  direction="row"
                  alignItems="center"
                  spacing={2}
                >
                  <Box position="relative" display="inline-flex">
                    <CircularProgress
                      variant="determinate"
                      value={100}
                      size={40}
                      thickness={5}
                      sx={{
                        position: "absolute",
                        color: "#e0e0e0",
                        "& .MuiCircularProgress-circle": {
                          strokeLinecap: "round",
                        },
                      }}
                    />
                    <CircularProgress
                      variant="determinate"
                      value={item.animatedValue}
                      size={40}
                      thickness={5}
                      sx={{
                        color: getProgressColor(item.value),
                        "& .MuiCircularProgress-circle": {
                          strokeLinecap: "round",
                        },
                        zIndex: 1,
                        transition: "none",
                      }}
                    />
                    <Box
                      sx={{
                        top: 0,
                        left: 0,
                        bottom: 0,
                        right: 0,
                        position: "absolute",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <Typography
                        variant="caption"
                        component="div"
                        color="text.secondary"
                      >
                        {Math.floor(item.animatedValue / 10)}
                      </Typography>
                    </Box>
                  </Box>
                  <Typography variant="body2">{item.label}</Typography>
                </Stack>
              ))}
            </Box>

            <Box sx={{ mt: 3, textAlign: "center" }}>
              <Typography
                variant="h6"
                color={getProgressColor(summary.overall_score)}
              >
                {summary.overall_score <= 3 ? "Not Recommended" : "Recommended"}
              </Typography>
            </Box>
          </Box>
        </Box>
      </Box>
    </Modal>
  );
};

export default SummaryModal;
