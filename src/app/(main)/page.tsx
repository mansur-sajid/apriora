'use client';

import { useRole } from './RoleContext';
import DashboardRecruiter from './dashboardRecruiter';
import DashboardJobSeeker from './dashboard-jobseeker/page';


export default function Home() {
  const { role } = useRole();

  return (
    role === 'recruiter' ? <DashboardRecruiter /> : <DashboardJobSeeker />
  );
}
