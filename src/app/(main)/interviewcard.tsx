// components/InterviewCard.js
'use client'
import { PhoneCall } from 'lucide-react';
import { useState, useEffect } from "react";
import { useUpcomingInterviewQuery, fromGlobalId } from "@apriora/titan/gql-client";
import { formatDistanceToNow, addMinutes, format } from 'date-fns'
import { useRouter } from "next/navigation";
import DetailsPanel from "./jobs/details";

export default function InterviewCard() {
  // Default gender is taken from interviewer object
  const interviewer = {
    gender: 'female', // change to 'male' to test
  };
  const router = useRouter();
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);

  const [gender, setGender] = useState(interviewer.gender);
  const [name, setName] = useState("");
  const [profilePic, setProfilePic] = useState("");
  const { data: upcomingInterview } = useUpcomingInterviewQuery();

  const handleGenderChange = (selectedGender = "female") => {
    setGender(selectedGender);
    if (selectedGender === "female") {
      setName("Sarah");
      setProfilePic("/ai.jpeg"); 
    } else {
      setName("Adam");
      setProfilePic("./OIP.jpg"); 
    }
  };

  useEffect(() => {
    handleGenderChange(gender);
  }, [gender]);

  if (!upcomingInterview?.upcomingInterview) return null;

  return (
    <>
      <div className="relative w-full bg-[var(--purpleshade)] p-4 rounded-2xl shadow-sm flex justify-between items-center space-x-4">
        {/* Added relative positioning to the container */}
        <h3 className="absolute top-2 left-4 text-sm font-semibold text-gray-700">
          Upcoming Interview
        </h3>
        
        <div className="mt-6"> {/* Added margin-top to push content below the heading */}
          {/* Profile Section */}
          <div className="flex items-center space-x-4">
            <img
              src={profilePic || null}
              alt="Profile"
              className="w-14 h-14 rounded-full object-cover"
            />
            <div>
              <p className="text-xs text-gray-500">Recruiter</p>
              <p className="font-semibold text-sm">{name}</p>
            </div>
          </div>
        </div>

        <div className="text-sm text-center mt-6"> {/* Added margin-top */}
          <p className="text-gray-500 text-xs">Time</p>
          <p className="font-semibold">
            {upcomingInterview?.upcomingInterview?.scheduledAt
              ? `${format(new Date(upcomingInterview?.upcomingInterview?.scheduledAt), 'hh:mm a')} – ${format(addMinutes(new Date(upcomingInterview?.upcomingInterview?.scheduledAt), 45), 'hh:mm a')}`
              : 'No time available'}
          </p>
          <p className="text-gray-500">
            {upcomingInterview?.upcomingInterview?.scheduledAt
              ? `${formatDistanceToNow(new Date(upcomingInterview.upcomingInterview.scheduledAt), { addSuffix: true })}`
              : 'No interview scheduled'}
          </p>
        </div>

        <div className="text-sm text-center mt-6"> {/* Added margin-top */}
          <p className="text-gray-500 text-xs">Company</p>
          <div className="flex items-center justify-center space-x-1 font-semibold">
            <img src="/icon.png" alt="PayPal" className="w-10 h-10" />
            <span>{upcomingInterview?.upcomingInterview?.jobPostApplication.jobPost.company.name}</span>
          </div>
        </div>

        <div className="flex space-x-5 mt-6"> {/* Added margin-top */}
          <button className="custom-button" onClick={() => setIsDetailsOpen(!isDetailsOpen)}>
            View details
          </button>
          <button 
            className="bg-green-500 p-2 rounded-full" 
            onClick={() => {
              const id = fromGlobalId(upcomingInterview?.upcomingInterview?.id);
              router.push(`/interview/${id}`);
            }}
          >
            <PhoneCall size={30} color="white" />
          </button>
        </div>
      </div>
      
      <DetailsPanel 
        open={isDetailsOpen}
        onClose={() => setIsDetailsOpen(false)}
        job={upcomingInterview?.upcomingInterview.jobPostApplication.jobPost}
        applied={true}
      />
    </>
  );
}