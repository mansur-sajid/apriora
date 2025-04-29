"use client";
import React from "react";
import { useEffect, useState } from "react";
import { formatDistanceToNow } from "date-fns";

import { Drawer, Box, Typography, IconButton, Divider } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowForwardIos";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import WorkIcon from "@mui/icons-material/Work";
import ScheduleIcon from "@mui/icons-material/Schedule";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import BusinessIcon from "@mui/icons-material/Business";

export default function DetailsPanel({ open, onClose, job, applied = false }) {
  const [visible, setVisible] = useState(false);
  const workModeLabels: Record<string, string> = {
    on_site: "On Site",
    remote: "Remote",
    hybrid: "Hybrid",
  };

  const availabilityLabels: Record<string, string> = {
    immediate: "Immediate",
    two_weeks_notice: "2 weeks notice",
    three_weeks_notice: "3 weeks notice",
    four_weeks_notice: "4 weeks notice",
  };

  const typeLabels: Record<string, string> = {
    full_time: "Full Time",
    part_time: "Part Time",
    contract: "Contract",
  };

  useEffect(() => {
    if (open) {
      setTimeout(() => {
        setVisible(true);
      }, 10);
    } else {
      setVisible(false);
    }
  }, [open]);
  if (!job) return null;

  return (
    <Drawer
      anchor="right"
      open={visible}
      onClose={onClose}
      hideBackdrop={false}
      sx={{
        zIndex: 100000,
      }}
      PaperProps={{
        sx: {
          width: 800,
          backgroundColor: "#ffffff",
          padding: 2,
          borderTopLeftRadius: "16px",
          borderBottomLeftRadius: "16px",
          overflow: "visible",
          boxShadow: "0px 0px 20px rgba(0, 0, 0, 0.1)",
          zIndex: 100000,
        },
      }}
    >
      {/* Slide-out tab with back arrow */}
      <Box
        sx={{
          position: "absolute",
          top: 100,
          left: 0,
          transform: "translateX(-50%)",
          width: 60,
          height: 90,
          backgroundColor: "#ffffff",
          borderTopLeftRadius: "10px",
          borderBottomLeftRadius: "10px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          zIndex: 0,
          boxShadow: "-5px 0px 10px rgba(0, 0, 0, 0.05)",
        }}
      >
        <IconButton
          onClick={onClose}
          size="small"
          sx={{
            color: "#555",
            paddingRight: 3,
            zIndex: 1,
            "&:hover": {
              backgroundColor: "transparent",
              color: "#000",
            },
          }}
        >
          <ArrowBackIcon />
        </IconButton>
      </Box>

      {/* Main Content */}
      <Box className="pl-8 pt-8 pr-8 flex flex-col gap-6 w-full overflow-y-scroll">
        {/* Header Section */}
        <Box className="flex w-full items-start justify-between">
          <Box className="flex gap-4">
            <img
              src="/icon.png"
              alt="Company Logo"
              className="h-20 w-20 rounded-lg object-contain border border-gray-200"
            />
            <Box>
              <Typography variant="h5" fontWeight="bold" color="text.primary">
                {job.title}
              </Typography>
              <Typography color="#7e5ca0">
                {job.company.name || "Nomad"}
              </Typography>

              <Box className="flex items-center mt-1">
                <AccessTimeIcon
                  sx={{ fontSize: 16, mr: 1, color: "text.secondary" }}
                />
                <Typography variant="body2" color="text.secondary">
                  Updated{" "}
                  {formatDistanceToNow(new Date(job.updatedAt), {
                    addSuffix: true,
                  })}
                </Typography>
              </Box>
            </Box>
          </Box>
        </Box>

        <Divider sx={{ my: 1 }} />

        {/* Meta Details */}
        <Box className="grid grid-cols-2 gap-4 p-4 bg-gray-50 rounded-lg">
          <Box className="flex items-center gap-2">
            <LocationOnIcon className="text-[#636363]" />
            <Box>
              <Typography variant="caption" color="text.secondary">
                Location
              </Typography>
              <Typography variant="body2">{job.city}</Typography>
            </Box>
          </Box>

          <Box className="flex items-center gap-2">
            <WorkIcon className="text-[#636363]" />
            <Box>
              <Typography variant="caption" color="text.secondary">
                Work Mode
              </Typography>
              <Typography variant="body2">
                {workModeLabels[job.workMode]}
              </Typography>
            </Box>
          </Box>

          <Box className="flex items-center gap-2">
            <ScheduleIcon className="text-[#636363]" />
            <Box>
              <Typography variant="caption" color="text.secondary">
                Employment Type
              </Typography>
              <Typography variant="body2">
                {typeLabels[job.employmentType]}
              </Typography>
            </Box>
          </Box>

          <Box className="flex items-center gap-2">
            <AccessTimeIcon className="text-[#636363]" />
            <Box>
              <Typography variant="caption" color="text.secondary">
                Availability
              </Typography>
              <Typography variant="body2">
                {availabilityLabels[job.availibility]}
              </Typography>
            </Box>
          </Box>

          <Box className="flex items-center gap-2">
            <AttachMoneyIcon className="text-[#636363]" />
            <Box>
              <Typography variant="caption" color="text.secondary">
                Salary
              </Typography>
              <Typography variant="body2">${job.minSalary} - ${job.maxSalary}</Typography>
            </Box>
          </Box>

          <Box className="flex items-center gap-2">
            <BusinessIcon className="text-[#636363]" />
            <Box>
              <Typography variant="caption" color="text.secondary">
                Client
              </Typography>
              <Typography variant="body2">{job.department}</Typography>
            </Box>
          </Box>
        </Box>

        {/* Job Description */}
        <Box className="mt-4">
          <Typography variant="h6" fontWeight="bold" gutterBottom>
            Job Description
          </Typography>
          <Box
            sx={{
              "& h1": { fontSize: "2em", margin: "0.67em 0" },
              "& h2": { fontSize: "1.5em", margin: "0.75em 0" },
              "& h3": { fontSize: "1.17em", margin: "0.83em 0" },
              "& p": { margin: "0 0" },
              // Unordered lists - bullet points
              "& ul": {
                listStyleType: "disc", // This gives you bullet points
                paddingLeft: "2.5em",
                margin: "1em 0",
                "& li": {
                  display: "list-item",
                  paddingLeft: "0.5em",
                  // Explicitly set no numbering for ul items
                  '&[data-list="ordered"]': {
                    listStyleType: "none", // Hide numbers if they appear in ul
                  },
                },
              },
              // Ordered lists - numbers
              "& ol": {
                listStyleType: "decimal", // This gives you numbers
                paddingLeft: "2.5em",
                margin: "1em 0",
                "& li": {
                  display: "list-item",
                  paddingLeft: "0.5em",
                  // Explicitly set no bullets for ol items
                  '&[data-list="bullet"]': {
                    listStyleType: "none", // Hide bullets if they appear in ol
                  },
                },
              },
              "& strong": { fontWeight: "bold" },
              "& em": { fontStyle: "italic" },
              "& u": { textDecoration: "underline" },
              "& a": {
                color: "primary.main",
                textDecoration: "underline",
                "&:hover": { textDecoration: "none" },
              },
              "& blockquote": {
                borderLeft: "4px solid #ccc",
                margin: "1em 0",
                paddingLeft: "1em",
                color: "#666",
              },
              "& .ql-ui": { display: "none" },
              // Additional safeguard for list items
              '& li[data-list="bullet"]': {
                listStyleType: "disc !important",
              },
              '& li[data-list="ordered"]': {
                listStyleType: "decimal !important",
              },
            }}
            dangerouslySetInnerHTML={{
              __html: 
                job.description || "<p>No job description provided.</p>"
              
            }}
          />
        </Box>
      </Box>
    </Drawer>
  );
}
