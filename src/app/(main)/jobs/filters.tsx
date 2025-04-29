"use client";

import { Checkbox, Slider, FormControlLabel, TextField } from "@mui/material";
import { useState } from "react";

export default function Filters({ filters, setFilters, onReset, onApply }) {
  const defaultFilters = {
    jobType: {
      fullTime: false,
      partTime: false,
      contractual: false,
    },
    salaryRange: [null, null],
    availability: {
      immediate: false,
      one_week_notice: false,
      two_weeks_notice: false,
      three_weeks_notice: false,
      four_weeks_notice: false,
    },
  };

  const [localFilters, setLocalFilters] = useState(filters);

  const handleJobTypeChange = (type) => {
    setLocalFilters((prev) => ({
      ...prev,
      jobType: {
        ...prev.jobType,
        [type]: !prev.jobType[type],
      },
    }));
  };

  const handleSalaryFromChange = (event) => {
    const value = event.target.value ? parseInt(event.target.value) : null;
    setLocalFilters((prev) => ({
      ...prev,
      salaryRange: [value, prev.salaryRange[1]],
    }));
  };

  const handleSalaryToChange = (event) => {
    const value = event.target.value ? parseInt(event.target.value) : null;
    setLocalFilters((prev) => ({
      ...prev,
      salaryRange: [prev.salaryRange[0], value],
    }));
  };

  const handleAvailabilityChange = (type) => {
    setLocalFilters((prev) => ({
      ...prev,
      availability: {
        ...prev.availability,
        [type]: !prev.availability[type],
      },
    }));
  };

  const handleApply = () => {
    setFilters(localFilters);
    if (onApply) onApply();
  };

  const handleReset = () => {
    setLocalFilters(defaultFilters);
    if (onReset) onReset();
  };

  return (
    <div className="p-4 bg-white rounded-[20px] space-y-6 w-full text-sm h-full flex flex-col">
      <div className="flex items-center justify-between">
        <h2 className="text-base font-semibold text-[var(--foreground)] uppercase tracking-wide">
          Filters
        </h2>
      </div>

      {/* JOB TYPE */}
      <div>
        <h3 className="uppercase font-semibold text-xs textcolor mb-2">
          Job Type
        </h3>
        <div className="space-y-1">
          {["fullTime", "partTime", "contractual"].map((type) => (
            <div key={type} className="rounded px-1 py-1">
              <FormControlLabel
                control={
                  <Checkbox
                    checked={localFilters.jobType[type]}
                    onChange={() => handleJobTypeChange(type)}
                    sx={{
                      color: "var(--icons)",
                      "&.Mui-checked": { color: "var(--icons)" },
                      borderRadius: "6px",
                    }}
                  />
                }
                label={
                  type === "fullTime"
                    ? "Full-Time"
                    : type === "partTime"
                      ? "Part-Time"
                      : "Contractual"
                }
              />
            </div>
          ))}
        </div>
      </div>

      {/* AVAILABILITY */}
      <div>
        <h3 className="uppercase font-semibold text-xs textcolor mb-2">
          Availability
        </h3>
        <div className="space-y-1">
          {[
            { key: "immediate", label: "Immediate" },
            { key: "one_week_notice", label: "1 Week Notice" },
            { key: "two_weeks_notice", label: "2 Weeks Notice" },
            { key: "three_weeks_notice", label: "3 Weeks Notice" },
            { key: "four_weeks_notice", label: "4 Weeks Notice" },
          ].map(({ key, label }) => (
            <div key={key} className="rounded px-1 py-1">
              <FormControlLabel
                control={
                  <Checkbox
                    checked={localFilters.availability?.[key] || false}
                    onChange={() => handleAvailabilityChange(key)}
                    sx={{
                      color: "var(--icons)",
                      "&.Mui-checked": { color: "var(--icons)" },
                      borderRadius: "6px",
                    }}
                  />
                }
                label={label}
              />
            </div>
          ))}
        </div>
      </div>

      <div className="flex-grow"></div>

      <div className="flex justify-center gap-4 pt-4">
        <button
          onClick={handleReset}
          className="py-2 px-6 rounded-full border border-[var(--icons)] text-[var(--icons)] hover:bg-[var(--icons)] hover:text-white transition-all duration-200"
        >
          Reset
        </button>
        <button
          onClick={handleApply}
          className="py-2 px-6 rounded-full bg-[var(--icons)] text-white border border-transparent hover:bg-white hover:text-[var(--icons)] hover:border-[var(--icons)] transition-all duration-200"
        >
          Apply
        </button>
      </div>
    </div>
  );
}
