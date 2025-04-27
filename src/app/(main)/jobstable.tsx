"use client";

import React, { useState } from "react";
import DetailsPanel from "./jobs/details"; // Assuming your details component is inside jobs directory
import ApplyModal from "./jobs/ApplyModal";
import { useAppliedJobsQuery } from "@apriora/titan/gql-client";
import { format, parseISO } from "date-fns";
import { useQueryClient } from '@tanstack/react-query';
import { useCreateJobPostApplicationMutation } from "@apriora/titan/gql-client";

export default function JobTable({
  title = "Hiring Pipeline",
  itemsPerPage = 5,
  applied = false,
  jobs,
}) {
  const [currentPage, setCurrentPage] = useState(1);
  const queryClient = useQueryClient();
  const [selectedJob, setSelectedJob] = useState(null); // State to manage the selected job for details panel
  const [isDetailsOpen, setIsDetailsOpen] = useState(false); // State to manage the visibility of the details panel
  const { data: appliedJobs } = useAppliedJobsQuery();
  function formatDate(datetime: string): string {
    return format(parseISO(datetime), "MMMM d, yyyy");
  }
  function formatDateTime(datetime: string): string {
    return format(parseISO(datetime), "MMMM d, yyyy 'at' h:mm a");
    // Example output: April 21, 2025 at 9:30 AM
  }

  console.log("appliedJobs", appliedJobs);
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

  const {mutateAsync: createJobPostApplication} = useCreateJobPostApplicationMutation(
    {
      onSuccess: () => {
        queryClient.invalidateQueries({ 
          queryKey: ['UnappliedJobs'] 
        });

        queryClient.invalidateQueries({ 
          queryKey: ['AppliedJobs'] 
        });
        queryClient.invalidateQueries({ 
          queryKey: ['UpcomingInterview'] 
        });
       
      }
    }
  );

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalPosition, setModalPosition] = useState({ top: 0, left: 0 });
  const [applicationDetails, setApplicationDetails] = useState({
    date: "",
    time: "",
  });

  const handleApplyClick = (e, job) => {
    const rect = e.target.getBoundingClientRect();
    setModalPosition({ top: rect.bottom, left: rect.left + rect.width / 2 });
    setSelectedJob(job);
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    setApplicationDetails({ date: "", time: "" });
  };

  const handleChange = (e) => {
    setApplicationDetails({
      ...applicationDetails,
      [e.target.name]: e.target.value,
    });
  };

  const handleApply = () => {
    console.log("Applied for:", selectedJob);
    console.log("Details:", applicationDetails);
    const localDateTime = new Date(`${applicationDetails.date}T${applicationDetails.time}`);
    
    // Convert to ISO string (automatically converts to UTC)
    const interviewDateTime = localDateTime.toISOString();

    try {
      createJobPostApplication({
          data: {
            jobPostId: selectedJob.id,
            interviewDate: interviewDateTime,
        }
      });
      handleModalClose();
    } catch (error) {
      console.error("Error applying for job:", error);
      // You might want to add error handling here
    }
  };

  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedJobs = jobs.slice(startIndex, startIndex + itemsPerPage);
  const totalPages = Math.ceil(jobs.length / itemsPerPage);

  const handleDetailsClick = (job) => {
    setSelectedJob(job); // Set selected job data
    setIsDetailsOpen(true); // Open the details panel
  };

  return (
    <div className="bg-white w-full rounded-xl shadow-md">
      <div className="flex justify-between p-3">
        <h2 className="text-lg font-semibold">{title}</h2>
        <button className="p-1 hover:bg-gray-100 rounded-full">
          {/* Three dots vertical (kebab menu) */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 text-gray-500"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path d="M10 3a1.5 1.5 0 110-3 1.5 1.5 0 010 3zm0 7a1.5 1.5 0 110-3 1.5 1.5 0 010 3zm0 7a1.5 1.5 0 110-3 1.5 1.5 0 010 3z" />
          </svg>
        </button>
      </div>

      <div className="overflow-x-auto border border-gray-200 shadow-sm max-w-full">
        <table className="w-full table-auto text-left text-sm min-w-[900px]">
          <thead>
            <tr className="purpleshade">
              <th className="px-4 py-3 font-medium text-[#7e5ca0]">Salary</th>
              <th className="px-4 py-3 font-medium text-[#7e5ca0]">Position</th>
              <th className="px-4 py-3 font-medium text-[#7e5ca0]">
                Department
              </th>
              <th className="px-4 py-3 font-medium text-[#7e5ca0]">
                Availability
              </th>
              <th className="px-4 py-3 font-medium text-[#7e5ca0]">Location</th>
              {
                applied ? (<>
                  <th className="px-4 py-3 font-medium text-[#7e5ca0] whitespace-nowrap">
                Interview Scheduled At
              </th>
              </>) : (<>
                <th className="px-4 py-3 font-medium text-[#7e5ca0] whitespace-nowrap">
                Posted At
              </th>
              <th className="px-4 py-3 font-medium text-[#7e5ca0] whitespace-nowrap">
                Expires At
              </th></>)
              }
              <th className="px-4 py-3 font-medium text-[#7e5ca0]"></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-300">
            {paginatedJobs.map((job, index) => (
              <tr key={index} className="hover:bg-white/40 transition">
                <td className="px-4 py-3">${applied ? job.jobPost.salary : job.salary}</td>
                <td className="px-4 py-3">{applied ? job.jobPost.title : job.title}</td>
                <td className="px-4 py-3">{applied ? job.jobPost.department: job.department}</td>
                <td className="px-4 py-3">
                  {availabilityLabels[ applied ?  job.jobPost.availibility : job.availibility]}
                </td>
                <td className="px-4 py-3">
                  {`${workModeLabels[ applied ? job.jobPost.workMode : job.workMode ]} - ${ applied ? job.jobPost.city : job.city }`}
                </td>

                {applied ? (
                  <td className="px-4 py-3">
                    {job.interview
                      ? formatDateTime(job.interview.scheduledAt)
                      : "Not Scheduled"}
                  </td>
                ) : (
                  <>
                    <td className="px-4 py-3">
                      {formatDate(applied ? job.jobPost.createdAt : job.createdAt)}
                    </td>
                    <td className="px-4 py-3">
                      {formatDate( applied ? job.jobPost.expiresAt : job.expiresAt)}
                    </td>
                  </>
                )}
                <td className="px-4 py-3">
                  <div className="flex gap-5">
                    <div
                      className="custom-button border-1px border-[#7e5ca0] p-2 rounded cursor-pointer"
                      onClick={() => handleDetailsClick(job)}
                    >
                      Details
                    </div>
                    {applied ? (
                      <></>
                    ) : (
                      <button
                        onClick={(e) => handleApplyClick(e, job)}
                        className="custom-button border px-4 py-1 font-semibold rounded-[15px] hover:bg-[var(--foreground)] hover:text-white w-full inline-block text-center justify-center"
                      >
                        Apply
                      </button>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="flex justify-end items-center gap-3 px-4 py-2 mt-2">
        <button
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
          className="px-3 py-1 text-sm border rounded bg-[#7e5ca0] text-white hover:bg-[#6b4b8c] disabled:opacity-50"
        >
          Prev
        </button>

        <span className="text-sm text-gray-700">Page {currentPage}</span>
        <button
          onClick={() => setCurrentPage((prev) => prev + 1)}
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

      <DetailsPanel
        open={isDetailsOpen}
        onClose={() => setIsDetailsOpen(false)}
        job={applied ? selectedJob?.jobPost : selectedJob}
      />

      <ApplyModal
        isOpen={isModalOpen}
        onClose={handleModalClose}
        onApply={handleApply}
        handleChange={handleChange}
        applicationDetails={applicationDetails}
      />
    </div>
  );
}
