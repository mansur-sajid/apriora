"use client";

import { useState } from "react";
import ArrowBackIos from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIos from "@mui/icons-material/ArrowForwardIos";

import Filters from "../jobs/filters";
import KPI from "../kpi";
import Jobs from "../jobstable";
import InterviewCard from "../interviewcard";
import { useAppliedJobsQuery, useJobSeekerKpisQuery } from "@apriora/titan/gql-client";

export default function Home() {
  const [currentDate, setCurrentDate] = useState(new Date());

  const daysOfWeek = ["Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"];

  const getDaysInMonth = (year, month) => {
    return new Date(year, month + 1, 0).getDate();
  };

  const getStartDay = (year, month) => {
    const day = new Date(year, month, 1).getDay();
    return day === 0 ? 6 : day - 1;
  };

  const handlePrevMonth = () => {
    const prev = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth() - 1,
      1
    );
    setCurrentDate(prev);
  };

  const handleNextMonth = () => {
    const next = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth() + 1,
      1
    );
    setCurrentDate(next);
  };
  const { data: appliedJobs, isLoading: isl1 } = useAppliedJobsQuery();
  const { data: kpis, isLoading: isl2 } = useJobSeekerKpisQuery();

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();
  const daysInMonth = getDaysInMonth(year, month);
  const startDay = getStartDay(year, month);
  const jobsapplied = "+93";
  const interviewsattended = "+10";
  const Followups = "31";
  const Pending = "9";

  const totalCells = 42;
  const daysArray = Array.from({ length: totalCells }, (_, i) => {
    const day = i - startDay + 1;
    return day > 0 && day <= daysInMonth ? day : null;
  });


  
  

  return (
    <div className="dashboard-j archivo">
      {/* Right dashboard content */}
      <div className="flex flex-col flex-[1] gap-2 ">
        {/* Stats + Calendar */}
        <div className=" flex flex-[0.8] gap-5">
          <div className="flex flex-col gap-2">
            <div className=" flex flex-[1]   justify-between gap-5">
              {/* Job stats box */}
              <KPI
                title="Jobs Applied"
                value={kpis?.jobSeekerKpis?.jobsApplied}
                percentage={kpis?.jobSeekerKpis?.jobsAppliedChangePercent}
                direction={
                  kpis?.jobSeekerKpis?.jobsAppliedChangePercent > 0
                    ? 'up'
                    : kpis?.jobSeekerKpis?.jobsAppliedChangePercent < 0
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
                bgClass="blueshade"
                
              />
              {/* Job stats box */}
              <KPI
                title="Interviews Attended"
                value={kpis?.jobSeekerKpis?.interviewsAttended}
                percentage={kpis?.jobSeekerKpis?.interviewsAttendedChangePercent}
                direction={
                  kpis?.jobSeekerKpis?.interviewsAttendedChangePercent > 0
                    ? 'up'
                    : kpis?.jobSeekerKpis?.interviewsAttendedChangePercent < 0
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
            <div className=" flex flex-[1]   justify-between gap-5">
              {/* Job stats box */}
              <KPI
                title="FollowUps"
                value={kpis?.jobSeekerKpis?.followUps}
                percentage={kpis?.jobSeekerKpis?.followUpsChangePercent}
                direction={
                  kpis?.jobSeekerKpis?.followUpsChangePercent > 0
                    ? 'up'
                    : kpis?.jobSeekerKpis?.followUpsChangePercent < 0
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
              <KPI
                title="Pending Interviews"
                value={kpis?.jobSeekerKpis?.pendingInterviews}
                percentage={kpis?.jobSeekerKpis?.pendingInterviewsChangePercent}
                direction={
                  kpis?.jobSeekerKpis?.pendingInterviewsChangePercent > 0
                    ? 'up'
                    : kpis?.jobSeekerKpis?.pendingInterviewsChangePercent < 0
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
                bgClass="blueshade"
              />
            </div>
          </div>

          <div className="flex flex-col gap-3 w-full">
            {/* Calendar */}
            <div className="bg-white rounded-xl pl-10 pr-8 pt-10 pb-6 h-full flex flex-col">
              <div className="flex flex-row items-center justify-between">
                <p className="font-semibold mb-2">
                  {currentDate.toLocaleString("default", { month: "long" })}{" "}
                  {year}
                </p>
                <div className="flex space-x-2">
                  <button onClick={handlePrevMonth}>
                    <ArrowBackIos style={{ fontSize: "24px" }} />
                  </button>
                  <button onClick={handleNextMonth}>
                    <ArrowForwardIos style={{ fontSize: "24px" }} />
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-7 text-2sm pt-8 flex-grow">
                {daysOfWeek.map((day) => (
                  <div key={day} className="font-semibold pb-6">
                    {day}
                  </div>
                ))}
                {daysArray.map((day, i) => {
                  const today = day === 14 && month === 3 && year === 2025;
                  return (
                    <div
                      key={i}
                      className={`w-12 h-12 rounded-full flex justify-center items-center text-sm relative
        ${today ? "purpleshade font-bold text-black" : ""}`}
                    >
                      {day || ""}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
        <div className="w-full pt-2">
          <InterviewCard />
        </div>
        {/* Filtered Jobs List */}
        <div className="flex-[0.8] pt-5">
          {appliedJobs ? (
            <Jobs
              title="Applied Jobs"
              itemsPerPage={5}
              applied={true}
              jobs={appliedJobs.appliedJobPosts}
            />
          ) : (
            <div>Loading...</div>
          )}
        </div>
      </div>
      <div className="flex-[0.2]">
        <Filters />
      </div>
    </div>
  );
}
