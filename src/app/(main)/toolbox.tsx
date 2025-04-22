'use client';

import { useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import ArrowBackIos from '@mui/icons-material/ArrowBackIos';
import Notifications from '@mui/icons-material/NotificationsNone';
import Logout from '@mui/icons-material/Logout';
import { IconButton, Badge } from '@mui/material';

export default function Toolbox() {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const profileRef = useRef(null); 
  const router = useRouter();

  const handleLogoutClick = () => {
    router.push('/login');
  };

  // Close the dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
     
      if (
        dropdownRef.current && !dropdownRef.current.contains(event.target) && 
        profileRef.current && !profileRef.current.contains(event.target)
      ) {
        setDropdownOpen(false); 
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

   
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className="flex flex-row-reverse gap-4 items-center p-4 relative">
      
      <div className="relative" ref={profileRef}>
        <div
          onClick={(e) => {
            e.stopPropagation(); 
            setDropdownOpen(prev => !prev);
          }}
          className="flex items-center purpleshade rounded-[20px] px-2 py-1 cursor-pointer"
        >
          <img
            src="/pfp.jpg"
            alt="Profile"
            className="h-10 w-10 object-cover rounded-[20px] border-2"
            style={{ borderColor: 'var(--icons)' }}
          />
          <ArrowBackIos
            style={{
              rotate: '90deg',
              color: 'var(--icons)',
              transform: dropdownOpen ? 'scaleX(1)  ' : 'scaleX(-1) ',
              marginLeft: '4px',
              fontSize: '18px',
              
              
              transition: 'transform 0.3s ease',
            }}
          />
        </div>

        {/* Dropdown */}
        {dropdownOpen && (
          <div
            ref={dropdownRef} 
            className="absolute right-0 mt-2 w-32 bg-white border border-[var(--purpleshade)] text-[var(--icons)] rounded-md shadow-md z-50"
          >
            <button
              onClick={(e) => {
                e.stopPropagation(); 
                setDropdownOpen(false); 
                handleLogoutClick();    
              }}
              className="flex items-center gap-2 px-4 py-2 text-sm hover:font-bold cursor-pointer"
            >
              <Logout style={{ fontSize: '18px' }} />
              Logout
            </button>
          </div>
        )}
      </div>

      {/* Notifications Button */}
      <IconButton
        sx={{
          borderRadius: '50%',
          backgroundColor: 'var(--purpleshade)',
          '&:hover': {
            backgroundColor: 'var(--accent)',
          },
          padding: '8px',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Badge
          badgeContent={3}
          color="error"
          overlap="circular"
          sx={{ '& .MuiBadge-badge': { fontSize: '0.6rem' } }}
        >
          <Notifications
            sx={{
              color: 'var(--icons)',
              width: 24,
              height: 24,
            }}
          />
        </Badge>
      </IconButton>
    </div>
  );
}
