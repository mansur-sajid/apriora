'use client';

import { Checkbox, Slider, FormControlLabel, MenuItem, Select, InputLabel, FormControl } from '@mui/material';
import { useState } from 'react';

export default function Filter() {
  const [jobType, setJobType] = useState({
    contract: true,
    partTime: true,
    fullTime: true,
  });

  const [availability, setAvailability] = useState({
    hired: false,
    open: true,
  });

  const [salaryRange, setSalaryRange] = useState([60000, 200000]);
  const [location, setLocation] = useState('');

  const handleSliderChange = (event, newValue) => {
    setSalaryRange(newValue);
  };

  const handleLocationChange = (event) => {
    setLocation(event.target.value);
  };

  return (
    <div className="p-4 bg-white rounded-[20px] space-y-6 w-full text-sm h-full flex flex-col">
      <div className="flex items-center justify-between">
  <h2 className="text-base font-semibold text-[var(--foreground)] uppercase tracking-wide">
    Filters
  </h2>
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-5 w-5 text-[var(--foreground)]"
    viewBox="0 0 20 20"
    fill="currentColor"
  >
    <path d="M10 6a2 2 0 114.001.001A2 2 0 0110 6zm0 5a2 2 0 114.001.001A2 2 0 0110 11zm0 5a2 2 0 114.001.001A2 2 0 0110 16z" />
  </svg>
</div>

      {/* Role DROPDOWN */}
      <div>
        <h3 className="uppercase font-semibold text-xs textcolor mb-2">Role</h3>
        <FormControl fullWidth size="small">
          <InputLabel id="location-label">Role</InputLabel>
          <Select
            labelId="location-label"
            value={location}
            label="Select Location"
            onChange={handleLocationChange}
          >
            <MenuItem value="frontend-engineer">Frontend Engineer</MenuItem>
            <MenuItem value="backend-developer">Backend Developer</MenuItem>
            <MenuItem value="fullstack-engineer">Fullstack Engineer</MenuItem>
            <MenuItem value="product-designer">Product Designer</MenuItem>
            <MenuItem value="data-analyst">Data Analyst</MenuItem>
            <MenuItem value="devops-engineer">DevOps Engineer</MenuItem>
          </Select>
        </FormControl>
      </div>

      {/* JOB TYPE */}
      <div>
        <h3 className="uppercase font-semibold text-xs textcolor mb-2">Job Type</h3>
        <div className="space-y-1">
          {['contract', 'partTime', 'fullTime'].map((key) => (
            <div key={key} className="rounded px-1 py-1">
              <FormControlLabel
                control={
                  <Checkbox
                    checked={jobType[key]}
                    onChange={() =>
                      setJobType({ ...jobType, [key]: !jobType[key] })
                    }
                    sx={{
                      color: 'var(--icons)',
                      '&.Mui-checked': {
                        color: 'var(--icons)',
                      },
                      borderRadius: '6px',
                    }}
                  />
                }
                label={
                  key === 'contract'
                    ? 'Contract'
                    : key === 'partTime'
                    ? 'Part-Time'
                    : 'Full-Time'
                }
              />
            </div>
          ))}
        </div>
      </div>

      {/* SALARY */}
      <div>
        <h3 className="uppercase font-semibold text-xs textcolor mb-2">Salary</h3>
        <Slider
          value={salaryRange}
          onChange={handleSliderChange}
          valueLabelDisplay="off"
          min={0}
          max={200000}
          sx={{ color: 'var(--icons)' }}
        />
        <div className="flex justify-between text-xs textcolor">
          <span>${salaryRange[0].toLocaleString()}</span>
          <span>${salaryRange[1].toLocaleString()}</span>
        </div>
      </div>

      {/* AVAILABILITY */}
      <div>
        <h3 className="uppercase font-semibold text-xs textcolor mb-2">Skills</h3>
        <FormControl fullWidth size="small">
          <InputLabel id="location-label">Skills</InputLabel>
          <Select
            labelId="location-label"
            value={location}
            label="Select Location"
            onChange={handleLocationChange}
          >
            <MenuItem value="new-york">web development</MenuItem>
            <MenuItem value="san-francisco">Figma</MenuItem>
            <MenuItem value="london">Web Design</MenuItem>
            <MenuItem value="berlin">CSS</MenuItem>
            <MenuItem value="remote">HTML</MenuItem>
          </Select>
        </FormControl>
      </div>

      {/* LOCATION DROPDOWN */}
      <div>
        <h3 className="uppercase font-semibold text-xs textcolor mb-2">Location</h3>
        <FormControl fullWidth size="small">
          <InputLabel id="location-label">Location</InputLabel>
          <Select
            labelId="location-label"
            value={location}
            label="Select Location"
            onChange={handleLocationChange}
          >
            <MenuItem value="new-york">New York</MenuItem>
            <MenuItem value="san-francisco">San Francisco</MenuItem>
            <MenuItem value="london">London</MenuItem>
            <MenuItem value="berlin">Berlin</MenuItem>
            <MenuItem value="remote">Remote</MenuItem>
          </Select>
        </FormControl>
      </div>

      <div className="flex-grow"></div> {/* Ensures the button sticks to the bottom */}

      <div className="flex justify-center pt-4">
        <button className="py-2 px-6 rounded-full border border-[var(--icons)] text-[var(--icons)] hover:bg-[var(--icons)] hover:text-white transition-all duration-200">
          Apply
        </button>
      </div>
    </div>
  );
}
