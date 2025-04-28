"use client";

import { useState } from "react";
import KPI from "./kpi";
import Filters from "./Filters";
import CreateJobModal from "./CreateJobModal";
import { useJobsPostsQuery } from "@/libs/gql-client";
import { format, parseISO } from "date-fns";
import { useCreateJobPostMutation, useRecruiterKpisQuery } from "@/libs/gql-client";
import {
  Menu,
  MenuItem,
  IconButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";

export default function Home() {
  const [currentPage, setCurrentPage] = useState(1);
  const [filters, setFilters] = useState<{
    jobType: { contract: boolean; partTime: boolean; fullTime: boolean };
    availability: string[];
    salaryRange: [number | null, number | null];
    location: string;
  } | null>(null);
  
  const [isCreateJobModalOpen, setIsCreateJobModalOpen] = useState(false);
  const {mutateAsync: createJobPost} = useCreateJobPostMutation();

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const itemsPerPage = 5;


  function formatDate(datetime: string): string {
    return format(parseISO(datetime), "MMMM d, yyyy");
  }

  const handleMenuClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleCreateNewJob = () => {
    handleMenuClose();
    setIsCreateJobModalOpen(true);
  };
  
  // Add this function to handle form submission
  const handleJobSubmit = (jobData: any) => {
    // Here you would typically send the data to your API
    console.log("New job data:", jobData);
    // Add your API call here
  };

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

  const { data: jobsPosts, isLoading } = useJobsPostsQuery();
  const { data: kpis } = useRecruiterKpisQuery();

  const cities = Array.from(
    new Set(
      jobsPosts?.jobPosts
        .map((job) => job.city)
        .filter((city) => city && city.trim() !== '')
    )
  );

  const filteredJobs = jobsPosts?.jobPosts.filter((job) => {
    if (!filters) return true; // No filters applied
  
    // Job Type Filter
    const jobTypeMatch = 
      (!filters.jobType.contract && !filters.jobType.partTime && !filters.jobType.fullTime) || // No job type selected
      (filters.jobType.contract && job.employmentType === 'contract') ||
      (filters.jobType.partTime && job.employmentType === 'part_time') ||
      (filters.jobType.fullTime && job.employmentType === 'full_time');
  
    // Availability Filter
    const availabilityMatch = 
      filters.availability.length === 0 || 
      filters.availability.includes(job.availibility);
  
    // Salary Range Filter
    const minSalaryMatch = 
      filters.salaryRange[0] === null || 
      (job.salary !== null && job.salary >= filters.salaryRange[0]);
    const maxSalaryMatch = 
      filters.salaryRange[1] === null || 
      (job.salary !== null && job.salary <= filters.salaryRange[1]);
  
    // Location Filter
    const locationMatch = 
      !filters.location || 
      (job.city && job.city.toLowerCase() === filters.location.toLowerCase());
  
    return jobTypeMatch && availabilityMatch && minSalaryMatch && maxSalaryMatch && locationMatch;
  }) || [];
  
  

  const totalPages = isLoading ? 0 : Math.ceil(filteredJobs.length / itemsPerPage);

  const handleApplyFilters = (filtersData: {
    jobType: { contract: boolean; partTime: boolean; fullTime: boolean };
    availability: string[];
    salaryRange: [number | null, number | null];
    location: string;
  }) => {
    setFilters(filtersData);
  };
  
  return (
    <div className="tab-dashboard">
      <div className="flex flex-col flex-[0.8] gap-5">
        {/* stats box */}
        <div className=" flex  justify-between gap-5">
          {/* Job stats box */}
          <KPI
            title="Jobs Posted"
            value={kpis?.recruiterKpis?.jobsPosted}
            percentage={kpis?.recruiterKpis?.jobsPostedChangePercent}
            direction={
              kpis?.recruiterKpis?.interviewedChangePercent > 0
                ? 'up'
                : kpis?.recruiterKpis?.interviewedChangePercent < 0
                ? 'down'
                : 'neutral'
            }
            comparison="vs last week"
            icon={
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="lucide lucide-award w-6 h-6 text-gray-600"
              >
                <path d="m15.477 12.89 1.515 8.526a.5.5 0 0 1-.81.47l-3.58-2.687a1 1 0 0 0-1.197 0l-3.586 2.686a.5.5 0 0 1-.81-.469l1.514-8.526" />
                <circle cx="12" cy="8" r="6" />
              </svg>
            }
            bgClass="purpleshade"
          />
          <KPI
            title="Total Applicants"
            value={kpis?.recruiterKpis?.totalApplicants}
            percentage={kpis?.recruiterKpis?.totalApplicantsChangePercent}
            direction={
              kpis?.recruiterKpis?.totalApplicantsChangePercent > 0
                ? 'up'
                : kpis?.recruiterKpis?.totalApplicantsChangePercent < 0
                ? 'down'
                : 'neutral'
            }
            comparison="vs last week"
            icon={
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="lucide lucide-users w-6 h-6 text-gray-600"
              >
                <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                <circle cx="9" cy="7" r="4" />
                <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
                <path d="M16 3.13a4 4 0 0 1 0 7.75" />
              </svg>
            }
            bgClass="blueshade"
            
          />
          <KPI
            title="Interviewed"
            value={kpis?.recruiterKpis?.interviewed}
            percentage={kpis?.recruiterKpis?.interviewedChangePercent}
            direction={
              kpis?.recruiterKpis?.interviewedChangePercent > 0
                ? 'up'
                : kpis?.recruiterKpis?.interviewedChangePercent < 0
                ? 'down'
                : 'neutral'
            }
            comparison="vs last week"
            icon={
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="lucide lucide-message-circle w-6 h-6 text-gray-600"
              >
                <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.5 8.5 0 0 1 8 8v.5z" />
              </svg>
            }
            bgClass="pinkshade"
          />
        </div>

        {/*candidate table*/}
        <div className="bg-[#FFFFFF] w-full rounded-xl shadow-md">
          <div className="flex justify-between p-3">
            <h2 className="text-lg font-semibold">Posted Jobs</h2>
            <div>
              <IconButton
                aria-label="more"
                aria-controls="long-menu"
                aria-haspopup="true"
                onClick={handleMenuClick}
                className="p-1 hover:bg-gray-100 rounded-full"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 text-gray-500"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M10 3a1.5 1.5 0 110-3 1.5 1.5 0 010 3zm0 7a1.5 1.5 0 110-3 1.5 1.5 0 010 3zm0 7a1.5 1.5 0 110-3 1.5 1.5 0 010 3z" />
                </svg>
              </IconButton>
              <Menu
                id="basic-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleMenuClose}
                MenuListProps={{
                  "aria-labelledby": "basic-button",
                }}
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "right",
                }}
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
              >
                <MenuItem onClick={handleCreateNewJob}>
                  <ListItemIcon>
                    <AddCircleOutlineIcon fontSize="small" />
                  </ListItemIcon>
                  <ListItemText
                    primary="Create New Job Post"
                    primaryTypographyProps={{ style: { fontSize: "0.875rem" } }}
                  />
                </MenuItem>
              </Menu>
            </div>
          </div>

          <div className="overflow-x-auto">
            <div className="w-full overflow-x-auto border border-gray-200 shadow-sm max-w-full">
              {/* Set a fixed height and enable scrolling */}
              <div className="max-h-[400px] overflow-y-auto">
                <table className="w-full table-auto text-left text-sm min-w-[900px]">
                  <thead>
                    <tr className="purpleshade">
                      <th className="px-4 py-3 font-medium text-[#7e5ca0]">
                        Salary
                      </th>
                      <th className="px-4 py-3 font-medium text-[#7e5ca0]">
                        Position
                      </th>
                      <th className="px-4 py-3 font-medium text-[#7e5ca0]">
                      Client Name
                      </th>
                      <th className="px-4 py-3 font-medium text-[#7e5ca0]">
                        Availability
                      </th>
                      <th className="px-4 py-3 font-medium text-[#7e5ca0]">
                        Location
                      </th>
                      <th className="px-4 py-3 font-medium text-[#7e5ca0]">
                        Posted At
                      </th>
                      <th className="px-4 py-3 font-medium text-[#7e5ca0]">
                        Expires At
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-300">
                    {isLoading ? (
                      <tr>
                        <td colSpan={7} className="px-4 py-6 text-center">
                          <div className="flex justify-center">
                            {/* Loading spinner */}
                            <svg
                              className="animate-spin h-8 w-8 text-[#7e5ca0]"
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                            >
                              <circle
                                className="opacity-25"
                                cx="12"
                                cy="12"
                                r="10"
                                stroke="currentColor"
                                strokeWidth="4"
                              ></circle>
                              <path
                                className="opacity-75"
                                fill="currentColor"
                                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                              ></path>
                            </svg>
                          </div>
                        </td>
                      </tr>
                    ) : (
                      filteredJobs
                        .slice(
                          (currentPage - 1) * itemsPerPage,
                          currentPage * itemsPerPage
                        )
                        .map((job, index) => (
                          <tr
                            key={index}
                            className="hover:bg-white/40 transition"
                          >
                            <td className="px-4 py-3">${job.salary}</td>
                            <td className="px-4 py-3">{job.title}</td>
                            <td className="px-4 py-3">{job.department}</td>
                            <td className="px-4 py-3">
                              {availabilityLabels[job.availibility] ||
                                job.availibility}
                            </td>
                            <td className="px-4 py-3">
                              {`${workModeLabels[job.workMode] || job.workMode} - ${job.city}`}
                            </td>
                            <td className="px-4 py-3">
                              {formatDate(job.createdAt)}
                            </td>
                            <td className="px-4 py-3">
                              {formatDate(job.expiresAt)}
                            </td>
                          </tr>
                        ))
                    )}
                  </tbody>
                </table>
              </div>

              {/* Pagination Controls */}
              <div className="flex justify-end items-center gap-4 px-4 py-3">
                <button
                  onClick={() =>
                    setCurrentPage((prev) => Math.max(prev - 1, 1))
                  }
                  disabled={currentPage === 1}
                  className={`px-3 py-1 text-sm border rounded disabled:opacity-50 ${
                    currentPage === 1
                      ? "bg-gray-200 text-gray-500 cursor-not-allowed"
                      : "bg-[#7e5ca0] text-white hover:bg-[#6b4b8c]"
                  }`}
                >
                  Prev
                </button>
                <span className="text-sm text-gray-700">
                  Page {currentPage}
                </span>
                <button
                  onClick={() =>
                    setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                  }
                  disabled={currentPage === totalPages}
                  className={`px-3 py-1 text-sm border rounded disabled:opacity-50 ${
                    currentPage === totalPages
                      ? "bg-gray-200 text-gray-500 cursor-not-allowed"
                      : "bg-[#7e5ca0] text-white hover:bg-[#6b4b8c]"
                  }`}
                >
                  Next
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="flex-[0.3]">
      <Filters cities={cities} onApplyFilters={handleApplyFilters} />

      </div>
      <CreateJobModal
  open={isCreateJobModalOpen}
  onClose={() => setIsCreateJobModalOpen(false)}
  onSubmit={handleJobSubmit}
/>
    </div>
  );
}
