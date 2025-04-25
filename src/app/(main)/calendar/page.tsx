"use client";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import React, { useState } from "react";
import { startOfMonth, endOfMonth, startOfWeek, endOfWeek, addDays, addMonths, subMonths, format, isSameMonth, isSameDay, parseISO } from "date-fns";
import Popup from "./interview";
import { useAppliedJobsQuery } from "@/libs/gql-client";
import { useRole } from "../RoleContext";


const daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

export default function CalendarGrid() {
  const { data: appliedJobPosts, isLoading } = useAppliedJobsQuery();
  const { role } = useRole();
  const [currentDate, setCurrentDate] = useState(new Date());
  const [showPopup, setShowPopup] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);
  const [interviewsForSelectedDate, setInterviewsForSelectedDate] = useState([]);
  

  // Extract interview dates from the data
  const interviewDates = appliedJobPosts?.appliedJobPosts.map(job => {
    const interviewDate = job.interview?.scheduledAt;
    return interviewDate ? format(parseISO(interviewDate), "yyyy-MM-dd") : null;
  }).filter(date => date);

  const monthStart = startOfMonth(currentDate);
  const monthEnd = endOfMonth(monthStart);
  const startDate = startOfWeek(monthStart);
  const endDate = endOfWeek(monthEnd);

  const generateCalendar = () => {
    const rows = [];
    let day = startDate;

    while (day <= endDate) {
      const week = [];
      for (let i = 0; i < 7; i++) {
        week.push(day);
        day = addDays(day, 1);
      }
      rows.push(week);
    }

    return rows;
  };

  const calendarRows = generateCalendar();

  const handleDateClick = (date) => {
    const dateString = format(date, "yyyy-MM-dd");
    
    // Find all interviews for this date
    const interviewsOnDate = appliedJobPosts.appliedJobPosts.filter(job => {
      if (!job.interview?.scheduledAt) return false;
      const interviewDate = format(parseISO(job.interview.scheduledAt), "yyyy-MM-dd");
      return interviewDate === dateString;
    });

    if (interviewsOnDate.length > 0) {
      setSelectedDate(date);
      setInterviewsForSelectedDate(interviewsOnDate);
      setShowPopup(true);
    }
  };

  const closePopup = () => {
    setShowPopup(false);
    setSelectedDate(null);
    setInterviewsForSelectedDate([]);
  };

  

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-full">
        <div className="text-xl">Loading...</div>
      </div>
    );
  }

  return (
    <div className="overflow-hidden pt-2 relative">
      <div className="w-full pr-2 mx-auto bg-white rounded-xl p-6">
        <div className="flex justify-between items-center mb-6">
          <button
            onClick={() => setCurrentDate(subMonths(currentDate, 1))}
            className="p-2 hover:bg-gray-300"
          >
            <ArrowBackIosIcon fontSize="small" />
          </button>
          <h1 className="text-2xl font-bold">
            {format(currentDate, "MMMM yyyy")}
          </h1>
          <button
            onClick={() => setCurrentDate(addMonths(currentDate, 1))}
            className="p-2 hover:bg-gray-300"
          >
            <ArrowForwardIosIcon fontSize="small" />
          </button>
        </div>

        <div className="grid grid-cols-7 text-center font-semibold text-black mb-2">
          {daysOfWeek.map((day) => (
            <div key={day} className="py-2">{day}</div>
          ))}
        </div>

        <div className="grid grid-cols-7 gap-2">
          {calendarRows.flat().map((date, idx) => {
            const dateString = format(date, "yyyy-MM-dd");
            const isInterview = interviewDates.includes(dateString);
            const isToday = isSameDay(date, new Date());
            const dayOfWeek = date.getDay();
            const isWeekend = dayOfWeek === 0 || dayOfWeek === 6;

            return (
              <div
                key={idx}
                className={`h-24 flex justify-center items-center rounded-lg text-sm cursor-pointer ${
                  isInterview && isToday
                    ? "bg-[var(--pinkshade)] hover:bg-[var(--purpleshade)]"
                    : isInterview
                    ? "bg-[var(--blueshade)] hover:bg-[var(--purpleshade)]"
                    : isSameMonth(date, currentDate)
                    ? `${isWeekend ? "bg-transparent text-gray-500" : "bg-transparent text-black"} hover:bg-transparent`
                    : ""
                }`}
                onClick={() => handleDateClick(date)}
              >
                <div className="text-xl font-semibold">{format(date, "d")}</div>
              </div>
            );
          })}
        </div>

        {showPopup && selectedDate && (
          <Popup 
            selectedDate={selectedDate} 
            closePopup={closePopup} 
            interviews={interviewsForSelectedDate}
          />
        )}
      </div>
      
    </div>
  );
}