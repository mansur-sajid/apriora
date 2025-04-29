"use client";

import {
  Checkbox,
  Slider,
  FormControlLabel,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
  TextField,
} from "@mui/material";
import { useState } from "react";

interface FiltersProps {
  cities: string[];
  onApplyFilters?: (filters: {
    jobType: typeof defaultJobType;
    availability: string[];
    salaryRange: number[];
    location: string;
  }) => void;
}

const defaultJobType = {
  contract: false,
  partTime: false,
  fullTime: false,
};

const defaultSalaryRange = [null, null] as [number | null, number | null];

export default function Filters({ cities, onApplyFilters }: FiltersProps) {
  const [jobType, setJobType] = useState(defaultJobType);
  const [selectedAvailability, setSelectedAvailability] = useState<string[]>(
    []
  );
  const [salaryRange, setSalaryRange] =
    useState<[number | null, number | null]>(defaultSalaryRange);

  const [location, setLocation] = useState("");

  const availabilityOptions = [
    { key: "immediate", label: "Immediate" },
    { key: "one_week_notice", label: "1 Week Notice" },
    { key: "two_weeks_notice", label: "2 Weeks Notice" },
    { key: "three_weeks_notice", label: "3 Weeks Notice" },
    { key: "four_weeks_notice", label: "4 Weeks Notice" },
  ];

  const handleSliderChange = (event: any, newValue: number | number[]) => {
    setSalaryRange([
      Array.isArray(newValue) ? newValue[0] : null,
      Array.isArray(newValue) ? newValue[1] : null,
    ]);
  };

  const handleLocationChange = (event: any) => {
    setLocation(event.target.value);
  };

  const handleAvailabilityChange = (key: string) => {
    setSelectedAvailability((prev) =>
      prev.includes(key) ? prev.filter((k) => k !== key) : [...prev, key]
    );
  };

  const handleReset = () => {
    setJobType(defaultJobType);
    setSelectedAvailability([]);
    setSalaryRange(defaultSalaryRange);
    setLocation("");
    onApplyFilters(null);
  };

  const handleApply = () => {
    if (onApplyFilters) {
      onApplyFilters({
        jobType,
        availability: selectedAvailability,
        salaryRange,
        location,
      });
    }
  };

  return (
    <div className="p-4 bg-white rounded-[20px] space-y-6 w-full text-sm h-full">
      {/* Filters header */}
      <div className="flex items-center justify-between">
        <h2 className="text-base font-semibold text-[var(--foreground)] uppercase tracking-wide">
          Filters
        </h2>
      </div>

      {/* Job Type */}
      <div>
        <h3 className="uppercase font-semibold text-xs textcolor mb-2">
          Job Type
        </h3>
        <div className="space-y-1">
          {Object.keys(defaultJobType).map((key) => (
            <div key={key} className="rounded px-1 py-1">
              <FormControlLabel
                control={
                  <Checkbox
                    checked={jobType[key as keyof typeof defaultJobType]}
                    onChange={() =>
                      setJobType({
                        ...jobType,
                        [key]: !jobType[key as keyof typeof jobType],
                      })
                    }
                    sx={{
                      color: "var(--icons)",
                      "&.Mui-checked": { color: "var(--icons)" },
                      borderRadius: "6px",
                    }}
                  />
                }
                label={
                  key === "contract"
                    ? "Contract"
                    : key === "partTime"
                      ? "Part-Time"
                      : "Full-Time"
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
          {availabilityOptions.map(({ key, label }) => (
            <div key={key} className="rounded px-1 py-1">
              <FormControlLabel
                control={
                  <Checkbox
                    checked={selectedAvailability.includes(key)}
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

      {/* Location Dropdown */}
      <div>
        <h3 className="uppercase font-semibold text-xs textcolor mb-2">
          Location
        </h3>
        <FormControl fullWidth size="small">
          <InputLabel id="location-label">Select Location</InputLabel>
          <Select
            labelId="location-label"
            value={location}
            label="Select Location"
            onChange={handleLocationChange}
          >
            {cities.map((city) => (
              <MenuItem key={city} value={city}>
                {city}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </div>

      {/* Apply and Reset Buttons */}
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
