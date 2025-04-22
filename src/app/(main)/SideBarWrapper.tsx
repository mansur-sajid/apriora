'use client';

import { useRole } from './RoleContext';
import SidebarRecruiter from './sidebar';
import SidebarJobSeeker from './SidebarJobSeeker';

export default function SidebarWrapper() {
  const { role } = useRole();

  return role === 'recruiter' ? <SidebarRecruiter /> : <SidebarJobSeeker />;
}
