'use client';

import { createContext, useContext, useState, useEffect } from 'react';

const RoleContext = createContext();

const DEFAULT_ROLE = 'recruiter';

export function RoleProvider({ children }) {
  const [role, setRole] = useState(DEFAULT_ROLE);
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    const storedRole = localStorage.getItem('role');
    if (storedRole) {
      setRole(storedRole);
    } else {
      localStorage.setItem('role', DEFAULT_ROLE);
    }
    setIsHydrated(true); // render only after hydration
  }, []);

  const changeRole = (newRole) => {
    localStorage.setItem('role', newRole);
    setRole(newRole);
  };

  if (!isHydrated) {
    return null; // or a loading spinner
  }

  return (
    <RoleContext.Provider value={{ role, changeRole }}>
      {children}
    </RoleContext.Provider>
  );
}

export function useRole() {
  return useContext(RoleContext);
}
