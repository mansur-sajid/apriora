// LoginPage.js
"use client";

import { useRouter } from "next/navigation";
import { useRole } from "../../(main)/RoleContext";

export default function LoginPage() {
  const router = useRouter();
  const { changeRole } = useRole();
  
  // Function to handle button click for Recruiter
  const handleRecruiterLogin = () => {
    changeRole('recruiter');
   
    
    router.push("/"); 
  };

  // Function to handle button click for Job Seeker
  const handleJobSeekerLogin = () => {
    changeRole('jobseeker');
   
    router.push("/"); 
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen space-y-4">
      <div className="space-y-4">
        <div
          onClick={handleRecruiterLogin}
          className="custom-button flex items-center justify-center w-full p-4 text-lg cursor-pointer"
        >
          Recruiter Login
        </div>
        <div
          onClick={handleJobSeekerLogin}
          className="custom-button flex items-center justify-center w-full p-4 text-lg cursor-pointer"
        >
          Job Seeker Login
        </div>
      </div>
    </div>
  );
}
