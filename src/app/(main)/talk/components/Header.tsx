import { useEffect, useState } from "react";
import { Typography } from "@mui/material";
import { format } from "date-fns";

const formatTime = (totalSeconds: number) => {
  const hours = Math.floor(totalSeconds / 3600)
    .toString()
    .padStart(2, "0");
  const minutes = Math.floor((totalSeconds % 3600) / 60)
    .toString()
    .padStart(2, "0");
  const seconds = (totalSeconds % 60).toString().padStart(2, "0");
  return `${hours}:${minutes}:${seconds}`;
};

export const InterviewHeader = ({position}) => {
  const [secondsElapsed, setSecondsElapsed] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setSecondsElapsed((prev) => prev + 1);
    }, 1000);
    return () => clearInterval(interval); // Clean up on unmount
  }, []);

  return (
    <div className="flex flex-col pb-4">
      <Typography variant="subtitle2" className="text-gray-500 font-normal">
        {format(new Date(), "EEEE, d MMMM yyyy")}
      </Typography>
      <div className="flex justify-between items-baseline">
        <Typography variant="h6" className="font-semibold text-white">
            {position ? `${position} meeting` : ""}
        </Typography>
        <div className="flex items-center gap-2 bg-gray-800 px-4 rounded">
          {/* Blinking red dot */}
          <div className="relative w-2.5 h-2.5">
            <div className="absolute inset-0 rounded-full bg-red-500 opacity-75 animate-ping" />
            <div className="relative rounded-full bg-red-500 w-2.5 h-2.5" />
          </div>

          <Typography
            variant="body2"
            className="text-white font-medium rounded py-1 mt-2"
          >
            {formatTime(secondsElapsed)}
          </Typography>
        </div>
      </div>
    </div>
  );
};
