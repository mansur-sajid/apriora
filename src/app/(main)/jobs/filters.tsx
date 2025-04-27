"use client";

import { Checkbox, Slider, FormControlLabel } from "@mui/material";

export default function Filters({ filters, setFilters, onReset, onApply }) {
  const handleJobTypeChange = (type) => {
    setFilters((prev) => ({
      ...prev,
      jobType: {
        ...prev.jobType,
        [type]: !prev.jobType[type],
      },
    }));
  };

  const handleSalaryChange = (event, newValue) => {
    setFilters((prev) => ({
      ...prev,
      salaryRange: newValue,
    }));
  };

  const handleAvailabilityChange = (type) => {
    setFilters((prev) => ({
      ...prev,
      availability: {
        ...prev.availability,
        [type]: !prev.availability[type],
      },
    }));
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
                    checked={filters.jobType[type]}
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

      {/* SALARY */}
      <div>
        <h3 className="uppercase font-semibold text-xs textcolor mb-2">
          Salary
        </h3>
        <Slider
          value={filters.salaryRange}
          onChange={handleSalaryChange}
          valueLabelDisplay="off"
          min={0}
          max={300}
          sx={{ color: "var(--icons)" }}
        />
        <div className="flex justify-between text-xs textcolor">
          <span>${filters.salaryRange[0].toLocaleString()}</span>
          <span>${filters.salaryRange[1].toLocaleString()}</span>
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
                    checked={filters.availability?.[key] || false}
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
          onClick={onReset}
          className="py-2 px-6 rounded-full border border-[var(--icons)] text-[var(--icons)] hover:bg-[var(--icons)] hover:text-white transition-all duration-200"
        >
          Reset
        </button>
      </div>
    </div>
  );
}
