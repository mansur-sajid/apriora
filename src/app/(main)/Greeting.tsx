// components/Greeting.tsx
'use client';

import { useRole } from './RoleContext';

export default function Greeting() {
  const { role } = useRole();
  
  return (
    <div className="flex items-center space-x-2">
      <h1 className="textcolor text-2xl font-semibold">Good Morning,</h1>
      <div>
        <span className="textcolor text-2xl font-bold">
          {role === 'recruiter' ? 'Admin' : 'Daniel Wong'}
        </span>
      </div>
    </div>
  );
}