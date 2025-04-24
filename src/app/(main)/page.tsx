'use client';

import { useRole } from './RoleContext';
import DashboardRecruiter from './dashboardRecruiter';
import DashboardJobSeeker from './dashboard-jobseeker/page';


export default function Home() {
  const { role } = useRole();

  if (role === "recruiter") {
    return (
        <DashboardRecruiter />
    );
  }
  else if (role === "jobseeker") {
    return (
        <DashboardJobSeeker />
    );
  }
    
}
