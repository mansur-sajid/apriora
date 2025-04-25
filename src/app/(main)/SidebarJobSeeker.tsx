"use client";

import DashboardIcon from "@mui/icons-material/DashboardOutlined";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import BusinessIcon from "@mui/icons-material/WorkOutline";
import AssessmentOutlinedIcon from "@mui/icons-material/AssessmentOutlined";
import Link from "next/link";
import { usePathname } from "next/navigation";

function SidebarIcon({ href, icon, pathname, label }) {
  const isActive = pathname === href;

  return (
    <Link href={href} className="w-full">
      <div
        className={`relative flex items-center h-14 px-4 rounded-md 
        ${isActive ? "bg-transparent" : "bg-transparent"} 
        text-black transition-colors duration-200 group`}
      >
        {/* Container for icon and label */}
        <div className="flex items-center transition-all  duration-300 group-hover:ml-2">
          {/* Icon centered by default, shifted to the left on hover */}
          <div className="w-8 h-8  flex items-center rounded-full justify-center transition-all duration-300">
            {icon}
          </div>

          {/* Label appears only when sidebar is expanded */}
          <span
            className="ml-3 text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap"
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
    <div className="custom-sidenav group w-15 hover:w-40 bg-white  rounded-[15px] flex flex-col items-center pt-6 shadow-md transition-all duration-300 ease-in-out overflow-hidden">
      <img src="/logo1.png" alt="Logo" className="custom-sidenav-logo mb-10 w-14 h-14" />

      <div className="flex flex-col gap-4 w-full">
        <SidebarIcon href="/" icon={<DashboardIcon />} pathname={pathname} label="Dashboard"/>
        <SidebarIcon href="/jobs" icon={<BusinessIcon />} pathname={pathname} label="Jobs" />
        <SidebarIcon href="/calendar" icon={<CalendarTodayIcon />} pathname={pathname} label="Calendar" />
      </div>
    </div>
  );
}
