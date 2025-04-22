// app/page.js or pages/index.js
"use client";
import { useState } from "react";
import Filters from "./filters";
import DetailsPanel from "./details";
import SearchIcon from "@mui/icons-material/Search";
import ApplyModal from "./ApplyModal";
import Jobs from "../jobstable";
import { useUnappliedJobsQuery } from "@apriora/titan/gql-client";
import { CircularProgress, Typography, Box } from "@mui/material";

import { useRef } from "react";

export default function JobBoardPage() {
  const { data: unappliedJobs, isLoading } = useUnappliedJobsQuery();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalPosition, setModalPosition] = useState({ top: 0, left: 0 });

  const [applicationDetails, setApplicationDetails] = useState({
    date: "",
    time: "",
  });
  const [selectedJob, setSelectedJob] = useState(null);
  const [detailsOpen, setDetailsOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("newest");
  const [filters, setFilters] = useState({
    jobType: {
      fullTime: true,
      partTime: false,
      contractual: false,
    },
    salaryRange: [0, 500],
  });

  const [arrowFlipped, setArrowFlipped] = useState(false);
  const selectRef = useRef(null);

  const [jobToApply, setJobToApply] = useState(null); // job clicked for modal

  const handleReset = () => {
    setFilters({
      jobType: {
        fullTime: true,
        partTime: false,
        contractual: false,
      },
      salaryRange: [0, 500],
    });
  };
  const handleApply = () => {
    console.log("Filters applied:", filters);
  };

  const handleChange = (e) => {
    setApplicationDetails({
      ...applicationDetails,
      [e.target.name]: e.target.value,
    });
  };

  const jobApply = () => {
    console.log("Applying to job with details:", applicationDetails);
    if (!jobToApply) return;
    
    setIsModalOpen(false);
    setJobToApply(null);
  };
  const handleSelectClick = () => {
    setArrowFlipped((prev) => !prev);
  };

  if (isLoading) {
    return (
      <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center" height="100vh">
        <CircularProgress />
        <Typography variant="body1" sx={{ mt: 2 }}>Fetching available jobs...</Typography>
      </Box>
    );
  }

  return (
    <div className="p-1 tab-jobs bg-[var(--background)]">
      <h1 className="text-2xl font-bold mb-1">Explore Jobs</h1>
      <div className="tab-jobs-main   pt-4">
        <div className="flex-[1]">
          {/* Controls */}
          <div className="flex items-center gap-4 mb-6 bottomline">
            <div className="pl-1">
              <h1 className="imp-text">Job Board</h1>
            </div>
            <div className="flex flex-row gap-2 ml-auto items-right">
              <div className="relative inline-block w-max">
                <select
                  ref={selectRef}
                  value={sort}
                  onChange={(e) => setSort(e.target.value)}
                  onClick={handleSelectClick}
                  className="appearance-none border px-2 py-1 pr-8 rounded-[15px] cursor-pointer"
                >
                  <option value="newest">newest</option>
                  <option value="oldest">oldest</option>
                </select>

                {/* Rotating Arrow */}
                <div className="pointer-events-none absolute right-2 top-1/2 -translate-y-1/2 z-10">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className={`w-4 h-4 text-gray-700 transition-transform  ${
                      arrowFlipped ? "rotate-180" : "rotate-0"
                    }`}
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </div>
              </div>

              <div className="relative flex items-center">
                <input
                  type="text"
                  placeholder="Type here..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="border py-1 rounded-[15px] w-full pl-4"
                />
                <SearchIcon
                  sx={{
                    fontSize: 18,
                    position: "absolute",
                    right: 10,
                    top: "50%",
                    transform: "translateY(-50%)",
                    color: "var(--foreground)",
                  }}
                />
              </div>
            </div>
          </div>

          {unappliedJobs ? (
            <Jobs
              title="Available Jobs"
              itemsPerPage={20}
              jobs={unappliedJobs.unappliedJobPosts}
            />
          ) : (
            <div className="flex items-center justify-center h-20">
              <p>No applied jobs found.</p>
            </div>
          )}
        </div>
        <div className="pt-17 flex-[0.2]">
          <Filters
            filters={filters}
            setFilters={setFilters}
            onReset={handleReset}
            onApply={handleApply}
          />
        </div>
      </div>

      <DetailsPanel
        open={detailsOpen}
        onClose={() => setDetailsOpen(false)}
        job={selectedJob}
      />
      <ApplyModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onApply={jobApply}
        applicationDetails={applicationDetails}
        handleChange={handleChange}
        position={modalPosition}
      />
    </div>
  );
}
