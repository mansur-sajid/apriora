"use client";

import DashboardIcon from "@mui/icons-material/DashboardOutlined";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";


import AssessmentOutlinedIcon from "@mui/icons-material/AssessmentOutlined";
import Link from "next/link";
import { usePathname } from "next/navigation";

function SidebarIcon({ href, icon, pathname, label }) {
  const isActive = pathname === href;

  return (
    <Link href={href} className="w-full">
      <div
        className={`relative flex items-center h-14 rounded-md 
        text-black transition-colors duration-200 group
        focus:outline-none focus-visible:bg-transparent active:bg-transparent hover:bg-transparent`}
      >
        {/* Container for icon and label */}
        <div className="flex items-center w-full transition-all duration-300 group-hover:ml-2">
          {/* Icon container */}
          <div className="w-8 h-8 pl-8 flex items-center  justify-center transition-all duration-300">
            {icon}
          </div>

        
          <span
            className="ml-3 text-sm font-medium pl-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap"
          >
            {label}
          </span>
        </div>

        {/* Active state bar */}
        {isActive && (
          <div className="absolute right-0 top-1/2 -translate-y-1/2 w-[2px] h-6 bg-black rounded-l-sm" />
        )}
      </div>
    </Link>
  );
}


export default function Sidebar() {
  const pathname = usePathname();

  return (
    <div className="custom-sidenav group  items-center w-15 hover:w-40 bg-white  rounded-[15px] flex flex-col  pt-6  transition-all duration-300 ease-in-out overflow-hidden">
      <img src="/logo1.png" alt="Logo" className="custom-sidenav-logo mb-10 w-14 h-14" />

      <div className="flex flex-col gap-4 w-full">
        <SidebarIcon href="/" icon={<DashboardIcon />} pathname={pathname} label="Dashboard"/>
        <SidebarIcon href="/reports" icon={<AssessmentOutlinedIcon />} pathname={pathname} label="Reports" />
        <SidebarIcon href="/calendar" icon={<CalendarTodayIcon />} pathname={pathname} label="Calendar" />
      </div>
    </div>
  );
}
