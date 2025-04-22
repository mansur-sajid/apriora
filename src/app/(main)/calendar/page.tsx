"use client";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import React, { useState } from "react";
import { startOfMonth, endOfMonth, startOfWeek, endOfWeek, addDays, addMonths, subMonths, format, isSameMonth, isSameDay } from "date-fns";
import Popup from "./interview"; // Import the Popup component

const daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

// Dates with interviews (format: yyyy-mm-dd)
const interviewDates = ["2025-04-21", "2025-04-24", "2025-05-03", format(new Date(), "yyyy-MM-dd")]; // Include today's date dynamically

export default function CalendarGrid() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [showPopup, setShowPopup] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);

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
    if (interviewDates.includes(dateString)) {
      setSelectedDate(date); // Store the clicked date
      setShowPopup(true); // Show the popup
    }
  };

  const closePopup = () => {
    setShowPopup(false); // Close the popup
    setSelectedDate(null);
  };

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
            const isInterview = interviewDates.includes(format(date, "yyyy-MM-dd"));
            const isToday = isSameDay(date, new Date());
            const dayOfWeek = date.getDay(); // 0 = Sunday, 6 = Saturday
            const isWeekend = dayOfWeek === 0 || dayOfWeek === 6;

            return (
              <div
                key={idx}
                className={`h-24 flex justify-center items-center rounded-lg text-sm cursor-pointer ${
                  isInterview && isToday
                    ? "bg-[var(--pinkshade)] hover:bg-[var(--purpleshade)]" // Both interview and today -> purple
                    : isInterview
                    ? "bg-[var(--blueshade)] hover:bg-[var(--purpleshade)]" // Interview only -> blue
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

        {/* Render Popup if it's open */}
        {showPopup && selectedDate && (
          <Popup selectedDate={selectedDate} closePopup={closePopup} />
        )}
      </div>
    </div>
  );
}
